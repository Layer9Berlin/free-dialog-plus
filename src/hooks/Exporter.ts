import {saveAs} from "file-saver"
import * as Minizip from "minizip-asm.js"
import * as PapaParse from "papaparse"
import {useCallback} from "react"
import {formatExportDate} from "../helpers/DateFormatter"
import {Assessment} from "../types/Assessment"
import {Client} from "../types/Client"
import {CSVImport, CSVImportSchema} from "../types/CSVImport"
import {useQuestionTexts} from "./QuestionTexts"

export const useAssessmentExporter = () => {
  const questionTexts = useQuestionTexts()
  const data = useCallback(
    (assessments: Assessment[], allClients: Client[]): string =>
      [
        [
          "Client Name",
          "Date Start",
          "Date End",
          ...questionTexts
            .map((text) => [`${text.export} Rank`, `${text.export} Additional Help`, `${text.export} Discussed`])
            .flat(),
          ...questionTexts.map((text) => `${text.export} Action Items`),
        ].join(","),
        ["", "", "", ...questionTexts.map((text) => [text.long, "", ""]).flat()].join(","),
        ...assessments.map((assessment) => {
          const client = allClients.find((client) => client.id === assessment.meta.clientId)
          return [
            clientName(client),
            `"${formatExportDate(assessment.meta.date)}"`,
            `"${formatExportDate(assessment.meta.lastUpdated)}"`,
            ...assessment.questions
              .map((question) => [
                question.value.selectedOption?.toString() ?? "",
                booleanOrUndefined(question.value.furtherHelp, "2", "1", ""),
                question.state.selected ? "1" : "0",
              ])
              .flat(),
            ...assessment.questions.map((question) => question.value.actionItems.join(";")),
          ].join(",")
        }),
      ].join("\n"),
    [questionTexts],
  )
  return {
    data,
    import: useCallback(async (file: File, password?: string): Promise<boolean> => {
      if (!password) {
        return false
      }
      const buffer = Buffer.from(await file.arrayBuffer())
      const miniZip = new Minizip(buffer)
      const zippedFiles = miniZip.list()
      try {
        zippedFiles.forEach(({filepath}: {filepath: string}) => {
          const fileData = miniZip.extract(filepath, {password})
          const string = new TextDecoder().decode(fileData)
          const csvData = PapaParse.parse(string, {header: true, skipEmptyLines: true})
          const parseAttempt = CSVImportSchema.safeParse(csvData)
          if (parseAttempt.success) {
            importData(parseAttempt.data)
          }
        })
        return true
      } catch (error) {
        return false
      }
    }, []),
    export: useCallback(
      async (assessments: Assessment[], allClients: Client[], password?: string) => {
        if (!password) {
          return
        }
        const blob = new Blob([data(assessments, allClients)], {type: "text/csv;charset=utf-8"})
        const miniZip = new Minizip()
        miniZip.append("DIALOG+ Export.csv", await blob.arrayBuffer(), {password})
        saveAs(new Blob([miniZip.zip()]), "DIALOG+ Export.zip")
      },
      [data],
    ),
  }
}

const importData = (csvData: CSVImport) => {
  console.log("CSV data: " + JSON.stringify(csvData))
}

const booleanOrUndefined = (
  value: boolean | undefined,
  trueOption: string,
  falseOption: string,
  undefinedOption: string,
): string => {
  switch (value) {
    case undefined:
      return undefinedOption
    case true:
      return trueOption
    case false:
      return falseOption
  }
}

const clientName = (client?: Client): string => {
  if (!client) {
    return ""
  }
  if (client.last) {
    if (client.first || client.middle) {
      return `"${client.last}, ${client.first ? " " + client.first : ""}${client.middle ? " " + client.middle : ""}"`
    } else {
      return client.last
    }
  }
  return [client.first, client.middle].filter((component) => component?.length).join(" ")
}

import {Assessment} from "../../types/Assessment"
import {v4 as uuid} from "uuid"

export const dummyAssessment = (
  data: Partial<Omit<Assessment, "id" | "meta"> & {meta?: Partial<Assessment["meta"]>}> & {id?: string},
) => {
  return {
    id: uuid(),
    ...data,
    meta: {
      date: new Date(),
      lastUpdated: new Date(),
      clientId: "client1",
      ...data?.meta,
    },
    questions: data?.questions || [
      {
        text: {
          short: "Pick a number",
          long: "Pick a number, any number",
          export: "Number",
        },
        state: {
          collapsed: false,
          selected: true,
        },
        value: {
          selectedOption: undefined,
          furtherHelp: undefined,
          actionItems: [],
        },
      },
    ],
  }
}

import {z} from "zod"

const ClientNameSchema = z
  .string()
  .transform((clientString) => {
    const [lastName, firstNames] = clientString.split(",")
    const [firstName, ...middleNames] = (firstNames || "").split(" ")
    return {
      first: firstName,
      middle: middleNames?.join(" ") ?? "",
      last: lastName,
    }
  })
  .optional()

const DateSchema = z
  .string()
  .transform((dateString) => {
    // Convert from DD/MM/YYYY to MM/DD/YYYY
    const newDateString = dateString.replace(/(\d{1,2})\/(\d{1,2})\/(.*)/, "$2/$1/$3")
    return new Date(newDateString)
  })
  .optional()

const validRanks = new Set(["1", "2", "3", "4", "5", "6", "7"])
const RankSchema = z
  .string()
  .transform((value) => {
    if (validRanks.has(value)) {
      return Number(value)
    }
    return undefined
  })
  .optional()

const AdditionalHelpSchema = z.string().transform((value) => {
  switch (value) {
    case "2":
      return true
    case "1":
      return false
    default:
      return undefined
  }
})

const DiscussedSchema = z.string().transform((value) => {
  switch (value) {
    case "1":
      return true
    case "0":
      return false
    default:
      return undefined
  }
})

const ActionItemsSchema = z.string().transform((value) => {
  return value.split(";")
})

export const CSVImportRowSchema = z.object({
  "Client Name": ClientNameSchema,
  "Date Start": DateSchema,
  "Date End": DateSchema,
  "Mental Health Rank": RankSchema,
  "Mental Health Additional Help": AdditionalHelpSchema,
  "Mental Health Discussed": DiscussedSchema,
  "Physical Health Rank": RankSchema,
  "Physical Health Additional Help": AdditionalHelpSchema,
  "Physical Health Discussed": DiscussedSchema,
  "Job Situation Rank": RankSchema,
  "Job Situation Additional Help": AdditionalHelpSchema,
  "Job Situation Discussed": DiscussedSchema,
  "Accommodation Rank": RankSchema,
  "Accommodation Additional Help": AdditionalHelpSchema,
  "Accommodation Discussed": DiscussedSchema,
  "Leisure Activities Rank": RankSchema,
  "Leisure Activities Additional Help": AdditionalHelpSchema,
  // typo in export from native app
  "Leisure Activitie Discussed": DiscussedSchema.optional(),
  "Leisure Activities Discussed": DiscussedSchema.optional(),
  "Partner / Family Rank": RankSchema,
  "Partner / Family Additional Help": AdditionalHelpSchema,
  "Partner / Family Discussed": DiscussedSchema,
  "Friendships Rank": RankSchema,
  "Friendships Additional Help": AdditionalHelpSchema,
  "Friendships Discussed": DiscussedSchema,
  "Personal Safety Rank": RankSchema,
  "Personal Safety Additional Help": AdditionalHelpSchema,
  "Personal Safety Discussed": DiscussedSchema,
  "Medication Rank": RankSchema,
  "Medication Additional Help": AdditionalHelpSchema,
  "Medication Discussed": DiscussedSchema,
  "Practical Help Rank": RankSchema,
  "Practical Help Additional Help": AdditionalHelpSchema,
  "Practical Help Discussed": DiscussedSchema,
  "Meetings Rank": RankSchema,
  "Meetings Additional Help": AdditionalHelpSchema,
  "Meetings Discussed": DiscussedSchema,
  "Mental Health Action Items": ActionItemsSchema,
  "Physical Health Action Items": ActionItemsSchema,
  "Job Situation Action Items": ActionItemsSchema,
  "Accommodation Action Items": ActionItemsSchema,
  "Leisure Activities Action Items": ActionItemsSchema,
  "Partner / Family Action Items": ActionItemsSchema,
  "Friendships Action Items": ActionItemsSchema,
  "Personal Safety Action Items": ActionItemsSchema,
  "Medication Action Items": ActionItemsSchema,
  "Practical Help Action Items": ActionItemsSchema,
  "Meetings Action Items": ActionItemsSchema,
})

export const CSVImportSchema = z.array(CSVImportRowSchema)

export type CSVImportRow = z.infer<typeof CSVImportRowSchema>
export type CSVImport = z.infer<typeof CSVImportSchema>

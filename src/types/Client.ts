export type Client = {
  id: string
  first?: string
  middle?: string
  last?: string
}

export type MutableClient = Client & {
  setName: (first?: string, middle?: string, last?: string) => void
}

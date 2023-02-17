import {useCallback, useMemo} from "react"
import {redirect, useLocation} from "react-router-dom"

export type RerouterArgsType = {page?: string; params?: Record<string, any>; add?: Record<string, any>}

export type RerouterType = {
  link: (args: RerouterArgsType) => string
  to: (args: RerouterArgsType) => void
}

export const useRerouter = () => {
  const location = useLocation()
  const link = useCallback(
    ({page, params}: {page?: string; params?: Record<string, any>}) => {
      const searchParams = new URLSearchParams(location.search)
      Object.entries(params ?? {}).forEach(([key, value]) => {
        if (value === undefined) {
          searchParams.delete(key)
        } else {
          searchParams.set(key, value)
        }
      })
      return `${page ?? location.pathname}?${searchParams.toString()}`
    },
    [location.pathname, location.search],
  )

  return useMemo(
    () => ({
      link,
      to: (args: {page?: string; params?: Record<string, any>; replace?: boolean}) => {
        redirect(link(args))
      },
    }),
    [link],
  )
}
// https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom

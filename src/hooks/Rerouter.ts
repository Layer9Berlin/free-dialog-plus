import {useCallback, useMemo} from "react"
import {useHistory, useLocation} from "react-router-dom"

export type RerouterArgsType = {page?: string; add?: Record<string, any>}

export type RerouterType = {
  link: (args: RerouterArgsType) => string
  to: (args: RerouterArgsType) => void
}

export const useRerouter = () => {
  const history = useHistory()
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
        if (args?.replace) {
          history.replace(link(args))
        } else {
          history.push(link(args))
        }
      },
    }),
    [history, link],
  )
}

import {useCallback, useMemo} from "react"
import {useLocation, useNavigate} from "react-router-dom"

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

  const navigate = useNavigate()

  return useMemo(
    () => ({
      link,
      to: (args: {page?: string; params?: Record<string, any>; replace?: boolean}) => {
        navigate(link(args), {replace: !!args.replace})
      },
    }),
    [link, navigate],
  )
}

import {Trans} from "@lingui/macro"
import {ResponsiveButton} from "./ResponsiveButton"

export const ExportButton = ({
  active,
  disabled,
  onExport,
}: {
  active?: boolean
  disabled?: boolean
  onExport: () => Promise<void>
}) => {
  return (
    <ResponsiveButton
      onClick={onExport}
      disabled={disabled}
      icon="box-arrow-up"
      outline={!active}
      className="flex-shrink-0"
    >
      {!active && <Trans>Export</Trans>}
      {active && <Trans>Export selected</Trans>}
    </ResponsiveButton>
  )
}

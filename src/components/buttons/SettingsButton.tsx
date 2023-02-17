import {Trans} from "@lingui/macro"
import React from "react"
import {ResponsiveLink} from "./ResponsiveLink"

export const SettingsButton = () => (
  <ResponsiveLink className="flex-shrink-0" icon="gear" link="/settings">
    <Trans>Settings</Trans>
  </ResponsiveLink>
)

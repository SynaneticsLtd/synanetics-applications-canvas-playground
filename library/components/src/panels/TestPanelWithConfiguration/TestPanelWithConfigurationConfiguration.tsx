import { createPanel } from "@synanetics/panel-library"
import React from "react"
import { HtmlElementWithConfiguration } from "../../../global"
import { ReactComponentBase } from "../../ReactComponentBase"
import panelDetails from "./index"

type TestPanelWithConfigurationPanelConfigurationType = HTMLElement & HtmlElementWithConfiguration & ReactComponentBase

export class TestPanelWithConfigurationConfiguration extends createPanel<
  TestPanelWithConfigurationPanelConfigurationType,
  ReactComponentBase
>(panelDetails.schema, ReactComponentBase) {
  constructor() {
    super()

    this.jsxRootComponent = () => (
      <div>
        <h3>Panel to configure the Test Panel With Configuration panel</h3>
      </div>
    )
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback()
  }

  setConfiguration(configuration: any) {
    this.configuration = configuration

    this.render()
  }

  configurationChangedCallback(config: any) {
    console.log("CONFIG CHAGNED", config)
    this.dispatchEvent(new CustomEvent("configuration", { detail: config, bubbles: true, composed: true }))
  }
}

customElements.define(`${panelDetails.schema.configurationTag}`, TestPanelWithConfigurationConfiguration)

import { HtmlElementWithConfiguration, createPanel } from "@synanetics/panel-library"
import React from "react"
import { ReactComponentBase } from "../../ReactComponentBase"
import panelDetails from "./index"

//TODO: The configuration panel does not work at the moment because the library can't serve them yet

type ConfigurablePanelPanelConfigurationType = HTMLElement & HtmlElementWithConfiguration & ReactComponentBase

export class ConfigurablePanelConfiguration extends createPanel<
  ConfigurablePanelPanelConfigurationType,
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

customElements.define(`${panelDetails.schema.configurationTag}`, ConfigurablePanelConfiguration)

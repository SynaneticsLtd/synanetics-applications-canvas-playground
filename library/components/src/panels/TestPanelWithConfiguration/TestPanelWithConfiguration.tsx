import {
  HtmlElementWithCanvas,
  HtmlElementWithConfiguration,
  HtmlElementWithResource,
  createPanel,
} from "@synanetics/panel-library"
import fhirpath from "fhirpath"
import React from "react"
import { ReactComponentBase } from "../../ReactComponentBase"
import panelDetails from "./index"

type TestPanelWithConfigurationType = HTMLElement &
  HtmlElementWithCanvas &
  HtmlElementWithResource &
  HtmlElementWithConfiguration &
  ReactComponentBase

export class TestPanelWithConfiguration extends createPanel<TestPanelWithConfigurationType, ReactComponentBase>(
  panelDetails.schema,
  ReactComponentBase
) {
  configProcessedField: string

  constructor() {
    super()

    this.configProcessedField = ""

    this.jsxRootComponent = () => {
      const fieldFhirPath = this.configuration?.field || "Not set"

      const patientResource = (this.getResources<fhir.Patient>("Patient") || [])[0]

      let name = "No patient in context"

      if (patientResource) {
        const patientName = patientResource?.name?.[0]
        name = `${patientName?.given?.join(" ")} ${patientName?.family}`
      }

      return (
        <div>
          <h3>Test External Panel with Configuration</h3>
          <p>Patient: {name}</p>
          <p>The fhirpath in the configuration is: {fieldFhirPath}</p>
          <p>Fhirpath result on Patient: {this.configProcessedField}</p>
        </div>
      )
    }
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback()

    this.render()
  }

  configurationChangedCallback(): void {
    console.log("Configuration was changed", this.configuration)

    if (this.configuration) {
      const fieldFhirpath = this.configuration?.field

      const patientResource = (this.getResources<fhir.Patient>("Patient") || [])[0]

      if (patientResource && fieldFhirpath) {
        const field = fhirpath.evaluate(patientResource, fieldFhirpath)[0]
        this.configProcessedField = `The applied fhirpath in the config produced the following: ${field}`
      }
    }
  }
}

customElements.define(panelDetails.schema.panelTag, TestPanelWithConfiguration)

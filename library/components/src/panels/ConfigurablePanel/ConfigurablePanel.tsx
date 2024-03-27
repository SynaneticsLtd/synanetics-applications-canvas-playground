import {
  HtmlElementWithCanvas,
  HtmlElementWithConfiguration,
  HtmlElementWithContextualEvent,
  HtmlElementWithResource,
  createPanel,
} from "@synanetics/panel-library"
import fhirpath from "fhirpath"
import React from "react"
import { ReactComponentBase } from "../../ReactComponentBase"
import { ReactButton } from "./components/ReactButton/ReactButton"
import panelDetails from "./index"

//We import the SCSS file here and attach it to the shadow DOM below
import styles from "./ConfigurablePanel.scss"
import { ReactTextField } from "./components/ReactTextField/ReactTextField"

//Here we compose the type from types that are available in the panel-library
//We do this so that TypeScript can help us know what functions and properties are available on the panel
type ConfigurablePanelType = HTMLElement &
  HtmlElementWithCanvas &
  HtmlElementWithResource &
  HtmlElementWithConfiguration &
  HtmlElementWithContextualEvent
ReactComponentBase

export class ConfigurablePanel extends createPanel<ConfigurablePanelType, ReactComponentBase>(
  panelDetails.schema,
  ReactComponentBase
) {
  configProcessedField: string
  textFieldValue: string
  textFieldValueChanged: (value: string) => void

  constructor() {
    super()

    this.configProcessedField = ""
    this.textFieldValue = ""

    //This is where we attach the styles to the shadow DOM
    const stylesRoot = document.createElement("style")
    stylesRoot.appendChild(document.createTextNode(styles))
    this.shadow.append(stylesRoot)

    this.textFieldValueChanged = (value: string) => {
      this.textFieldValue = value
      this.render()
    }

    //Because this panel uses the ReactComponentBase, it has a jsxRootComponent (unlike TextExternalPanel)
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
          <h3>Test React Panel that can be configured</h3>
          <p>Patient: {name}</p>
          <p>The fhirpath in the configuration is: {fieldFhirPath}</p>
          <p>Fhirpath result on Patient: {this.configProcessedField}</p>
          <ReactTextField value={this.textFieldValue} onChange={this.textFieldValueChanged} />
          <ReactButton
            name="Test button"
            onClick={() => {
              alert("Test react button clicked")
            }}
          />
          <ReactButton
            name="Test button"
            onClick={() => {
              this.triggerContextualEvent("alert-event", { hello: "hi" })
            }}
          />
        </div>
      )
    }
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback()

    this.render()
  }

  //This is the callback that is called when the configuration was changed
  //Use this callback to act on changes to the configuration
  //Since configurations are loaded async, you will need to wait on the configuration on first render too,
  //it won't be available immediately.
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

customElements.define(panelDetails.schema.panelTag, ConfigurablePanel)

import { HtmlElementWithCanvas, HtmlElementWithResource, createPanel } from "@synanetics/panel-library"
import panelDetails from "./index"

type TestExternalPanelType = HtmlElementWithCanvas & HtmlElementWithResource

export class TestExternalPanel extends createPanel<TestExternalPanelType, HTMLElement>(
  panelDetails.schema,
  HTMLElement
) {
  shadow: ShadowRoot
  renderCount: number

  constructor() {
    super()
    this.renderCount = 0
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback()

    this.render()
  }

  render() {
    this.renderCount += 1
    const patientResource = (this.getResources("Patient") || [])[0]
    const organizationResource = (this.getResources("Organization") || [])[0]

    let name = "No patient in context"
    let organization = "No organization in context"

    if (patientResource) {
      const patientName = patientResource.name[0]
      name = `${patientName.given.join(" ")} ${patientName.family}`
    }

    if (organizationResource) {
      const organizationName = organizationResource.name
      organization = organizationName
    }

    //This panel just directly sets the innerHTML on the shadow as it does not use React or other JS frameworks/libraries
    this.shadow.innerHTML = `
      <div>
        <h3>TestExternalPanel</h3>
        <div>I have rendered ${this.renderCount} times</div>
        <div>Patient: ${name}</div>
        <div>Organization: ${organization}</div>
      </div>
    `
  }
}

customElements.define(panelDetails.schema.panelTag, TestExternalPanel)

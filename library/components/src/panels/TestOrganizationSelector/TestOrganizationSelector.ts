import { createPanel } from "@synanetics/panel-library"
import panelDetails from "./index"
import { SynaneticsHealthCare } from "./data/synaneticsHealthCare"

export class TestOrganizationSelector extends createPanel(panelDetails.schema, HTMLElement) {
  shadow: ShadowRoot

  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = ""

    const title = document.createElement("h3")
    title.textContent = "Organization Selector"
    this.shadow.appendChild(title)

    const button = document.createElement("button")
    button.textContent = "Add Organization"
    button.addEventListener("click", () => this.onSelectOrganization())
    this.shadow.appendChild(button)
  }

  onSelectOrganization() {
    console.log("Organization", SynaneticsHealthCare)
    this.provideResources("Organization", [SynaneticsHealthCare])
  }
}

customElements.define(panelDetails.schema.panelTag, TestOrganizationSelector)

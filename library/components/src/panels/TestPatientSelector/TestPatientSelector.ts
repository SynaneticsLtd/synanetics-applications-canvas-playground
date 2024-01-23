import { createPanel } from "@synanetics/panel-library"
import { patientDonald } from "./data/patientDonald"
import { patientPeter } from "./data/patientPeter"
import panelDetails from "./index"

export class TestPatientSelector extends createPanel(panelDetails.schema, HTMLElement) {
  shadow: ShadowRoot
  renderCount: number

  constructor() {
    super()
    this.renderCount = 0
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = ""

    const titleEl = document.createElement("h3")
    titleEl.textContent = "PatientSelector"
    this.shadow.appendChild(titleEl)

    const buttonEl1 = document.createElement("button")
    buttonEl1.textContent = "Peter"
    buttonEl1.addEventListener("click", () => this.onSelectPatient(patientPeter))
    this.shadow.appendChild(buttonEl1)

    const buttonEl2 = document.createElement("button")
    buttonEl2.textContent = "Donald"
    buttonEl2.addEventListener("click", () => this.onSelectPatient(patientDonald))
    this.shadow.appendChild(buttonEl2)
  }

  onSelectPatient(patient: any) {
    this.provideResources("Patient", [patient])
  }
}

customElements.define(panelDetails.schema.panelTag, TestPatientSelector)

import { PanelSchema, describePanel } from "@synanetics/panel-library/library"

const schema: PanelSchema = {
  panelName: "TestPatientSelector",
  panelTag: "test-patient-selector",
  panelPath: "./TestPatientSelector.ts",
  description: "Test Patient Selector",
  provide: ["Patient"],
}

export default describePanel(schema)

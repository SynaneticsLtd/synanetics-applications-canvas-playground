import { PanelSchema, describePanel } from "@synanetics/panel-library/library"

const schema: PanelSchema = {
  panelName: "TestExternalPanel",
  panelTag: "test-external-panel",
  panelPath: "./TestExternalPanel.ts",
  description: "Test External Panel",
  resources: ["Patient", "Organization"],
  apis: [],
}

export default describePanel(schema)

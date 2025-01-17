import { PanelSchema, describePanel } from "@synanetics/panel-library/library"

export const schema: PanelSchema = {
  panelName: "TestOrganizationSelector",
  panelTag: "test-organization-selector",
  panelPath: "./TestOrganizationSelector.ts",
  description: "Test Organization Selector",
  provide: ["Organization"],
}

export default describePanel(schema)

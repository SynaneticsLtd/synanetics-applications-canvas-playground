import { PanelSchema, describePanel } from "@synanetics/panel-library/library"

export const schema: PanelSchema = {
  panelName: "ReactTestComponentSelector",
  panelTag: "react-test-component-selector",
  panelPath: "./TestReactComponent.tsx",
  description: "React test Selector",
  provide: ["Organization"],
  resources: ["Patient"],
  events: [
    {
      name: "new-alert-event",
      description: "New test event that triggers an alert from the canvas.",
    },
  ],
}

export default describePanel(schema)

import { PanelSchema, describePanel } from "@synanetics/panel-library/library"

export type ConfigurablePanelConfigurationType = {
  field: string
}

//This is the JSON schema for the configuration this panel uses and this schema
//is what is used in the portal admin section to render an editor which can configure this panel.
//TODO: More documentation is needed on the possible options.
export const configurationSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "ConfigurablePanel Configuration",
  description: "Configuration schema for the panel called ConfigurablePanel",
  type: "object",
  properties: {
    configuration: {
      editor: "general",
      type: "object",
      description: "General Panel Configuration",
      properties: {
        field: {
          type: "string",
          description: "The fhirpath for the field",
        },
      },
    },
  },
}

const schema: PanelSchema = {
  panelName: "ConfigurablePanel",
  panelTag: "configurable-panel",
  panelPath: "./ConfigurablePanel.tsx",
  description: "Test Panel With Configuration",
  resources: ["Patient"],
  apis: [],
  configuration: configurationSchema,
  configurationTag: "configurable-panel-configuration",
  configurationPath: "./ConfigurablePanelConfiguration.tsx",
  events: [
    {
      name: "alert-event",
      description: "Test event that triggers an alert from the canvas.",
    },
  ],
}

const { panelTag, configurationTag, description, panelPath, configurationPath, panelName, events } = schema

export default {
  ...describePanel(schema),
  panelTag,
  configurationTag,
  description,
  panelPath,
  configurationPath,
  panelName,
  schema,
  events,
}

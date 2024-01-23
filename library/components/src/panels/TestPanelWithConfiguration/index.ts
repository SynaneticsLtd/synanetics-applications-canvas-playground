import { PanelSchema, describePanel } from "@synanetics/panel-library/library"

export type TestPanelWithConfigurationConfigurationType = {
  field: string
}

export const configurationSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "TestPanelWithConfiguration Configuration",
  description: "Configuration schema for the panel called TestPanelWithConfiguration",
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
  panelName: "TestPanelWithConfiguration",
  panelTag: "test-panel-with-configuration",
  panelPath: "./TestPanelWithConfiguration.tsx",
  description: "Test Panel With Configuration",
  resources: ["Patient"],
  apis: [],
  configuration: configurationSchema,
  configurationTag: "test-panel-with-configuration-configuration",
  configurationPath: "./TestPanelWithConfigurationConfiguration.tsx",
}

const { panelTag, configurationTag, description, panelPath, configurationPath, panelName } = schema

export default {
  ...describePanel(schema),
  panelTag,
  configurationTag,
  description,
  panelPath,
  configurationPath,
  panelName,
  schema,
}

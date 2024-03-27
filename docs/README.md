# Canvas/Panel Architecture Tutorials

Welcome to the Canvas/Panel Architecture Tutorials for the `canvas-panel-playground` repository! These tutorials are designed to help you become more familiar with our canvas/panel architecture and how to effectively use it to build applications.

## Overview

The `canvas-panel-playground` is a simple implementation of the canvas/panel architecture, showcasing how panels can be utilized to create highly configurable and framework-agnostic applications. These tutorials will walk you through various aspects of working with the canvas/panel architecture, from creating panels to handling events and more.

## Tutorials

### 1. Creating Panels

Learn how to create new panels and add them to the canvas.

- [Exercise 1: Creating a new basic Panel](#creating-a-new-panel)
- [Exercise 2: Adding a Panel to the canvas](#adding-a-panel-to-the-canvas)
- [Exercise 3: Adding styling to a Panel](#adding-styling-to-a-panel)
- [Exercise 4: Creating a React based Panel](#creating-a-react-based-panel)

### 2. Contextual Events

Implement contextual events to trigger actions in the context of a Canvas

- [Exercise 6: Trigger an event from a panel](#trigger-an-event-from-a-panel)
- [Exercise 5: Create a new event to be handled by the canvas](#implementing-contextual-events)

### 3. Working with FHIR resources

Explore working with FHIR in panels.

- [Exercise 7: Requesting resources as the panel loads](#requesting-resources-src)

## Getting Started

To get started with the tutorials, simply navigate to the respective exercises listed above. Each exercise provides detailed instructions on what to do and how to complete the tasks. Feel free to experiment and modify the provided code examples. If you think something is unclear, please feel free to reach out for clarification. Feedback is always welcome!

Happy coding!

## Exercise Details

For the purposes of these exercises, we are going to use the test-portal canvas that is provided in this repository. Spin up everything and ensure you are able to run the projects before continuing.

All paths will be referenced from the root of this repository.

### Exercise 1: Creating a new Panel {#creating-a-new-panel}

TODO What is a schema?

Firstly, we will need to define the schema for the panel. Our preferred way to layout panel files is to create a folder per panel. That means we'll have a folder such as `EncountersPanel` which will contain an `index.ts` file that defines the schema. It will also then contain any other sub-components that the panel uses. In the case of creating a `React` based panel, we'll often then have a file called `EncountersPanel.tsx` which contains the `React` part of the code.

With that said, create a new folder called `ExerciseOnePanel` under `/library/components/src/panels`.

In this folder, create a file... `TODO`

TODO explain the different parts to a new panel (connectedCallback, render function, describePanel)

maybe building upon a panel created in the beginning

eventually going into more complex panel

### Exercise 2: Adding a Panel to the canvas {#adding-a-panel-to-the-canvas}

- Add the panel created in the previous step to the canvas by modifying the `index.html` in `test-portal/client`, adding a `<syn-panel>` with the correct attributes.

- The two mandatory things are `panel-id` and `panel`
- `panel-id` is used to serve as a unique identifier for the panel
- `panel` is used to find the correct panel from the registry.

### Exercise 3: Adding styling to a Panel {#adding-styling-to-a-panel}

- The panel bundling scripts allow you to use SCSS which means you can import a SCSS file in your panel
- However, because of the `Shadow DOM` you have to attach these styles to your webcomponents root. To do this, you should import your styles and assign it to a variable like this:

```javascript
import styles from "./ExerciseOnePanel.scss"
```

- Then, you need to create a DOM element where you will attach these styles which you then need to attach to your web components shadow root.

```javascript
const stylesRoot = document.createElement("style")
stylesRoot.appendChild(document.createTextNode(styles))
this.shadow.append(stylesRoot)
```

### Exercise 4: Creating a React based Panel {#creating-a-react-based-panel}

- With the Synanetics Panel Library being framework agnostic, you can use any framework or UI library tobuild a panel

- At Synanetics, we use React mostly

- A suggested way to create panels using a React is to create a base component which implements some of the properties and features of the panel library, such as creating the `React Root` where you React application will be mounted.

- By using a base class, you can also add wrappers such as `ThemeProviders` or `React Context` and have them available in any new panels you create, reducing the need for code duplication.

- An example of the ReactComponentBase can be found [here](../library/components/src/ReactComponentBase.tsx).

- To create a new panel using this base, extend the class:

```javascript
export class ReactPanel extends createPanel<ReactPanelType, ReactComponentBase>(
  panelSchema,
  ReactComponentBase
)
```

- Anything you now assign to the `jsxRootComponent` will now be the child of any wrappers you defined in the BaseComponent

### Exercise 5: Trigger an event from a panel {#trigger-an-event-from-a-panel}

- The canvas where you are adding panels may be setup to handle certain events coming from panels

- For a panel to be able to trigger an event, the event should be listed in the panel schema. The test-portal has a configured event called `alert-event` which console logs the details the event was called with as well as opens an alert in the browser.

- For one of the panels you've created before, add the `alert-event` to the panel schema

<details>
<summary>Click to see solution</summary>

```javascript
{
...panelSchema,
events: [
  {
    name: "alert-event",
    description: "Test event that triggers an alert from the canvas.",
  },
]
}
```

</details></br>

- Your panel schema now defines that it wants to call this event
- In order for you to actually do this though, the canvas needs to assign the event handler to your panel. To do this, go to `/test-portal/client/src/index.js` and in the setEventHandler function, tell the canvas that when your panel fires the `alert-event` it should handle it using the alertEventHandler function.

<details>
<summary>Click to see solution</summary>

```javascript
document.getElementById("canvas").setEventHandlers({
  "test-panel-with-configuration-ConfigurablePanel": {
    "alert-event": alertEventHandler,
  },
  "<your-panel-id>-<your-panel-name>": {
    "alert-event": alertEventHandler,
  },
})
```

</details>

### Exercise 6: Create a new event to be handled by the canvas {#implementing-contextual-events}

- Let's add an event called "test-event" to the canvas.

# Canvas/Panel Architecture Tutorials

Welcome to the Canvas/Panel Architecture Tutorials for the `canvas-panel-playground` repository! These tutorials are designed to help you become more familiar with our canvas/panel architecture and how to effectively use it to build applications.

## Overview

The `canvas-panel-playground` is a simple implementation of the canvas/panel architecture, showcasing how panels can be utilized to create highly configurable and framework-agnostic applications. These tutorials will walk you through various aspects of working with the canvas/panel architecture, from creating panels to handling events and more.

## Tutorials

### 1. Creating Panels

Learn how to create new panels and add them to the canvas.

- [Exercise 1: Creating a new basic Panel](#creating-a-new-panel)
- [Exercise 2: Adding a Panel to the canvas](#adding-a-panel-to-the-canvas)

### 2. Working with FHIR resources

- [Exercise 3: Consuming Resources](#exercise-3-consuming-resources)
- [Exercise 4: Provide Resources](#exercise-4-provide-resources)

### 3. Add styling and using UI libraries

- [Exercise 5: Adding styling to a Panel](#exercise-5-adding-styling-to-a-panel)
- [Exercise 6: Creating a React based Panel](#exercise-6-creating-a-react-based-panel)

### 4. Contextual Events

Implement contextual events to trigger actions in the context of a Canvas

- [Exercise 7: Trigger a canvas event from a panel](#exercise-7-trigger-a-canvas-event-from-a-panel)

## Getting Started

To get started with the tutorials, simply navigate to the respective exercises listed above. Each exercise provides detailed instructions on what to do and how to complete the tasks. Feel free to experiment and modify the provided code examples. If you think something is unclear, please feel free to reach out for clarification. Feedback is always welcome!

Happy coding!

## Exercise Details

For the purposes of these exercises, we are going to use the test-portal canvas that is provided in this repository. Spin up everything and ensure you are able to run the projects before continuing.

All paths will be referenced from the root of this repository.

### Exercise 1: Creating a new Panel {#creating-a-new-panel}

Panels are isolated components that can receive data from the Canvas and render them to a user. They require a minimum of two files, an index.ts that will contain a schema for the panel, and a file that will render a component with the support of the PanelLibrary.

Firstly, we will need to define the schema for the panel. Our preferred way to layout panel files is to create a folder per panel. That means we'll have a folder such as `EncountersPanel` which will contain an `index.ts` file that defines the schema. It will also then contain any other sub-components that the panel uses. In the case of creating a `React` based panel, we'll often then have a file called `EncountersPanel.tsx` which contains the `React` part of the code.

With that said, create a new folder called `ExerciseOnePanel` under `/library/components/src/panels`.

In this folder, as mentioned, you need to create two files:

1. An index.ts file which will contain the schema for your panel
2. The panel file that will contain your panel component.

Before building the schema or panel, we will look at some helpful descriptions.

##### Schema

Schemas are stored against each panel in an index.ts. They define important information about the Panel such as the Panel name, the path to the panel, resources the panel can access, or what the panel can provide etc...
This schema is then exported using the `definePanel` function that is imported from the Panel Library.

##### createPanel

A panel is created using a class that extends `createPanel`. This enables us to make use of certain features that are extended from the createPanel class. This includes methods such as `provideResources` or `getResources` which enable us to fetch or pass resources to the canvas. If you want to learn more about this you can look at the `CreatePanel.js` file in the PanelLibrary repository.

##### customElements.define()

Custom Elements are a part of the Web Components API, which provides a set of JavaScript APIs to create reusable and encapsulated custom elements.
`customElements` itself is a global object provided by the Custom Elements API (a subset of the Web Components API). It allows you to define and interact with custom elements in the DOM.

At the most simple level it takes two arguments, the first is a string that represents the name of the custom element. We fetch this from the schema for this file where we define the panelTag. The second argument is a JavaScript class that extends HTMLElement, defining the behavior and lifecycle of the custom element. You can learn more at [here]
(https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements).
In practice this means that we pass the schema panelTag as the first argument, and our class component as the second argument. E.g.
`customElements.define(schema.panelTag, ReactTestComponent)`

##### render method

`render` is a custom method to generate and populate the content of the custom element. For example, if you look in `testExternalPanel` you will see that this renders html using vanilla Javascript. If you look in `ConfigurablePanel.tsx` you will see it uses `this.jsxRootComponent` instead to render (this extends from the `ReactComponentBase.tsx`).

##### connectedCallback method

`connectedCallback` is part of the Custom Elements API lifecycle callbacks. This callback is executed automatically whenever the custom element is appended to the DOM. This method ensures that the render function is called as soon as the custom element is added to the DOM.

#### Building a panel

Now you understand the main parts that make up a Panel components go ahead and build a simple Panel. Perhaps use the TextExternalPanel as an example to build from.

Once you have completed your Panel and schema it is important that you run `npm run build:components` for them to be built and picked up in the registry. Alternatively, you can run `npm run watch:components` and this will rebuild every time you save the file.

### Exercise 2: Adding a Panel to the canvas {#adding-a-panel-to-the-canvas}

You can now add the panel created in the previous step to the canvas by modifying the `index.html` in `test-portal/client`, adding a `<syn-panel>` with the correct attributes.

The two mandatory things are `panel-id` and `panel`:

- `panel-id` is used to serve as a unique identifier for the panel
- `panel` is used to find the correct panel from the registry.

It is important that these match exactly what are in the schema you have created. For example, in the `TestExternalPanel` schema there is the panelName and panelTag are defined as such:

```
panelName: "TestExternalPanel",
panelTag: "test-external-panel",
```

When rendering the tag in the index.html they must match exactly, where the `panel-id` attribute is the `panelTag` and the `panel` attribute is the `panelName`, e.g:

```
<syn-panel panel-id="test-external-panel" panel="TestExternalPanel" context="patient"></syn-panel>
```

If you haven't already started the local development environment you can do so by running `docker compose up` and you should be able to see your component being pulled through in your local environment. 🎉🎉

If for some reason you do not see your component try the following as first steps to debug the issue.

- Double check that you have rebuilt the components library with `npm run build:components`
- If you already had you local environment running, try an empty cache and hard reload as the browser can cache the files.
- Double check that the panelName and panelTag in the index.html match exactly what are in the schema for your panel component.
- Ensure all the servers have started correctly in Docker

### Exercise 3: Consuming resources

Once you have been able to create a simple panel that renders some basic html then you can start to look at consuming resources. This would essentially be where you pull in resources from a FHIR store that you need to render for the user. For example, you may need to render patient data. If you have a look in the `TestExternalPanel.ts` you will be able to see an example of how this occurs.

There is a `getResources` method that is available from extending the `createPanel` class from the Panel Library. This allows you to fetch resources that are available in the context of the Canvas in which the panels sit.

In order for this to work there is some additional setup that is required.

- In your schema you must describe which resources this panel is allowed to consume. You do this by adding a `resources` property and then defining the resources it should be able to access as an array of strings. e.g.
  `resources: ["Patient", "Organization"]`.
- You must also add this as a property to your syn panel in the index.html. This property must be called `context` and it denotes what data the panel is able to use from the context in the canvas. E.g.
  `<syn-panel panel-id="test-panel-with-configuration" panel="ConfigurablePanel" context="patient"></syn-panel>`

#### Consume resources to your panel

See if you can extend your panel to pull in some patient resources by adding the `getResources` method and passing in "Patient" as the resource that you want to achieve. It's important to note that `getResources` always returns an array, so if you want to just return the first result you can use the bracket notation on the end. You can use the `TestExternalPanel.ts` as a guide.

Debugging:

- Ensure you have added the resources to the schema
- Ensure you have added the context to the panel in the index.html

### Exercise 4: Provide resources

Once you have been able to access resources from the context, the next step is to try and provide resources into the context. This is a similar process as receiving resources but instead of getting them, you are providing then. Therefore you can use the `provideResources` method that is provided from createPanel.

#### Creating data

Your data must be the in the shape that is defined by the FHIR api standards. If you look in `TestPatientSelector/Data` folder you will see examples of patient data provided in the shape that is defined inside of the FHIR standards. If you visit [this page](https://hl7.org/fhir/administration-module.html), you will see a list of all the resource types. If you click on one, e.g. Patient, you will see the structure for how this data must be provided under the `Resource Content` section.

Once this data is created, it can be passed to the `provideResources` method. This method takes two arguments:
1 - The name of the resource type, as a string, e.g. "Patient"
2 - The actual resource, passed in an array.

As with providing resources, there is additional setup in the schema and the html.

- If you are providing data, then you must describe this in the schema. This is done with the `provide` property and should be input as an array of strings, e.g. `provide: ["Patient"]`.
- In the `index.html` you will need to add the provide property to the syn panel that will be providing the resources, e.g.
  `<syn-panel panel-id="test-patient-selector" panel="TestPatientSelector" provide="patient"></syn-panel>`.

In `TestExternalPanel.ts` the `provideResources` method is called when clicking a button, but this could also just be passed directly into the render method for example and it would instantly provide that data to the component.

#### Provide resources to the canvas

See if you can set up a new component that makes use of this existing patient data and provides it to the context. You could then try and consume this within the panel you made in the previous exercise.

#### Extension

Try setting up a new data source that you can provide into the context and then consume this within a panel. You can use the TestPatientSelector as an example. This will give you some exposure to the FHIR resources and more practice in providing and consuming data.

### Exercise 5: Adding styling to a Panel

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

### Exercise 6: Creating a React based Panel

- With the Synanetics Panel Library being framework agnostic, you can use any framework or UI library to build a panel

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

### Exercise 7: Trigger a canvas event from a panel {#trigger-an-event-from-a-panel}

The canvas itself can be setup to handle certain events. This is useful if you want to trigger an event at a global level with data that is local to a specific panel. For example, rendering a error toast component for a page where the error came from a specific panel and you have error data which you need to get from that panel to the toast.

#### Setting up a canvas event

If you look in the [index.ts](../test-portal/client/src/index.js) you will see a `setEventHandlers` custom method which sets up events on the canvas. You will notice that the format for these is an object where the key is the panel that is setup to use this event, and the property is an object that contains the name of the event and the event-handler that will be triggered when this event handler is triggered.

For example:

```
document.getElementById("canvas").setEventHandlers({
  "test-panel-with-configuration-ConfigurablePanel": {
    "alert-event": alertEventHandler,
  }
)}
```

In the above example, there is an event called 'alert-event' which will call the `alertEventHandler`. This is registered to the ConfigurablePanel. It's important to note that the name given to the eventHandler must match the panelId and panelName. e.g.
If you have the following panel:

`<syn-panel panel-id="test-panel-with-configuration" panel="ConfigurablePanel" context="patient"></syn-panel>`

The name when registering the eventHandler must combine the panelId and the panel attributes, ie - test-panel-with-configuration-ConfigurablePanel

#### Registering the event in the schema

Once this is setup you can configure the panel that wants to make use of this event.

Inside of the schema for the panel the event must be added like such:

```
events: [
    {
      name: "alert-event",
      description: "Test event that triggers an alert from the canvas.",
    },
  ]
```

The name must match the name of the event in the canvas that it's registering to.

#### Triggering the event

In the panel component you can then trigger this event by calling `this.triggerContextualEvent()`.
This takes two arguments:

1. The name of the event you want to trigger
2. Any data you want to pass to the event. E.g. `this.triggerContextualEvent('new-alert-event', { data: "There was an error!" })`

Once you have this setup you should be able to successfully trigger the custom event

#### Setting up in a panel

For one of the panels you've created before, you can do the following:

- Add the `alert-event` to the panel schema (see the `index.ts` in `ConfigurablePanel` for an example on how to do this).
- Register the event the index.js in the test portal client.
  e.g.

```
document.getElementById("canvas").setEventHandlers({
  "test-panel-with-configuration-ConfigurablePanel": {
    "alert-event": alertEventHandler,
  },
  "<your-panel-id>-<your-panel-name>": {
    "alert-event": alertEventHandler,
  },
})
```

- Set up a trigger in your component like a button with an onclick method and run the `this.triggerContextualEvent()` method with the name of the alert and the custom data you wish to pass to it.

#### Extension

You could now try and create a new event. This would required building a new event handler, registering this in `setEventHandlers` along with the panel that will consume this and then updating the schema on the panel and using `triggerContextualEvent()` to trigger the event.

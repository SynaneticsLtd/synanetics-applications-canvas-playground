import "@synanetics/canvas-library"
import "systemjs/dist/system.js"

window.canvas = {
  resourceTypes: ["Patient"],
}

const alertEventHandler = (context) => {
  console.log({ context })
  alert(`Alert triggered by contextual event - Details passed: ${JSON.stringify(context)}`)
}

const alertNewEventHandler = (context) => {
  console.log({ context })
  alert(`Alert triggered by contextual event - Details passed: ${JSON.stringify(context)}`)
}

document.getElementById("canvas").setEventHandlers({
  "test-panel-with-configuration-ConfigurablePanel": {
    "alert-event": alertEventHandler,
  },
  "react-test-component-selector-ReactTestComponentSelector": {
    "new-alert-event": alertNewEventHandler,
  },
})




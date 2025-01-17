
import React from "react"
import { createPanel,   HtmlElementWithCanvas,
    HtmlElementWithConfiguration,
    HtmlElementWithContextualEvent,
    HtmlElementWithResource } from "@synanetics/panel-library"
import { ReactComponentBase } from "../../ReactComponentBase"
import { schema } from "./index"


type ConfigurablePanelType = 
    HTMLElement &
  HtmlElementWithCanvas &
  HtmlElementWithResource &
  HtmlElementWithContextualEvent &
  ReactComponentBase

export class ReactTestComponent extends createPanel<ConfigurablePanelType, ReactComponentBase>(schema, ReactComponentBase) {
    constructor() {
        super()
        
        
        this.jsxRootComponent = () => {
              const patientResource = (this.getResources<fhir.Patient>("Patient") || [])[0]
              console.log("events", this.getContextualEvents())
              return (
                <>
                <div>Test React component</div>
                <button onClick={()=>{
                  /* There is work that needs doing in the panel library as contextual events don't
               * necessarily need to have a FhirContext type hence the ts-ignore
               * @ts-ignore*/
                  this.triggerContextualEvent('new-alert-event', { data: "There was an error!" })}}>Simulate Error Button</button>
                </>
              )
            }   
      }
      
    
  connectedCallback() {
    super.connectedCallback && super.connectedCallback()

    this.render()
  } 
  
}

customElements.define(schema.panelTag, ReactTestComponent)


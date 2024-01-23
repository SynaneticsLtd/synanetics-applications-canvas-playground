import React, { ReactNode } from "react"
import { Root, createRoot } from "react-dom/client"

/**
 * This is an example wrapper component. You can use the ReactComponentBase class to create React panels where the this.jsxRootComponent is wrapped
 * in something. These could be utility functions, React Context, Theme Providers etc.
 * @returns A React component wrapped in a div
 */
const ExampleWrapper = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>
}

/**
 * Sets up a panel for use with React and adds default wrapper elements. It should be used as the base class of panels.
 */
export class ReactComponentBase extends HTMLElement {
  /**The main React component for the panel. This will re-render whenever this.render() is called in the panel */
  jsxRootComponent: () => React.ReactElement
  /**The shadow root element */
  shadow!: ShadowRoot
  /**Where to mount the React root */
  mountPoint: HTMLDivElement
  /**The React root */
  root: Root

  constructor() {
    super()

    this.jsxRootComponent = () => <div></div>

    this.shadow = this.attachShadow({ mode: "open" })

    this.mountPoint = document.createElement("div")

    this.shadow.append(this.mountPoint)

    this.root = createRoot(this.mountPoint)
  }

  /**Default web component callback. Fired when the component is connected. */
  connectedCallback() {
    this.render()
  }

  /**The render function of the web component */
  render() {
    this.root.render(<ExampleWrapper>{this.jsxRootComponent()}</ExampleWrapper>)
  }
}

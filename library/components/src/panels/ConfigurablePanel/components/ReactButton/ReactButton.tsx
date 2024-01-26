import React from "react"
//Be advised that import "./ReactButton.scss" will not work here
//This is due to the way webpack tries to load css files and it not being able to attach it to the shadow DOM
//To use SCSS or CSS in web components, we usually attach it manually to the shadow DOM. (See ConfigurablePanel.tsx)

interface ReactButtonProps {
  name: string
  onClick: () => void
}
/**
 * A basic button component to demonstrate features of React
 */
export const ReactButton = ({ name, onClick }: ReactButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {name}
    </button>
  )
}

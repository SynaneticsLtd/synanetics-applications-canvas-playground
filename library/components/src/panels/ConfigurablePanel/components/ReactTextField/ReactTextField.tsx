import React from "react"

interface ReactButtonProps {
  onChange: (value: string) => void
  value?: string
}
/**
 * A basic text field component to demonstrate features of React
 */
export const ReactTextField = ({ value, onChange }: ReactButtonProps) => {
  return <input className="react-text-field" onChange={(e) => onChange(e.target.value)} value={value}></input>
}

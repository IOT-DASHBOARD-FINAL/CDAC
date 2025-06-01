import * as React from "react"










import {
  FieldError as FieldErrorPrimitive,
  Group,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  Text
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn, ctr } from "./primitive"










const fieldStyles = tv({
  slots: {
    description: "text-pretty text-base/6 text-muted-fg sm:text-sm/6",
    label: "w-fit cursor-default font-medium text-secondary-fg text-sm",
    fieldError: "text-sm/6 text-danger forced-colors:text-[Mark]",
    input: [
      "w-full min-w-0 [&::-ms-reveal]:hidden bg-transparent py-2 px-2.5 text-base text-fg placeholder-muted-fg outline-none focus:outline-none lg:text-sm"
    ]
  }
})

const { description, label, fieldError, input } = fieldStyles()

const Label = ({ className, ...props }) => {
  return <LabelPrimitive {...props} className={label({ className })} />
}





const Description = ({ className, ...props }) => {
  const isWarning = props.isWarning ?? false
  return (
    <Text
      {...props}
      slot="description"
      className={description({ className: isWarning ? "text-warning" : className })}
    />
  )
}

const FieldError = ({ className, ...props }) => {
  return <FieldErrorPrimitive {...props} className={ctr(className, fieldError())} />
}

const FieldGroup = ({ className, ...props }) => {
  return (
    <Group
      {...props}
      className={cn([
        "border border-input transition duration-200 ease-out rounded-lg flex items-center",
        "focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/20",
        "group-invalid:focus-within:border-danger focus-within:ring-4 group-invalid:focus-within:ring-danger/20",
        "[&>[role=progressbar]]:mr-2.5",
        "[&_[data-slot=icon]]:size-4 [&_[data-slot=icon]]:shrink-0",
        "[&>[data-slot=suffix]]:mr-2.5 [&>[data-slot=suffix]]:text-muted-fg",
        "[&>[data-slot=prefix]]:ml-2.5 [&>[data-slot=prefix]]:text-muted-fg",
        "group-disabled:opacity-50",
        className
      ])}
    />
  )
}

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return <InputPrimitive ref={ref} {...props} className={ctr(className, input())} />
})

Input.displayName = "Input"

export { Description, FieldError, FieldGroup, Input, Label, }

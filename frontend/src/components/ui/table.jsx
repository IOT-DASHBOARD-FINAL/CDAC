"use client"

import React, { createContext, useContext } from "react"
import { IconChevronLgDown, IconHamburger } from "justd-icons"
import {
  Button,
  Cell,
  Collection,
  Column,
  ColumnResizer as ColumnResizerPrimitive,
  ResizableTableContainer,
  Row,
  TableBody as TableBodyPrimitive,
  TableHeader as TableHeaderPrimitive,
  Table as TablePrimitive,
  composeRenderProps,
  useTableOptions,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "@/utils/classes"
import { Checkbox } from "./checkbox"

const table = tv({
  slots: {
    root: "table w-full min-w-full caption-bottom border-spacing-0 text-sm outline-hidden [--table-selected-bg:color-mix(in_oklab,var(--color-primary)_5%,white_90%)] dark:[--table-selected-bg:color-mix(in_oklab,var(--color-primary)_25%,black_70%)]",
    header: "x32 border-b",
    row: "tr group relative cursor-default border-b border-gray-300 bg-bg text-muted-fg outline-hidden ring-primary",
    cellIcon: "grid size-[1.15rem] flex-none shrink-0 place-content-center rounded bg-secondary text-fg",
    columnResizer: "absolute top-0 right-0 bottom-0 grid w-px touch-none place-content-center px-1",
  },
})

const { root, header, row, cellIcon, columnResizer } = table()

const TableContext = createContext({ allowResize: false })
const useTableContext = () => useContext(TableContext)

const Table = ({ children, className, ...props }) => (
  <TableContext.Provider value={props}>
    <div className="relative w-full overflow-auto">
      {props.allowResize ? (
        <ResizableTableContainer className="overflow-auto cursor-pointer">
          <TablePrimitive {...props} className={root({ className })}>
            {children}
          </TablePrimitive>
        </ResizableTableContainer>
      ) : (
        <TablePrimitive {...props} className={root({ className })}>
          {children}
        </TablePrimitive>
      )}
    </div>
  </TableContext.Provider>
)

const ColumnResizer = ({ className, ...props }) => (
  <ColumnResizerPrimitive
    {...props}
    className={composeRenderProps(className, (className, renderProps) =>
      columnResizer({ ...renderProps, className })
    )}
  >
    <div className="h-full w-px bg-border py-3" />
  </ColumnResizerPrimitive>
)

const TableBody = (props) => (
  <TableBodyPrimitive data-slot="table-body" {...props} className={cn("[&_.tr:last-child]:border-0")} />
)

const cellStyles = tv({
  base: "group whitespace-nowrap px-3 py-3 outline-hidden",
  variants: { allowResize: { true: "overflow-hidden truncate" } },
})

const TableCell = ({ children, className, ...props }) => {
  const { allowResize } = useTableContext()
  return (
    <Cell data-slot="table-cell" {...props} className={cellStyles({ allowResize, className })}>
      {children}
    </Cell>
  )
}

const columnStyles = tv({
  base: "relative allows-sorting:cursor-pointer whitespace-nowrap px-3 py-3 text-left font-medium outline-hidden",
  variants: { isResizable: { true: "overflow-hidden truncate" } },
})

const TableColumn = ({ isResizable = false, className, ...props }) => (
  <Column data-slot="table-column" {...props} className={columnStyles({ isResizable, className })}>
    {({ allowsSorting, sortDirection, isHovered }) => (
      <div className="flex items-center gap-2">
        {props.children}
        {allowsSorting && (
          <span className={cellIcon({ className: isHovered ? "bg-secondary-fg/10" : "" })}>
            <IconChevronLgDown className={sortDirection === "ascending" ? "rotate-180" : ""} />
          </span>
        )}
        {isResizable && <ColumnResizer />}
      </div>
    )}
  </Column>
)

const TableHeader = ({ children, className, columns, ...props }) => {
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()
  return (
    <TableHeaderPrimitive data-slot="table-header" className={header({ className })} {...props}>
      {allowsDragging && <Column className="w-0" />}
      {selectionBehavior === "toggle" && (
        <Column className="w-0 pl-4">
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </TableHeaderPrimitive>
  )
}

const TableRow = ({ children, className, columns, id, ...props }) => {
  const { selectionBehavior, allowsDragging } = useTableOptions()
  return (
    <Row data-slot="table-row" id={id} {...props} className={row({ className })}>
      {allowsDragging && (
        <Cell className="group cursor-grab pr-0 ring-primary">
          <Button className="relative bg-transparent py-1.5 pl-3.5 text-muted-fg" slot="drag">
            <IconHamburger />
          </Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell className="pl-4">
          <span aria-hidden className="absolute inset-y-0 left-0 hidden h-full w-0.5 bg-primary group-data-selected:block" />
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  )
}

Table.Body = TableBody
Table.Cell = TableCell
Table.Column = TableColumn
Table.Header = TableHeader
Table.Row = TableRow

export { Table }

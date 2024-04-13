import React from 'react'
import { SortButton } from './SortButton'

export const TableHeader = ({tableHeadersData, sortOrder, onHandleClick}) => {

    const tableHeaders = tableHeadersData.map((column) => {
        return <th key={column.key}> {column.value} <SortButton sortOrder={sortOrder} onHandleClick={onHandleClick(column.key)} /></th>
    })

    return (
        <thead>
            <tr>
                {tableHeaders}
            </tr>
        </thead>
    )
}

import React from 'react'

export default function TableHeader ({tableHeadersData, onHandleClick})  {

    return (
        tableHeadersData.map((column) => {
            // return <th key={column.key}> {column.value} <SortButton sortOrder={sortOrder} onHandleClick={onHandleClick(column.key)} /></th>
            return <th key={column.key} className='table-th' style={{width: "25%"}} onClick={() => onHandleClick(column.key)}> {column.value} <span style={{float: "right", paddingRight: "8px"}}>&#8645;</span></th>
        })
    )
}

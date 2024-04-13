import React from 'react'
import tableData from "../data.json";
import { tableHeadersData } from './Constants';

export const SortableChildTable = React.memo(({ parentId }) => {

    const tableHeaders = tableHeadersData.map((column) => {
        return <th key={column.key}> {column.value}</th>
    })

    // Temperory showing next 10 records from the selected row.
    const clickedRowIndex = tableData.findIndex(rowItem => rowItem.id == parentId)
    const getChildTableData = tableData.slice(clickedRowIndex, clickedRowIndex + 10)

    const tableRowData =
        getChildTableData.map((listItem) => {
            return (
                <tr key={listItem.id}>
                    <td>{listItem.id}</td>
                    <td>{listItem.first_name}</td>
                    <td>{listItem.last_name}</td>
                    <td>{listItem.email}</td>
                    <td>{listItem.gender}</td>
                    <td>{listItem.ip_address}</td>
                </tr>
            )
        })

    return (
        <div className='div-child-table'>{
            parentId === 0 ?
                <h1> No data available.</h1>
                :
                <div>
                    <table>
                        <thead>
                            <tr>
                                {tableHeaders}
                            </tr>
                        </thead>

                        <tbody>
                            {tableRowData}
                        </tbody>
                    </table>
                </div>
        }</div>
    )
})

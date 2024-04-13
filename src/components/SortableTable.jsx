import React, { useCallback, useState } from 'react'
import { SortButton } from './SortButton'
import { TableHeader } from './TableHeader'
import { doSorting } from './Utils'
import { SortableChildTable } from './SortableChildTable'

export const SortableTable = ({ listOfData, tableHeaderData }) => {

    const [sortKey, setSortKey] = useState("id")
    const [order, setOrder] = useState("asc")
    const [searchText, setSearchText] = useState("")
    const [gender, setGender] = useState("")
    const [parentId, setParentId] = useState(0)

    const sortedData = useCallback(() =>
        doSorting(listOfData, sortKey, order === "asc").filter((rowItem) => {
            return (rowItem.first_name.includes(searchText.trim()) || rowItem.last_name.includes(searchText.trim())) && rowItem.gender.includes(gender.trim())
        })
        , [sortKey, order, searchText, gender])

    function changeSort(columnKey) {
        setOrder(order === "asc" ? "desc" : "asc")
        setSortKey(columnKey)
    }

    const tableHeaders = tableHeaderData.map((column) => {
        return <th key={column.key}> {column.value} {column.sortable && <SortButton sortOrder={order} onHandleClick={() => changeSort(column.key)} />}</th>
    })

    const onTableRowClick = (listItem) => {
        setParentId(listItem.id)
    }

    const tableRowData =
        sortedData().map((listItem) => {
            return (
                <tr key={listItem.id} className='table-row-clickable' onClick={() => onTableRowClick(listItem)}>
                    <td>{listItem.id}</td>
                    <td className='tooltip'>{listItem.first_name}
                        <span class="tooltiptext">My last name is {listItem.last_name} </span>
                    </td>
                    <td>{listItem.last_name}</td>
                    <td>{listItem.email}</td>
                    <td>{listItem.gender}</td>
                    <td>{listItem.ip_address}</td>
                </tr>
            )
        })

    return (
        <>
            <h1>Sortable Table</h1>

            <input className='search-input' type='search' value={searchText} placeholder='Search by name' onInput={(event) => setSearchText(event.target.value)} />
            <select name="gender" onChange={(e) => {
                setGender(e.target.value)
            }}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="agender">Agender</option>
            </select>

            {/* Parent Table */}

            <div className='div-table'>
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

            {/* Child Table */}

            <SortableChildTable parentId={parentId} />

        </>
    )
}

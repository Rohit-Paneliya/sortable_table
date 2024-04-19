import React, { useCallback, useState } from 'react'
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
        //{column.sortable && <SortButton sortOrder={order} onHandleClick={() => changeSort(column.key)} />}
        return <th key={column.key} className='table-th' onClick={() => changeSort(column.key)}> {column.value} <span style={{ float: "right", paddingRight: "8px" }}>&#8645;</span></th>
    })

    const onTableRowClick = (listItem) => {
        setParentId(listItem.id)
    }

    // const tableRowData =
    //     sortedData().map((listItem) => {
    //         return (
    //             <tr key={listItem.id} className='table-row-clickable' onClick={() => onTableRowClick(listItem)}>                    
    //                 <td style={{textAlign: "left", paddingLeft: "8px"}}>{listItem.id}</td>
    //                 <td className='tooltip'>{listItem.first_name}
    //                     <span class="tooltiptext">My last name is {listItem.last_name} </span>
    //                 </td>
    //                 <td>{listItem.last_name}</td>
    //                 <td>{listItem.email}</td>
    //                 <td>{listItem.gender}</td>
    //                 <td>{listItem.ip_address}</td>
    //             </tr>
    //         )
    //     })

    const tableRowData = sortedData().map((listItem) => (
        listItem.email.map((email, index) => (
            <>
            {
                index === 0 ?
                <tr key={listItem.id} className='table-row-clickable' onClick={() => onTableRowClick(listItem)}>
                    <td rowSpan={listItem.email.length} style={{ textAlign: "left", paddingLeft: "8px" }}>{listItem.id}</td>
                    <td rowSpan={listItem.email.length} className='tooltip'>{listItem.first_name}
                        <span class="tooltiptext">My last name is {listItem.last_name} </span>
                    </td>
                    <td rowSpan={listItem.email.length}>{listItem.last_name}</td>
                    <td>{email}</td>
                    <td rowSpan={listItem.email.length}>{listItem.gender}</td>
                    <td rowSpan={listItem.email.length}>{listItem.ip_address}</td>
                </tr>
                :

                <tr key={listItem.id} className='table-row-clickable' onClick={() => onTableRowClick(listItem)}>
                    <td>{email}</td>
                </tr>
            }
            </>
            
        ))
    ))



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
                <table className='cache-table'>
                    <thead className='table-thead'>
                        <tr>
                            {tableHeaders}
                        </tr>
                    </thead>

                    <tbody className='table-tbody'>

                        {
                            tableRowData
                            // test
                        }
                        {
                            console.log(tableRowData)
                        }
                    </tbody>
                </table>
            </div>

            {/* Child Table */}

            <SortableChildTable parentId={parentId} />

        </>
    )
}

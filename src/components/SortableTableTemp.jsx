import React, { useCallback, useState } from 'react'
import { doSorting } from './Utils'
import { SortableChildTable } from './SortableChildTable'
import {CustomDropdown} from './CustomDropdown'
import TableHeader from './TableHeader'
import { SortButton } from './SortButton'

export const SortableTableTemp = ({ listOfData, tableHeaderData }) => {

    const [sortKey, setSortKey] = useState("id")
    const [order, setOrder] = useState("asc")
    const [parentId, setParentId] = useState(0)

    const allNames = Array.from(new Set(listOfData.map((rowItem) => {
        return rowItem.first_name
    }))).sort()

    const allGenders = Array.from(new Set(listOfData.map((rowItem) => {
        return rowItem.gender
    }))).sort()

    //Drop downs states
    const [gender, setGender] = useState("")
    const [genderList, setGenderList] = useState(allGenders)
    const [name, setName] = useState("")
    const [namesList, setNamesList] = useState(allNames)
    const [shouldDisable, setShouldDisable] = useState(false) // enable/disable - true means enable
    
    
    const sortedData = useCallback(() => {
        return doSorting(listOfData, sortKey, order === "asc").filter((rowItem) => {
            // return (rowItem.first_name.includes(searchText.trim()) || rowItem.last_name.includes(searchText.trim())) && rowItem.gender.includes(gender.trim())
            return (gender === "" || rowItem.gender === gender) && (name === "" || rowItem.first_name === name)
        })
    }, [sortKey, order, gender, name])

    function changeSort(columnKey) {        
        setOrder(order === "asc" ? "desc" : "asc")
        setSortKey(columnKey)
    }

    const onTableRowClick = (listItem) => {
        setParentId(listItem.id)
    }

    const tableRowData =
        sortedData().map((listItem) => {
            return (
                <tr key={listItem.id} className='table-row-clickable' onClick={() => onTableRowClick(listItem)}>
                    <td style={{ textAlign: "left", paddingLeft: "8px" }}>{listItem.id}</td>
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

    const onGenderDropDownValueSelected = (selectedValue) => {
        setGender(selectedValue)
        if(selectedValue === "") {
            setNamesList(allNames)
        } else {
            const dropDownNames = listOfData.filter((item) => {
                // return rowItem.gender.includes(gender.trim())
                return item.gender === selectedValue
            }).map((rowItem) => {
                return rowItem.first_name
            })
            setNamesList(dropDownNames)
        }
        
    }

    const onNameDropDownValueSelected = (selectedValue) => {
        setName(selectedValue)
        if(selectedValue === "") {   
            setShouldDisable(false)
            setGenderList(allGenders)
            setGender("")
        } else { // select dropdown with single value and disable it.
            const selectedRow = listOfData.filter((rowItem) => rowItem.first_name === selectedValue)            
            setGenderList(Array.from([selectedRow[0].gender]))
            setGender(selectedRow[0].gender)
            setShouldDisable(true)
        }        
    }

    const onResetClick = () => {    
        setName("")    
        setGender("")
        setNamesList(allNames)
        setGenderList(allGenders)
        setShouldDisable(false)        
    }


    return (
        <>            
            <h1>Sortable Table Temp</h1>

            <CustomDropdown options={namesList} onValueSelected={onNameDropDownValueSelected} shouldDisable={false} selectedValue={name}  />
            <CustomDropdown options={genderList} onValueSelected={onGenderDropDownValueSelected} shouldDisable={shouldDisable} selectedValue={gender}/>

            {/* <select id="dropdown" value= {name} style={{ margin: "1rem" }}  name="test" onChange={(e) => {
                onNameDropDownValueSelected(e.target.value)
            }}>                
                {
                    namesList.map((option) => {        
                        return <option value={option.toLowerCase()=== "select" ? "" : option}>{option}</option>
                    })
                }
            </select> */}
            
            <button onClick={onResetClick}>Reset</button>
        

            {/* Parent Table */}

            <div className='div-table'>
                <table className='cache-table'>
                    <thead className='table-thead'>
                        <tr>
                            {/* {tableHeaders} */}
                            <TableHeader tableHeadersData={tableHeaderData} onHandleClick={(columnKey) => { changeSort(columnKey) }} />
                        </tr>
                    </thead>

                    <tbody className='table-tbody'>
                        {tableRowData}
                    </tbody>
                </table>
            </div>

            {/* Child Table */}

            <SortableChildTable parentId={parentId} />
        </>
    )
}

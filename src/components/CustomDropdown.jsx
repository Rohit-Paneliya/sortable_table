import React, { useEffect } from 'react'

export const CustomDropdown = React.memo(({ options, onValueSelected, dropdownState, selectedValue= "" }) => {

    const renderOptions = options.map((option) => {        
        return <option value={option.toLowerCase()=== "select" ? "" : option}>{option}</option>
    })

    return (
        <>
            <select id="dropdown" value={selectedValue} style={{ margin: "1rem" }} disabled={!dropdownState} name="test" onChange={(e) => {
                onValueSelected(e.target.value)
            }}>                
                {
                    renderOptions
                }
            </select>
        </>
    )
})

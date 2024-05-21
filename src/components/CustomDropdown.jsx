import React, { useEffect } from 'react'

export const CustomDropdown = React.memo(({ options, onValueSelected, shouldDisable, selectedValue = "" }) => {

    const renderOptions = options.map((option) => {
        return <option value={option}>{option}</option>        
    })

    return (
        <>
            <select id="dropdown" value={selectedValue} style={{ margin: "1rem" }} disabled={shouldDisable} name="test" onChange={(e) => {
                onValueSelected(e.target.value)
            }}>
                {
                    <option value={""}>Select</option>
                }
                {
                    renderOptions
                }
            </select>
        </>
    )
})

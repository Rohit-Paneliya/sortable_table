import React from 'react'

export const SortButton = ({ sortOrder, onHandleClick}) => {
  return (
    <button onClick={onHandleClick}>{sortOrder === "asc" ? "Asc" : "Desc"}</button>
  )
}

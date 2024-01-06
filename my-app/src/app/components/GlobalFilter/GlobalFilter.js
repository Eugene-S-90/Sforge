
import React, { useState } from 'react'
import {
    useAsyncDebounce,
} from 'react-table'
import styles from '../MainTable/MainTable.module.css'
import 'regenerator-runtime'

export default function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter, }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <input className={styles.search_input}
            value={value || ""}
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={`Search ${count} records...`}
            style={{
                fontSize: '1.1rem',
                border: '0',
            }}
        />

    )
}
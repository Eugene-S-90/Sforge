"use client"
import React, { useState, useEffect } from 'react'
import makeData from './makeData'
import fetchGlobalData from './fetchGlobalData'
import Table from './Table'

export default function MainTable() {
    let datat = fetchGlobalData();
    const columns = React.useMemo(
        () => [
            {
                Header: 'Include Avatar',
                accessor: 'firstName',
            },
            {
                Header: 'Name',
                accessor: 'lastName',
            },
            {
                Header: 'Description',
                accessor: 'Description',
            },
            {
                Header: 'Author',
                accessor: 'Author',
            },
            {
                Header: 'Dialogs',
                accessor: 'Dialogs',
            },
            {
                Header: 'Updated',
                accessor: 'Updated',
            },
            {
                Header: 'Created',
                accessor: 'Created',
            },
            {
                Header: '24h changes',
                accessor: '24',
            },
            {
                Header: '7d changes',
                accessor: '7',
            },

        ],
        []
    )

    // const data = React.useMemo(() => makeData(20), [])
    const data = React.useMemo(() => datat, [])

    return (
        <div>
            <Table columns={columns} data={data} />
        </div>
    )
}

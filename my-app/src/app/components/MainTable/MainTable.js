"use client"
import React, { useState, useEffect } from 'react'
import makeData from './makeData'
import fetchGlobalData from './fetchGlobalData'
import Table from './Table'

export default function MainTable() {
    const [fetchedData, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dev.app.spellforge.ai/api/public-agent-stats/');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                console.log(jsonData)
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Include Avatar',
                accessor: 'avatar',
            },
            {
                Header: 'Chart',
                accessor: 'chart',
            },
            {
                Header: 'Created',
                accessor: 'created',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Dialogs',
                accessor: 'dialogs_num',
            },
            {
                Header: 'Updated',
                accessor: 'updated',
            },

        ],
        []
    )

    const data = React.useMemo(() => fetchedData.results ? fetchedData.results : [], [fetchedData])

    return (
        <div>
            <Table columns={columns} data={data} />
        </div>
    )
}

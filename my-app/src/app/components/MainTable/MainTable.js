"use client"
import React, { useState, useEffect } from 'react'
import Table from './Table'

import Image from 'next/image'
import mockImg from '../../../../public/images/photo_2024-01-06_20-59-36.jpg'

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
                Cell: ({ row, cell }) => {
                    return <div>
                        <Image
                            src={mockImg}
                            alt="Picture of the author"
                            width={70}
                            height={50}
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                        />
                    </div>
                }
            },
            {
                Header: 'Created',
                accessor: 'created',
                Cell: ({ row, cell }) => {
                    let date = new Date(row.values.created)
                    return <div>{` ${date.toLocaleString()}`}</div >
                },
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({ row, cell }) => {
                    return <div>{row.values.description ? row.values.description : "Description goes there"}</div>
                },
            },
            {
                Header: 'Dialogs',
                accessor: 'dialogs_num',
            },
            {
                Header: 'Updated',
                accessor: 'updated',
                Cell: ({ row, cell }) => {
                    let date = new Date(row.values.updated)
                    return <div>{` ${date.toLocaleString()}`}</div >
                },
            },
            {
                Header: 'Chart',
                accessor: 'chart',
                Cell: ({ row, cell }) => {
                    return <div>
                        <Image
                            src={mockImg}
                            alt="Picture of the author"
                            width={70}
                            height={50}
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                        />
                    </div>
                }
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

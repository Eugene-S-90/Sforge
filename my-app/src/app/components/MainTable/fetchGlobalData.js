"use client"
import React, { useState, useEffect } from 'react'

export default function fetchGlobalData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dev.app.spellforge.ai/api/public-agent-stats/');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        [
            { firstName: 'jon', lastName: "Ddow", age: 24, visits: 12, Description: 'description', Author: 'jeka1' },
            { firstName: 'jin', lastName: "jow", age: 22, visits: 1,Description: 'description', Author: 'Andrew2' },

        ]
    )
}

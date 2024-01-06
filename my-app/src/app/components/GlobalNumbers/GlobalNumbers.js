"use client"
import React, { useState, useEffect } from 'react'
import styles from './GlobalNumbers.module.css'

export default function globalNumbers() {

  const [fetchedData, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.app.spellforge.ai/api/global-records/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(jsonData)
        setData(jsonData[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(fetchedData)

  let items = [
    { name: 'AI agents:', value: 12 },
    { name: 'Delta :', value: 6 },
    { name: 'Visits over time:', value: '23000' },
    { name: "24h Vol:", value: "$85.254B" },
    { name: "volumes :", value: "BTC 47.6%" },
  ]

  const listItems = items.map((element, key) => {
    return <div key={key} className={styles.global_numbers_item}>
      <div className={styles.global_numbers_item_name}>
        {element.name}
      </div>
      <div className={styles.global_numbers_item_value}>
        {element.value}
      </div>
    </div>
  }
  );

  return (
    <div className={styles.global_numbers_wr}>

      <div className={styles.global_numbers_item}>
        <div className={styles.global_numbers_item_name}>
          Total agents:
        </div>
        <div className={styles.global_numbers_item_value}>
          {fetchedData.total_agents}
        </div>
      </div>

      <div className={styles.global_numbers_item}>
        <div className={styles.global_numbers_item_name}>
          Total agents delta:
        </div>
        <div className={styles.global_numbers_item_value}>
          {fetchedData.total_agents_delta}
        </div>
      </div>

      <div className={styles.global_numbers_item}>
        <div className={styles.global_numbers_item_name}>
          Total dialogs:
        </div>
        <div className={styles.global_numbers_item_value}>
          {fetchedData.total_dialogs}
        </div>
      </div>

      <div className={styles.global_numbers_item}>
        <div className={styles.global_numbers_item_name}>
          7d:
        </div>
        <div className={styles.global_numbers_item_value}>
          {fetchedData._7d}
        </div>
      </div>

      <div className={styles.global_numbers_item}>
        <div className={styles.global_numbers_item_name}>
          24h:
        </div>
        <div className={styles.global_numbers_item_value}>
          {fetchedData._24h}
        </div>
      </div>


      <div className={styles.global_numbers_item}>
        <div className={styles.global_numbers_item_name}>
          24h %:
        </div>
        <div className={styles.global_numbers_item_value}>
          {fetchedData._24h_percent}
        </div>
      </div>


    </div>
  )
} 
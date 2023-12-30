"use client"
import React from 'react'
import styles from './GlobalNumbers.module.css'

export default function globalNumbers() {
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
      {listItems}
    </div>
  )
} 
"use client"
import { useTable, useSortBy } from 'react-table'
import styles from './MainTable.module.css'
export default function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case


    return (
        <>
            <table className={`${styles.table}`} {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th className={styles.th}  {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr className={styles.tr} {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td className={styles.td} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </>
    )
}
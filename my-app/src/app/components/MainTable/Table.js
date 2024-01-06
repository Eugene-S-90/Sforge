"use client"
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import styles from './MainTable.module.css'


import GlobalFilter from '../GlobalFilter/GlobalFilter'
import GlobalNumbers from '../../components/GlobalNumbers/GlobalNumbers'

export default function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        state: { globalFilter, pageIndex, pageSize },
        page,

        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,


        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination

    )

    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case


    return (
        <>

            <div className={styles.table__top_content}>
                <div className="search__wr">
                    {/* <IconSearch /> */}
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                </div>
                <GlobalNumbers />
            </div>
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
                    {page.map(
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
            <div className={styles.pagination}>
                <div className='pagination_btn' onClick={() => gotoPage(0)}>

                </div>
                <button className={styles.pagination_btn} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.43312 0.704965L5.71669 0L0.366369 5.14752L0 5.5L5.71669 11L6.43312 10.295L1.44917 5.5L6.43312 0.704965ZM10 0.704965L9.28357 0L3.93325 5.14752L3.56688 5.5L9.28357 11L10 10.295L5.01605 5.5L10 0.704965Z" fill="#5F6E7F" fillOpacity="1" />
                    </svg>
                </button>{' '}
                <button className={styles.pagination_btn} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.34268 0L6 0.674887L1.30047 5.5L6 10.3251L5.34268 11L0.31449 5.83744L0 5.5L0.31449 5.16256L5.34268 0Z" fill="#5F6E7F" fillOpacity="1" />
                    </svg>
                </button>{' '}
                <button className={styles.pagination_btn} onClick={() => nextPage()} disabled={!canNextPage}>
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.657321 0L5.68551 5.16256L6 5.5L5.68551 5.83744L0.657321 11L0 10.3251L4.69953 5.5L0 0.674887L0.657321 0Z" fill="#5F6E7F" fillOpacity="1" />
                    </svg>
                </button>{' '}
                <button className={styles.pagination_btn} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.43312 5.5L0.716433 0L0 0.704965L4.98395 5.5L0 10.295L0.716433 11L6.43312 5.5ZM10 5.5L4.28331 0L3.56688 0.704965L8.55083 5.5L3.56688 10.295L4.28331 11L10 5.5Z" fill="#5F6E7F" fillOpacity="1" />
                    </svg>
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
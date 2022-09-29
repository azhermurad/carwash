import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

function DashboardTable({ rows, columns, height, size, func}) {
    return (
        <>
            <div className='dashboard-table-wrapper'>
                <div className='dashboard-table' style={{ height }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={size}
                        disableSelectionOnClick
                        // checkboxSelection
                        // onSelectionModelChange={itm => console.log(itm)}
                    />
                </div>
            </div>
        </>
    )
}

export default DashboardTable
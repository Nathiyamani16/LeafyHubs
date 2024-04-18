import React from 'react'
import DBHeader from './DBHeader'
import {Routes,Route} from "react-router-dom"
import DashboardHome from './DashboardHome'
import DashboardOrders from './DashboardOrders'
import DashboardItems from './DashboardItems'
import DashboardNewItems from './DashboardNewItems'
import DashboardUser from './DashboardUser'

const DataRightSec = () => {
  return (
    <div className='flex flex-col py-12 px-12 flex-1 h-full'>
      <DBHeader/>
      <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
        <Routes>
          <Route path="/home" element={<DashboardHome/>}/>
          <Route path="/orders" element={<DashboardOrders/>}/>
          <Route path="/items" element={<DashboardItems/>}/>
          <Route path="/newItems" element={<DashboardNewItems/>}/>
          <Route path="/users" element={<DashboardUser/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default DataRightSec

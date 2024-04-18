import React from 'react'
import { DataLeftSec, DataRightSec } from '../components'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen flex items-center bg-primary'>
      <DataLeftSec/>
      <DataRightSec/>
    </div>
  )
}

export default Dashboard

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllUsers, getallProducts, deleteProduct } from '../api';
import {setallUserDetails} from "../context/action/alluserAction"
import { TbCurrencyRupee } from 'react-icons/tb';


import { alertNULL, alertSuccess } from '../context/action/alertAction';
import { setallProducts } from '../context/action/productActions';
import DataTable from './DataTable';
const DashboardUser = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setallUserDetails(data));
      });
    }
  }, []);

  return     <div className='flex items-center tify-centeesu gap-4 pt-6 w-full '>
  <DataTable
    columns={[
      {
        title: 'Image',
        field: 'photoURL',
        render: (rowData) => (
          <img  className='w-32 h-16 object-contain rounded-md' src={rowData.photoURL ? rowData.photoURL : rowData.Avatar} />
        ),
      },
      {
        title: 'Name',
        field: 'displayName',
      },
      {
        title: 'Email',
        field: 'email',
      },
      {
        title: 'Verified',
        field: 'emailVerified',
        render:(rowData)=>(
          <p className={`px-2 py-1 w-32 text-center text-primary rounded-md
          ${rowData.emailVerified ? "bg-emerald-300" : "bg-red-500"}`}>
            {rowData.emailVerified ? "verfied" : "Not Verified"}

          </p>
        )
      },    
     
    ]}
    data={allUsers}
    title='List of Products'
    // actions={[
    //   {
    //     icon: 'edit',
    //     tooltip: 'Edit Data',
    //     onClick: (event, rowData) => {
    //       alert('You want to edit ' + rowData.productId);
    //     },
    //   },
    //   {
    //     icon: 'delete',
    //     tooltip: 'Delete Data',
    //     onClick: (event, rowData) => {
    //       if(
    //         window.confirm("Are you sure,you want to perform this action")
    //        )
    //        {
    //         deleteProduct(rowData.productId).then((res)=>{
    //           dispatch(alertSuccess("Product Delete"));
    //           setInterval(()=>{
    //             dispatch(alertNULL());
    //           },3000);
    //           getallProducts().then((data)=>{
    //             dispatch(setallProducts(data))
    //         });
    //        })
    //       }
    //     },
    //   },
    // ]}
  />
</div>;
};

export default DashboardUser;

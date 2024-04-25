import React from 'react';
import { TbCurrencyRupee } from 'react-icons/tb';
import { useSelector,useDispatch } from 'react-redux';
import { DataTable } from '../components';
import { deleteProduct, getallProducts } from '../api';
import { setallProducts } from '../context/action/productActions';
import { alertNULL, alertSuccess } from '../context/action/alertAction';


const DashboardItems = () => {
  const products = useSelector((state) => state.products);
  const dispatch=useDispatch();

  return (
    <div className='flex items-center tify-centeesu gap-4 pt-6 w-full '>
      <DataTable
        columns={[
          {
            title: 'Image',
            field: 'imageURL',
            render: (rowData) => (
              <img className='w-32 h-16 object-contain rounded-md' src={rowData.imageURL} />
            ),
          },
          {
            title: 'Name',
            field: 'product_name',
          },
          {
            title: 'Category',
            field: 'product_category',
          },
          {
            title: 'Price',
            field: 'product_price',
            render: (rowData) => (
              <p className='text-xl font-semibold text-textColor flex items-center '>
                <TbCurrencyRupee className='text-green-500' />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products}
        title='List of Products'
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Data',
            onClick: (event, rowData) => {
              alert('You want to edit ' + rowData.productId);
            },
          },
          {
            icon: 'delete',
            tooltip: 'Delete Data',
            onClick: (event, rowData) => {
              if(
                window.confirm("Are you sure,you want to perform this action")
               )
               {
                deleteProduct(rowData.productId).then((res)=>{
                  dispatch(alertSuccess("Product Delete"));
                  setInterval(()=>{
                    dispatch(alertNULL());
                  },3000);
                  getallProducts().then((data)=>{
                    dispatch(setallProducts(data))
                });
               })
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DashboardItems;

// import React from 'react';
// import { TbCurrencyRupee } from 'react-icons/tb';
// import { useSelector } from 'react-redux';
// import { DataTable } from '../components';

// const DashboardItems = () => {
//   const products = useSelector((state) => state.products);

//   return (
//     <div className='flex items-center tify-centeesu gap-4 pt-6 w-full '>
//       <DataTable
//         columns={[
//           {
//             title: 'Image',
//             field: 'imageURL',
//             render: (rowData) => (
//               <img className='w-32 h-16 object-contain rounded-md' src={rowData.imageURL} />
//             ),
//           },
//           {
//             title: 'Name',
//             field: 'product_name',
//           },
//           {
//             title: 'Category',
//             field: 'product_category',
//           },
//           {
//             title: 'Price',
//             field: 'product_price',
//             render: (rowData) => (
//               <p className='text-xl font-semibold text-textColor flex items-center '>
//                 <TbCurrencyRupee className='text-green-500' />
//                 {parseFloat(rowData.product_price).toFixed(2)}
//               </p>
//             ),
//           },
//           {
//             title: 'Actions',
//             field: 'actions',
//             render: (rowData) => (
//               <div className='flex gap-4'>
//                 <span
              
//                   className='cursor-pointer text-blue-500'
//                   onClick={() => alert('Edit ' + rowData.productId)}

//                 >
//                   Edit
//                 </span>
//                 <span
//                   className='cursor-pointer text-red-500'
//                   onClick:(even,rowData)=>{
//               if(
//                 window.confirm("Are you sure, you want tp perform this action")
//               ){
//                 else
//               }
//                   }
//                  >
//                   Delete
//                 </span>
//               </div>
//             ),
//           },
//         ]}
//         data={products}
//         title='List of Products'
//       />
//     </div>
//   );
// };

// export default DashboardItems;


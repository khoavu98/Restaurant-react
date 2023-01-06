import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import Table from '../../layouts/Table';
import DeleteOutlineTwoTone from '@material-ui/icons/DeleteOutlineTwoTone'
export default function OrderList(props) {
  const {setOrderId, setOrderListVisiblity} = props
  const [oderList, setOrderList] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.ORDER).fetchAll().then((res) => {
      console.log(res.data)
      setOrderList(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const showForUpdate = (id) => {
    setOrderId(id);
    setOrderListVisiblity(false);
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order No.</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Payed With</TableCell>
          <TableCell>Grand Total</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          oderList.map((item) => (
            <TableRow
              key={item.orderMasterId}>
              <TableCell onClick= {e => showForUpdate(item.orderMasterId)}>
                {item.orderNumber}
              </TableCell>
              <TableCell onClick= {e => showForUpdate(item.orderMasterId)}>
                {item.customer.customerName}
              </TableCell>
              <TableCell  onClick= {e => showForUpdate(item.orderMasterId)}>
                {item.pMethod}
              </TableCell>
              <TableCell  onClick= {e => showForUpdate(item.orderMasterId)}>
                {item.gtotal}
              </TableCell>
              <TableCell  onClick= {e => showForUpdate(item.orderMasterId)}>
                <DeleteOutlineTwoTone color="secondary"/>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

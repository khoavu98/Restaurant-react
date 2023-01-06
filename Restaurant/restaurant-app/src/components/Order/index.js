import React from 'react'
import useForm from '../../hooks/useForm'
import OrderForm from './OrderForm'
import { Grid } from '@material-ui/core'
import SearchFoodItems from './SearchFoodItems'
import OrderFoodItems from './OrderFoodItems'

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000)
const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: 'none',
  gTotal: 0,
  deletedOrderItemIds: '',
  orderDetails: [],
  customer: null
});
export default function Order() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls
  } = useForm(getFreshModelObject())

  const addFoodItem = (foodItem) => {
    let x = {
      orderMasterId: values.orderMasterId,
      orderDetailId: 0,
      foodItemId: foodItem.foodItemId,
      quantity: 1,
      foodItemPrice: foodItem.price,
      foodItemName: foodItem.foodItemName,
      foodItem: null,
      orderMaster: null
    }
    setValues({
      ...values,
      orderDetails: [...values.orderDetails, x]
    })
  }

  const removeFoodItem = (index, id) => {
    let x = { ...values };
    x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
    if (id !== 0) {
      x.deletedOrderItemIds = x.deletedOrderItemIds + id + ',';
    }
    setValues({
      ...x
    });
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <OrderForm
          {...{ values, setValues, errors, setErrors, handleInputChange, resetFormControls }}
        />
      </Grid>
      <Grid item xs={6}>
        <SearchFoodItems {...{
          addFoodItem
          , orderedFoodItems: values.orderDetails
        }} />
      </Grid>
      <Grid item xs={6}>
        <OrderFoodItems
          {...{
            orderedFoodItems: values.orderDetails
            , removeFoodItem
            , values
            , setValues
          }}
        />
      </Grid>
    </Grid>
  )
}

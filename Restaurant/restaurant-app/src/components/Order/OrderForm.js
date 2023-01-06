import { ButtonGroup, Grid, InputAdornment, makeStyles, Button as MuiButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Form from '../../layouts/Form'
import { Input, Select, Button } from '../../controls'
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ReorderIcon from '@material-ui/icons/Reorder';
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import { roundToDecimalPoint } from '../../utils'
import Popup from '../../layouts/Popup';
import OrderList from './OrderList';

const pMethod = [
  { id: 'none', title: 'Select' },
  { id: 'Cash', title: 'Cash' },
  { id: 'Card', title: 'Card' },
]

const userStyle = makeStyles(theme => ({
  adornmentText: {
    '& .MuiTypography-root': {
      color: '#f3b33d',
      fontWeight: 'bolder',
      fontSize: '1.5em'
    }
  },
  submitButtonGroup: {
    margin: theme.spacing(1),
    backgroundColor: '#f3b33d',
    color: '#000',
    '& .MuiButton-label': {
      textTranform: 'none'
    },
    '&:hover': {
      backgroundColor: '#f3b33d'
    }
  }
})
)

export default function OrderForm(props) {
  const { values, errors, setErrors, handleInputChange, setValues, resetFormControls } = props
  const classes = userStyle();
  const { x, setX } = useState();
  const [customerList, setCustomerList] = useState([]);
  const [orderListVisiblity, setOrderListVisiblity] = useState(false);
  const [orderId, setOrderId] = useState(0);

  //Effect
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
      .then(res => {
        let customerList = res.data.map(item => ({
          id: item.customerId,
          title: item.customerName
        }));
        customerList = [{ id: 0, title: 'Select' }].concat(customerList);
        setCustomerList(customerList);
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + (item.quantity * item.foodItemPrice)
    }, 0);
    setValues({
      ...values,
      gTotal: roundToDecimalPoint(gTotal)
    })
  }, [JSON.stringify(values.orderDetails)])

  useEffect(() => {
    if (orderId === 0) {
      resetFormControls();
    }
    else {
      createAPIEndpoint(ENDPOINTS.ORDER).fetchById(orderId)
        .then((res) => {
          setValues(res.data);
          setErrors({});
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [orderId])
  //validate
  const valiadteForm = () => {
    let temp = {};
    temp.customerId = values.customerId !== 0 ? "" : "This field is required";
    temp.pMethod = values.pMethod !== "none" ? "" : "This field is required";
    temp.orderDetails = values.orderDetails.length !== 0 ? "" : "This field is required"
    setErrors({ ...temp });
    return Object.values(temp).every(x => x === "");
  }
  //submit
  const submitOrder = (e) => {
    e.preventDefault();
    if (valiadteForm()) {
      if (values.orderMasterId === 0) {
        createAPIEndpoint(ENDPOINTS.ORDER).create({ ...values, orderNumber: values.orderNumber.toString() }).then((res) => {
          resetFormControls();
        }).catch(err => {
          console.log(err)
        })
      }
      else {
        createAPIEndpoint(ENDPOINTS.ORDER).update(values.orderMasterId, { ...values, orderNumber: values.orderNumber.toString() }).then((res) => {
          setOrderId(0);
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
  const openListOfOrder = () => {
    setOrderListVisiblity(true);
  }
  return (
    <>
      <Form onSubmit={submitOrder}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              disabled
              label="Order Number"
              name="OrderNumber"
              value={values.orderNumber}
              InputProps={{
                startAdornment: <InputAdornment
                  className={classes.adornmentText}
                  position='start'>#</InputAdornment>
              }}
            />
            <Select
              label='Customer'
              name="customerId"
              value={values.customerId}
              onChange={handleInputChange}
              options={customerList}
              error={errors.customerId}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label='Payment Method'
              name="pMethod"
              value={values.pMethod}
              onChange={handleInputChange}
              options={pMethod}
              error={errors.pMethod}
            />
            <Input
              disabled
              label="Grand Total"
              name="gTotal"
              value={values.gTotal}
              InputProps={{
                startAdornment: <InputAdornment
                  className={classes.adornmentText}
                  position='start'>$</InputAdornment>
              }} />
            <ButtonGroup className={classes.submitButtonGroup}>
              <MuiButton size='large' type='sbmit' endIcon={<RestaurantIcon />} >
                Submit
              </MuiButton>
              <MuiButton size='small' startIcon={<ReplayIcon />} />
            </ButtonGroup>
            <Button
              size='large'
              onClick={openListOfOrder}
              startIcon={<ReorderIcon />}>
              Orders
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Popup
        title="List of Orders"
        openPopup={orderListVisiblity}
        setOpenPopup={setOrderListVisiblity}
        children={<OrderList{...{ setOrderId, setOrderListVisiblity }} />} />

    </>

  )
}

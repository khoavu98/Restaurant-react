import {
  Button, ButtonGroup, IconButton, List, ListItem, ListItemSecondaryAction
  , ListItemText, Paper, makeStyles
} from '@material-ui/core';
import React from 'react'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'
import { roundToDecimalPoint } from '../../utils'

const useStyles = makeStyles(theme => ({
  paperRoot: {
    margin: '8px 0px',
    '&:hover': {
      cursor: 'pointer'
    },
    '&:hover $deleteButton': {
      display: 'block',
      color: 'red'
    }
  },
  buttonGroup: {
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    '& .MuiButtonBase-root': {
      border: 'none',
      minWidth: '25px',
      ppadding: '1px'
    },
    '& button:nth-child(2)': {
      fontSize: '1.2em',
      color: '#000'
    }
  },
  deleteButton: {
    display: 'none',
    '& .MuiButtonBase-root': {
      color: 'E81719'
    }
  },
  totalPerItem: {
    fontWeight: 'bolder',
    fontSize: '1.2em',
    margin: '0px 10px'
  }
}))


export default function OrderFoodItems(props) {
  const { removeFoodItem, values, setValues } = props;
  const classes = useStyles();

  let orderedFoodItems = values.orderDetails;
  const updateQuantity = (idx, value) => {
    let x = { ...values };
    if (x.orderDetails[idx].quantity + value > 0) {
      x.orderDetails[idx].quantity += value;
      setValues({ ...x });
    }
  }
  return (
    <List>
      {orderedFoodItems.length == 0 ? 
        <ListItem>
          <ListItemText
          primary = "Please select food items"
          primaryTypographyProps={{
            style : {
              textAlign: 'center',
              fontSize: 'italy'
            }
          }}/>
        </ListItem> :
        orderedFoodItems.map((item, idx) => (
          <Paper key={idx} className={classes.paperRoot}>
            <ListItem>
              <ListItemText
                primary={item.foodItemName}
                primaryTypographyProps={{
                  component: 'h1',
                  style: {
                    fontWeight: '500',
                    fontSize: '1.2rem'
                  }
                }}
                secondary={
                  <>
                    <ButtonGroup size='small' component={'span'} className={classes.buttonGroup}>
                      <Button onClick={e => updateQuantity(idx, -1)}>-</Button>
                      <Button disabled>{item.quantity}</Button>
                      <Button onClick={e => updateQuantity(idx, 1)}>+</Button>
                    </ButtonGroup>
                    <span className={classes.totalPerItem}>
                      {'$' + roundToDecimalPoint(item.quantity * item.foodItemPrice)}
                    </span>
                  </>
                }
                secondaryTypographyProps={
                  {
                    component: 'div'
                  }
                } />
              <ListItemSecondaryAction>
                <IconButton className={classes.deleteButton}
                  disableRipple
                  onClick={e => { removeFoodItem(idx, item.orderDetailId) }}>
                  <DeleteTwoToneIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))
      }
    </List>
  )
}

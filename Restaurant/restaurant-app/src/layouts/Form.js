import { makeStyles } from '@material-ui/core'
import React from 'react'

const userStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root':{
            width: '90%',
            margin: theme.spacing(1)
        }
    }
}));

export default function Form(props) {
    const classes = userStyle();
    const {children, ...other} = props;

    return (
        <form className= {classes.root} noValidate autoComplete='off' {...other}>
            {children}
        </form>
    )
}

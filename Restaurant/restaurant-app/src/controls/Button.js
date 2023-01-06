import { makeStyles, Button as MuiButton } from '@material-ui/core'
import React from 'react'

const userStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        }
    }
}));

export default function Button(props) {
    const { children, color, variant, onClick, className, ...other } = props;
    const classes = userStyles();
    return (
        <MuiButton
            className={classes.root + ' ' + (className || '')}
            variant={variant || 'contained'}
            color={color || 'default'}
            onClick={onClick}
            {...other}>
            {children}
        </MuiButton>
    )
}

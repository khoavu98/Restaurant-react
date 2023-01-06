import { IconButton, InputBase, List, ListItem, ListItemText, Paper, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const userStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))
export default function SearchFoodItems(props) {
    const classes = userStyles();
    const [foodItems, setFoodItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const {addFoodItem, orderedFoodItems} = props;

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
            .then((res) => {
                setFoodItems(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => y.foodItemName.toLowerCase().includes(searchKey.toLowerCase())
        && orderedFoodItems.every(item => item.foodItemId !== y.foodItemId));
        setSearchList(x);
    }, [searchKey, orderedFoodItems])

    return (
        <>
            <Paper className={classes.searchPaper}>
                <InputBase className={classes.searchInput}
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                    placeholder='Search food items' />
                <IconButton>
                    <SearchTwoToneIcon />
                </IconButton>
            </Paper>
            <List className={classes.listRoot}>
                {
                    searchList.map((item, idx) => (
                        <ListItem key={idx}>
                            <ListItemText primary={item.foodItemName}
                                secondary={'$' + item.price} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={e => addFoodItem(item)}>
                                    <PlusOneIcon />
                                    <ArrowForwardIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </>
    );
}

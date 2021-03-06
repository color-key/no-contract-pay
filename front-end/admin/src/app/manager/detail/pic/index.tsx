import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from './select';
import Table from './table';

const useStyles = makeStyles(() => ({
  root: {

  }
}))

const detailPic = ({item} : any) => {
  const classes = useStyles();
  console.log('item', item);
  return (
    <div className={classes.root}>
      <Select item={item}/>
      <Table item={item}/>
    </div>
  )
}

export default detailPic;
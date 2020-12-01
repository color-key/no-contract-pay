import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {addPayee} from '@/lib/api';

const useStyles = makeStyles(() => ({
  
}))

const Add = () => {
  const classes = useStyles();

  const handleAddPayee = () => {
    addPayee('收款账户名', '0', '备注').then(res => {
      console.log(res);
    })
  }

  React.useEffect(() => {
  }, []);

  return (
    <Box>
      
    </Box>
  )
}

export default Add;
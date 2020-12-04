import React from 'react';
import Box from '@material-ui/core/Box';
// import { makeStyles, Theme } from '@material-ui/core/styles';
import {payment} from '@/lib/api';

// const useStyles = makeStyles(() => ({
  
// }))

const Recharge = () => {
  // const classes = useStyles();

  const handlePayment = () => {
    payment('0', '1000').then(res => {
      console.log(res);
    })
  }

  React.useEffect(() => {
    handlePayment();
  }, []);

  return (
    <Box>
      
    </Box>
  )
}

export default Recharge;
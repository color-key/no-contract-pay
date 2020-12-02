import React from 'react';
import Box from '@material-ui/core/Box';
// import { makeStyles, Theme } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
import ManagerOrder from '../manager/detail/order';
import {getUser} from '@fay-react/lib/user';

// const useStyles = makeStyles((theme: Theme) => ({
//   title: {
//     width: '100%',
//     color: '#212121',
//     fontWeight: 500,
//     fontSize: '1.5rem',
//     padding: theme.spacing(2, 1),
//     backgroundColor: '#FFFFFF',
//     boxShadow: '0 5px 12px rgba(0,0,0,.3)',
//     borderRadius: 4
//   },
//   divi: {
//     width: '100%',
//     height: 1,
//     margin: theme.spacing(3, 0)
//   },
//   btn: {
//     background: theme.palette.primary.main,
//     color: '#FFFFFF',
//     minWidth: 100,
//     height: 56,
//     padding: '1px 8px',
//   },
// }))

const Order = () => {
  // const classes = useStyles();
  const [merchid, setMerchid] = React.useState<any>(null);

  React.useEffect(() => {
    setMerchid(getUser().merchid);
    return () => {
      setMerchid(null);
    }
  }, [])

  return (
    <Box>
      {merchid && <ManagerOrder item={{merchid}} operation/>}
    </Box>
  )
}

export default Order;
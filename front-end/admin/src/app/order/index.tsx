import React from 'react';
import Box from '@material-ui/core/Box';
import ManagerOrder from '../manager/detail/order';
import {getUser} from '@fay-react/lib/user';

const Order = () => {
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
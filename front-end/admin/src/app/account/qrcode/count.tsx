import React from 'react';
import {queryQrcodeCount, delQrcode} from '@/lib/api';
import Button from '@material-ui/core/Button';

const QrcodeCount = ({item}: any) => {

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    queryQrcodeCount(item.acaccname, item.acamount, item.acpaytype).then(res => {
      setCount(res.data);
    })
  }, [JSON.stringify(item)])

  const handleDel = () => {
    delQrcode(item.acaccname, item.acamount, item.acpaytype).then(_res => {
      setCount(0);
    })
  }

  return (
    <div>
      {count}
      {count>0 && <Button color={"primary"} onClick={handleDel}>清空</Button>}
    </div>
  )
}

export default QrcodeCount;
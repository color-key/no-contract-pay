import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {

  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 500
  },
  tf: {
    paddingTop: '7px',
  },
  tfDes: {
    fontSize: '0.75rem',
    color: '#757575',
    display: 'flex',
    alignItems: 'center'
  }
}))

const ChangeDialog = ({ item, open, onClose }: any) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>({});

  React.useEffect(() => {
    console.log('item', item);
    setData(item);
  }, [JSON.stringify(item)]);

  const handleSubmit = () => {
    setLoading(true);
  }

  const handleClose = () => {
    onClose();
    setLoading(false);
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='修改订单'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'保存'}
      loading={loading}
    >
      <Box>
        <Box display='flex' alignItems={'center'}>
          <Typography>订单号:{data.orderid}</Typography>
        </Box>
        <Box display='flex' mt={2} alignItems={'center'}>
          <Typography>金额:{data.money}</Typography>
        </Box>
        <Box display='flex' mt={2} alignItems={'center'}>
          <Typography>您确定{data.type ? '未收款' : '已收款'}?</Typography>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ChangeDialog;
import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TF from '@/components/text-field';
import {changeWayRate, addWayRate} from '@/lib/api';

const useStyles = makeStyles(() => ({
  root: {

  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 500
  },
  tf: {
    paddingTop: '7px'
  },
  tfDes: {
    fontSize: '0.75rem',
    color: '#757575',
    display: 'flex',
    alignItems: 'center'
  }
}))

const ChangeDialog = ({ open, onClose, item, onRefresh }: any) => {
  const classes = useStyles();

  const [rate, setRate] = React.useState(item ? item.aislerate ? item.aislerate.rate : 0 : 0);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    onClose();
    setLoading(false);
    setRate('');
  }

  const handleSubmit = () => {
    setLoading(true);
    if(item && item.aislerate){
      changeWayRate(item.aitype, rate).then(_res => {
        onClose();
        onRefresh();
        setLoading(false);
      })
    }else{
      addWayRate(item.aitype, rate).then(_res => {
        onClose();
        onRefresh();
        setLoading(false);
      })
    }
  }

  const disabled = Boolean(item && item.aislerate && item.aislerate.rate === rate);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='费率'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'保存'}
      loading={loading}
      submitDisabled={disabled}
    >
      <Box>
        <Box display='flex' alignItems={'center'}>
          <Box width={100} textAlign={'right'}>
            <Typography>渠道类型：</Typography>
          </Box>
          <Box ml={1}>
            <Typography>{item && item.aitype}</Typography>
          </Box>
        </Box>
        <Box display='flex' mt={1} mb={1} alignItems={'center'}>
          <Box width={100} textAlign={'right'}>
            <Typography>渠道名称：</Typography>
          </Box>
          <Box ml={1}>
            <Typography>{item && item.asname}</Typography>
          </Box>
        </Box>
        <Box display='flex'>
          <Box width={100} textAlign={'right'}>
            <Typography>费率：</Typography>
          </Box>
          <Box display='flex' ml={1}>
            <TF
              value={rate}
              inputProps={{ className: classes.tf }}
              onChange={(e: any) => setRate(e.target.value)}
              helperText={'格式为：6-->0.006(千分率)'}
            />
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ChangeDialog;
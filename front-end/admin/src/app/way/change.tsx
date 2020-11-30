import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TF from '@/components/text-field';

const useStyles = makeStyles((theme: Theme) => ({
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

const ChangeDialog = ({ open, onClose, item }: any) => {
  const classes = useStyles();
  const handleClose = () => { }
  const handleSubmit = () => { }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      title='费率'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'保存'}
    >
      <Box>
        <Box display='flex'>
          <Typography>渠道类型:&nbsp;</Typography>
          <Typography>0</Typography>
        </Box>
        <Box display='flex' mt={1} mb={1}>
          <Typography>渠道名称:&nbsp;</Typography>
          <Typography>支付宝</Typography>
        </Box>
        <Box display='flex'>
          <Typography>费率:&nbsp;</Typography>
          <Box display='flex'>
            <TF
              inputProps={{ className: classes.tf }}
            />
            <Typography className={classes.tfDes}>{'格式为：6-->0.006(千分率)'}</Typography>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ChangeDialog;
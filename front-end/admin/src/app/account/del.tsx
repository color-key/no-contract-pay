import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  title: {
    fontSize: '1rem',
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

const DelDialog = ({ open, onClose, item }: any) => {
  const classes = useStyles();
  const handleClose = () => { }
  const handleSubmit = () => { }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'保存'}
    >
      <Typography className={classes.title}>确定删除此通道吗?</Typography>
    </Dialog>
  )
}

export default DelDialog;
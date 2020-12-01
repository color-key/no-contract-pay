import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {delWay} from '@/lib/api';

const useStyles = makeStyles((_theme: Theme) => ({
  root: {

  },
  title: {
    fontSize: '1rem',
    fontWeight: 500,
    marginTop: 12,
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

const DelDialog = ({ open, onClose, item, onRefresh }: any) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    onClose();
  }

  const handleSubmit = () => {
    setLoading(true);
    delWay(item.aitype).then(_res => {
      onClose();
      onRefresh();
      setLoading(false);
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'确定'}
      loading={loading}
    >
      <Typography className={classes.title}>确定删除此通道吗?</Typography>
    </Dialog>
  )
}

export default DelDialog;
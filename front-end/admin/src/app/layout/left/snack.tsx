import React from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import NotifyIcon from '@/components/icons/notify';
import CloseIcon from '@/components/icons/close';
import Typography from '@material-ui/core/Typography';
import {useRouter} from 'next/router';
import { PATH_PREFIX } from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  tipContent: {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    backgroundColor: '#0CC73B',
    padding: theme.spacing(2.4, 2),
    borderRadius: 4
  },
  tip: {
    color: '#FFFFFF',
    fontSize: '0.75rem',
    textAlign: 'center',
    marginTop: '1px'
  },
  icon: {
    width: 15,
    height: 15,
    margin: theme.spacing(0, 0.5)
  },
  icon2: {
    width: 16,
    height: 16,
    marginLeft: theme.spacing(3)
  }
}));

export default React.memo(({ open = false, close, title = '您有新订单了' }: any) => {
  const classes = useStyles();
  const router = useRouter();
  const handleClick = () => router.push(PATH_PREFIX+'/order');
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={(props: TransitionProps) => <Slide {...props} direction="left" />}
      open={open}
      onClose={close}
      autoHideDuration={3 * 1000}
    >
      <div className={classes.tipContent} onClick={handleClick}>
        <NotifyIcon className={classes.icon} />
        <Typography className={classes.tip}>{title}</Typography>
        <CloseIcon className={classes.icon2} onClick={close}/>
      </div>
    </Snackbar>
  )
})
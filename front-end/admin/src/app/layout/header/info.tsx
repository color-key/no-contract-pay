import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {PATH_PREFIX, BASE_URL} from '@/env';
import {useRouter} from 'next/router';
import Divider from '@material-ui/core/Divider';
import { getUser, removeUser } from '@fay-react/lib/user';
import Change from './change';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      width: 270,
      boxShadow: '0 24px 38px 3px rgba(33,33,33,0.10), 0 9px 46px 8px rgba(33,33,33,0.08), 0 11px 15px -7px rgba(33,33,33,0.16)',
      borderRadius: 8
    },
    peopleImg: {
      width: 80
    },
    filecoinImg: {
      width: 28
    },
    address: {
      wordBreak: 'break-all'
    },
    bold: {
      fontSize: '0.875rem',
      color: '#757575'
    },
    balance: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      fontWeight: 500,
      marginBottom: theme.spacing(0.5)
    },
    secret: {
      wordBreak: 'break-all',
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    copy: {
      color: '#0075FF',
      fontSize: '0.875rem'
    }
  })
);


export default () => {
  const classes = useStyles();
  const router = useRouter();
  const userFromCookie = getUser();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<any | null>({});

  React.useEffect(() => {
    setUser(userFromCookie);
  }, [JSON.stringify(userFromCookie)]);

  const handleLogout = () => {
    removeUser();
    router.push(PATH_PREFIX+'/login');
  }
  const handleChangePW = () => setOpen(true);

  console.log('user', user)
  return (
    <Paper className={classes.root}>
      <Box mt={2} className={classes.balance}>商户号：{user.merchid}</Box>
      <Typography className={classes.secret}>秘钥：{user.secret}</Typography>
      <Divider />
      <Box mt={2}>
        <Typography className={classes.bold}>姓名: {user.username}</Typography>
        <Typography className={classes.bold}>电话: {user.phone}</Typography>
        <Typography className={classes.bold}>邮箱: {user.email}</Typography>
        <Typography className={classes.bold}>QQ: {user.qqnm}</Typography>
      </Box>
      <Box mt={2}>
      </Box>
      <Divider style={{marginTop: '8px'}}/>
      <Box mt={0.5}>
        <Button fullWidth onClick={handleChangePW} color={'secondary'}>修改密码</Button>
        <Button fullWidth onClick={handleLogout} color={'secondary'}>退出</Button>
      </Box>
      <Change open={open}/>
    </Paper>
  );
}

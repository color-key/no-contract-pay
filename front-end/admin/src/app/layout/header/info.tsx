import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {PATH_PREFIX} from '@/env';
import {useRouter} from 'next/router';
import { getUser, removeUser } from '@fay-react/lib/user';
import Change from './change';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      width: 400,
      boxShadow: '0 24px 38px 3px rgba(33,33,33,0.10), 0 9px 46px 8px rgba(33,33,33,0.08), 0 11px 15px -7px rgba(33,33,33,0.16)',
      borderRadius: 8
    },
    bold: {
      fontWeight: 'bold'
    },
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
      <Box mt={2} display={'flex'} alignItems={'center'}>
        <Box width={100} textAlign={'right'} mr={2}>
          <Typography className={classes.bold}>商户号：</Typography>
        </Box>
        <Box>
          <Typography>{user.merchid}</Typography>
        </Box>
      </Box>
      <Box mt={2} display={'flex'} alignItems={'center'}>
        <Box width={100} textAlign={'right'} mr={2}>
          <Typography className={classes.bold}>姓名：</Typography>
        </Box>
        <Box>
          <Typography>{user.username}</Typography>
        </Box>
      </Box>
      <Box mt={2} display={'flex'} alignItems={'center'}>
        <Box width={100} textAlign={'right'} mr={2}>
          <Typography className={classes.bold}>电话：</Typography>
        </Box>
        <Box>
          <Typography>{user.phone}</Typography>
        </Box>
      </Box>
      <Box mt={2} display={'flex'} alignItems={'center'}>
        <Box width={100} textAlign={'right'} mr={2}>
          <Typography className={classes.bold}>邮箱：</Typography>
        </Box>
        <Box>
          <Typography>{user.email}</Typography>
        </Box>
      </Box>
      <Box mt={2}>
        <Button fullWidth onClick={handleChangePW} color={'secondary'}>修改密码</Button>
        <Button fullWidth onClick={handleLogout} color={'secondary'}>退出</Button>
      </Box>
      <Change open={open} onClose={() => setOpen(false)}/>
    </Paper>
  );
}

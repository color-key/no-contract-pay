import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Info from './info';
import { getUser } from '@fay-react/lib/user';
import { ManagerType } from '@/app/manager';
import Breadcrumbs from './breadcrumbs';
import DropdownButton from './dropdown-button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@/components/icons/head';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // color: theme.palette.common.white,
    // background: theme.palette.primary.dark,
    // boxShadow: '0px 1px 0px 0px rgba(255,255,255,0.24)',
    // padding: '0 32px'
  },
  topLeft: {
    display: 'flex',
    alignItems: 'center',
    height: "100%",
  },
  topRight: {
    // width: 128
  },
  homeIcon: {
    width: 192,
    height: 40
  },
  homeText: {
    marginLeft: '20px',
    fontSize: 30,
    fontWeight: 'bold'
  },
  login: {
    color: theme.palette.common.white
  },
  register: {

  },
  rightBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  avatar: {
    backgroundColor: theme.palette.common.white,
    width: 25,
    height: 25
  },
  user: {
    color: theme.palette.primary.main,
    margin: theme.spacing(0, 1)
  },
  more: {
    // color: '#FFFFFF',
  },
}));

export default () => {
  const classes = useStyles();
  const router = useRouter();
  const userFromCookie = getUser();
  const [user, setUser] = React.useState<ManagerType | null>(null);

  React.useEffect(() => {
    setUser(userFromCookie);
  }, [JSON.stringify(userFromCookie)]);

  return (
    <div className={classes.root}>
      <div className={classes.topLeft}>
        <Breadcrumbs />
      </div>
      <div className={classes.topRight}>
        {
          user ?
            <DropdownButton
              dropdownComponent={<Info />}>
              <Box className={classes.rightBtn}>
                <Avatar className={classes.avatar}>
                  <PersonIcon color={'disabled'} />
                </Avatar>
                <Typography className={classes.user}>{user.username}</Typography>
                <ExpandMoreIcon className={classes.more} />
              </Box>
            </DropdownButton>
            :
            <>
              <Button variant="outlined" className={classes.login} onClick={() => router.push(PATH_PREFIX+'/login')}>
                登录
              </Button>
            </>
        }
      </div>
    </div>
  );
};



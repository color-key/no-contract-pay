/**
 * Create by fay on 4/22/20 8:33 上午
 */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import clsx from 'clsx';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PATH_PREFIX } from '@/env';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PieChartIcon from '@material-ui/icons/PieChart';
import PaymentIcon from '@material-ui/icons/Payment';
import BookIcon from '@material-ui/icons/Book';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { getUser } from '@fay-react/lib/user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      width: '100%',
      height: '100%',
    },
    title: {
      position: 'absolute',
      zIndex: 4,
      padding: '15px',
      margin: '15px',
      display: 'flex',
      alignItems: 'center',
      width: 'calc(100% - 30px)',
      borderBottom: '1px solid #666',
    },
    titleTypography: {
      marginLeft: theme.spacing(2),
      cursor: 'pointer'
    },
    list: {
      position: 'absolute',
      top: 100,
      zIndex: 4,
      width: '100%',
    },
    icon: {
      color: theme.palette.common.white,
      minWidth: '40px',
    },
    listItemWrapper: {
      cursor: 'pointer'
    },
    listItem: {
      margin: '10px 15px 0',
      width: 'auto',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    listItemActive: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      }
    },
    text: {
      paddingTop: '2px'
    },
    bg: {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      position: 'absolute',
      // backgroundImage: `url("${PATH_PREFIX}/static/bg/sidebar-2.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      '&:after': {
        width: '100%',
        height: '100%',
        content: '""',
        opacity: '.8',
        zIndex: 3,
        position: 'absolute',
        background: theme.palette.common.black,
      }
    }
  }),
);

const manager = [{
  icon: SupervisorAccountIcon,
  text: '全部商户',
  path: '/manager'
},{
  icon: PaymentIcon,
  text: '通道',
  path: '/way'
}];

const others = [{
  icon: AccountBalanceWalletIcon,
  text: '收款账户',
  path: '/account'
},{
  icon: ReceiptIcon,
  text: '订单管理',
  path: '/order'
},{
  icon: PieChartIcon,
  text: '收入统计',
  path: '/statistics'
},
{
  icon: BookIcon,
  text: '发起付款接口',
  path: '/payapi'
},
{
  icon: BookIcon,
  text: '查询接口',
  path: '/searchapi'
}];

const initNav: any = [];

export default () => {
  const classes = useStyles();
  const Router = useRouter();
  const [nav, setNav] = React.useState(initNav);

  React.useEffect(() => {
    const user = getUser();
    if(user){
      const easzadmin = user.easzadmin;
      if(easzadmin === 0){
        setNav(manager);
      }else if(easzadmin === 1){
        setNav(others);
      }
    }else{
      Router.push(PATH_PREFIX+'/login');
    }
  })

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant={"h6"} className={classes.titleTypography} onClick={() => Router.push(PATH_PREFIX)}>支付后台管理</Typography>
      </div>
      <List component="nav" className={classes.list} aria-label="contacts">
        {
          nav.map((item: any, index:number) => {
            const active = Router.pathname === PATH_PREFIX+item.path;
            return (
              <Link key={index} href={PATH_PREFIX + item.path}>
                <div className={classes.listItemWrapper}>
                  <ListItem button className={clsx(classes.listItem, { [classes.listItemActive]: active })}>
                    <ListItemIcon className={classes.icon}>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.text} className={classes.text} />
                  </ListItem>
                </div>
              </Link>

            )
          })
        }
      </List>
      <div className={classes.bg} style={{ backgroundImage: `url("${PATH_PREFIX}/static/bg/sidebar-2.jpg")` }}></div>
    </div>
  )
}
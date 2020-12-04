import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Theme } from '@/components/theme';
import Router from 'next/router';
import { PATH_PREFIX } from '@/env';
import { getUser } from '@fay-react/lib/user';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'none'
  }
}));

const manager = [
  {
    name: '全部商户',
    path: '/manager',
  },
  {
    name: '通道',
    path: '/way'
  }
];

const others = [
  {
    name: '收款账户',
    path: '/account',
  },
  {
    name: '订单管理',
    path: '/order',
  },
  {
    name: '收入统计',
    path: '/statistics',
  },
];
const initNav: any = [];

const Home = () => {
  const classes = useStyles();
  const [nav, setNav] = React.useState(initNav);

  React.useEffect(() => {
    const easzadmin = getUser().easzadmin;
    if(easzadmin === 0){
      setNav(manager);
    }else if(easzadmin === 1){
      setNav(others);
    }
  }, [])

  return (
    <div>
      {
        nav.map((item: { path: string, name: string }, idx: number) =>
          <Button variant='outlined'
            color='primary'
            className={classes.button}
            key={idx}
            onClick={() => Router.push(PATH_PREFIX + item.path)}
          >
            {item.name}
          </Button>
        )
      }
    </div>
  )
}

export default Home;
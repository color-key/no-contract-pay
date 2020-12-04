import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Theme } from '@/components/theme';
import { PATH_PREFIX } from '@/env';
import { getUser } from '@fay-react/lib/user';
import {useRouter} from 'next/router';

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
  },{
    name: '发起付款接口',
    path: '/payapi'
  },
  {
    name: '查询接口',
    path: '/searchapi'
  }
];
const initNav: any = [];

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
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
      router.push(PATH_PREFIX+'/login');
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
            onClick={() => router.push(PATH_PREFIX + item.path)}
          >
            {item.name}
          </Button>
        )
      }
    </div>
  )
}

export default Home;
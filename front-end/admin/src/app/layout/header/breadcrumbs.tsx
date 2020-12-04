import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';

const breadcrumbs = () => {
  const router = useRouter();
  let [, , main, sub, detail] = router.asPath.split('/');
  if(detail && detail.substring(0, 1) === '?') detail = '';
  console.log('router', router.asPath.split('/'));
  const mainString = (sub: string) => {
    if(sub === 'manager') return '全部商户';
    else if(sub === 'way') return '通道';
    else if(sub === 'account') return '收款账户';
    else if(sub === 'order') return '订单管理';
    else if(sub === 'statistics') return '收入统计';
    else if(sub === 'payapi') return '发起付款接口';
    else if(sub === 'searchapi') return '查询接口';
    else return '';
  }
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/admin" >首页</Link>
      { main && <Link color="inherit" href={`/admin/${main}`} >{mainString(main)}</Link>}
      {sub &&
        <Link color="inherit" href={`/admin/${main}/${sub}`}>
          {sub}
        </Link>
      }
      {detail && <Typography color="textPrimary">{detail}</Typography>}
    </Breadcrumbs>
  );
}
export default breadcrumbs;
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
  const handleClick = () => { };
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/admin" onClick={handleClick}>首页</Link>
      { main && <Link color="inherit" href={`/admin/${main}`} onClick={handleClick}>{main}</Link>}
      {sub &&
        <Link color="inherit" href={`/admin/${main}/${sub}`}  onClick={handleClick}>
          {sub}
        </Link>
      }
      {detail && <Typography color="textPrimary">{detail}</Typography>}
    </Breadcrumbs>
  );
}
export default breadcrumbs;
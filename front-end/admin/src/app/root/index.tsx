import React from 'react';
import Layout from '../layout';
import {useRouter} from 'next/router';
import {PATH_PREFIX} from '@/env';

export default ({children}: any) => {

  const router = useRouter();

  const root: any = {
    'manager': <Layout>{children}</Layout>,
    'manager/detail': <Layout>{children}</Layout>,
    'merchants': <Layout>{children}</Layout>,
    'merchants/detail': <Layout>{children}</Layout>,
    'banner': <Layout>{children}</Layout>,
    '': <Layout>{children}</Layout>,
    'login': children,
    'coming-soon': children,
    'order': <Layout>{children}</Layout>,
    'way': <Layout>{children}</Layout>,
    'account': <Layout>{children}</Layout>,
    'account/qrcodeManage': <Layout>{children}</Layout>,
    'statistics': <Layout>{children}</Layout>,
    'payapi': <Layout>{children}</Layout>,
    'searchapi': <Layout>{children}</Layout>,
  }

  const path = router.pathname.substr((PATH_PREFIX+'/').length, router.pathname.length-(PATH_PREFIX+'/').length);
  return root[path] || root['coming-soon'];
}
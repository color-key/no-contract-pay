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
    'blog': <Layout>{children}</Layout>,
    'demand': <Layout>{children}</Layout>,
    'deploy': <Layout>{children}</Layout>,
    'tdk': <Layout>{children}</Layout>,
    'banner': <Layout>{children}</Layout>,
    '': <Layout>{children}</Layout>,
    'login': children,
    'coming-soon': children,
    'images': <Layout>{children}</Layout>,
    'way': <Layout>{children}</Layout>,
    'account': <Layout>{children}</Layout>,
  }

  const path = router.pathname.substr((PATH_PREFIX+'/').length, router.pathname.length-(PATH_PREFIX+'/').length);
  console.log(path);
  return root[path] || root['coming-soon'];
}
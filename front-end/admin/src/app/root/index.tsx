import React from 'react';
import Layout from '../layout';
import {useRouter} from 'next/router';
import {PATH_PREFIX} from '@/env';

export default ({children}: any) => {

  const router = useRouter();

  const root: any = {
    'blog': <Layout>{children}</Layout>,
    'demand': <Layout>{children}</Layout>,
    'deploy': <Layout>{children}</Layout>,
    'tdk': <Layout>{children}</Layout>,
    'banner': <Layout>{children}</Layout>,
    '': <Layout>{children}</Layout>,
    'login': children,
    'coming-soon': children,
  }

  const path = router.pathname.substr((PATH_PREFIX+'/').length, router.pathname.length-(PATH_PREFIX+'/').length);
  console.log(path);
  return root[path] || root['coming-soon'];
}
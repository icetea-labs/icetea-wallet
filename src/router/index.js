import React from 'react';
import Loadable from 'react-loadable';

function Loading({ error }) {
  if (error) {
    return 'Oh nooess!';
  } else {
    return <h3>Loading...</h3>;
  }
}

const index = [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('../components/pages/Home'),
      loading: Loading,
      delay: 500,
      timeout: 5e4,
    }),
  },
  {
    path: '/home',
    exact: true,
    component: Loadable({
      loader: () => import('../components/pages/Home'),
      loading: Loading,
      delay: 500,
      timeout: 5e4,
    }),
  },
  {
    path: '/create',
    exact: true,
    component: Loadable({
      loader: () => import('../components/pages/NewWallet'),
      loading: Loading,
      delay: 500,
      timeout: 5e4,
    }),
  },
  {
    path: '/unlock',
    exact: true,
    component: Loadable({
      loader: () => import('../components/pages/Unlock'),
      loading: Loading,
      delay: 500,
      timeout: 5e4,
    }),
  },
  {
    path: '/sentTransaction',
    exact: true,
    component: Loadable({
      loader: () => import('../components/pages/Transaction'),
      loading: Loading,
      delay: 500,
      timeout: 5e4,
    }),
  },
  {
    path: '/transactionHistory',
    exact: true,
    component: Loadable({
      loader: () => import('../components/pages/Transaction'),
      loading: Loading,
      delay: 500,
      timeout: 5e4,
    }),
  },
  {
    path: '/botStore',
    exact: true,
    component: Loadable({
      loader: () => import('../components/pages/Dapp'),
      loading: Loading,
      delay: 500,
      timeout: 5e4,
    }),
  },
  {
    path: '/profile',
    exact: true,
    component: Loadable({
      loader: () => import('../components/pages/Profile/Profile'),
      loading: Loading,
      delay: 500,
      timeout: 5e4,
    }),
  },
  {
    path: '',
    exact: false,
    component: Loadable({
      loader: () => import('../components/pages/NotFound'),
      loading: Loading,
      delay: 500,
      timeout: 5e4,
    }),
  },
];

export default index;

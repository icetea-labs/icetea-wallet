import React from 'react';
import {
  Home,
  NewWalletMaster,
  UnlockWallet,
  Balances,
  Transaction,
  TransactionHistory,
  BotStore,
  NotFound
} from '../components/pages';
import Layout from '../components/layout';

const index = [
  {
    path: '/',
    exact: true,
    main: () => <Home />
  },
  {
    path: '/create',
    exact: true,
    main: () => <NewWalletMaster />
  },
  {
    path: '/unlock',
    exact: true,
    main: () => <UnlockWallet />
  },
  {
    path: '/Home',
    exact: true,
    main: () => (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path: '/sentTransaction',
    exact: true,
    main: () => (
      <Layout>
        <Transaction />
      </Layout>
    )
  },
  {
    path: '/transactionHistory',
    exact: true,
    main: () => (
      <Layout>
        <TransactionHistory />
      </Layout>
    )
  },
  {
    path: '/botStore',
    exact: true,
    main: () => (
      <Layout>
        <BotStore />
      </Layout>
    )
  },
  {
    path: '/balances',
    exact: true,
    main: () => (
      <Layout>
        <Balances />
      </Layout>
    )
  },
  {
    path: '',
    exact: false,
    main: () => <NotFound />
  }
];

export default index;

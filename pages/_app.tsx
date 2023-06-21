import { useState, type ReactNode } from 'react';
// //css
import '@/styles/globals.css'
import '@/styles/style.scss'
import '@rainbow-me/rainbowkit/styles.css'
// //组件
import Layout from '@/component/Layout'


interface appProps {
  Component: React.ElementType,
  pageProps: Object | String
}

export default function App({ Component, pageProps }: appProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}




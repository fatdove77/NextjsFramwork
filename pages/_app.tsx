import '@/styles/globals.css'
import '@/styles/style.scss'
import type { AppProps } from 'next/app'
import '../styles/style.scss'
import { useState } from 'react';
import Layout from '@/component/Layout'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      
    </>
  )
}
 
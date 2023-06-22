import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from 'next/head'
import useWeb3Hook from '@/store/Web3Provider'

// Pay attention to the sorting,
const models = {
  useWeb3Hook,
};


function compose(containers: any) {
  return function Component(props: any) {
    return containers.reduceRight(
      (children: any, Container: any) => (
        <Container.Provider>{children}</Container.Provider>
      ),
      props.children,
    );
  };
}

const ComposedStore = compose(Object.values(models));


function Layout({ children }: any) {

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className="relative h-screen">
        <Header />
        <div id="content" className="w-full relative top-0 left-0">
          <ComposedStore>
            {children}
          </ComposedStore>
          <Footer />
        </div>
      </div>

    </>
  )
}

export default Layout;
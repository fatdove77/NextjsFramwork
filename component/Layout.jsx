import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from 'next/head'

function Layout({ children }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div  className="relative h-screen">
        <Header id="header" />
        <div id="content" className="w-full relative top-0 left-0">
          {children}
          <Footer id="footer" />
        </div>
      </div>
    </>
  )
}

export default Layout;
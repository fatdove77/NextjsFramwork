import React from 'react'
import Link from "next/link";
const Home: React.FC = () => {
  return (
    <div>
      home
      <Link href={`/Blog`}>路由跳转</Link>
    </div>
  )
}

export default Home
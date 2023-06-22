import React from 'react'
import { useRouter } from 'next/router'
import Blog from './index';
export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Blog>
        <div>
          {/* product */}
          Blog子路由{id}
        </div>
      </Blog>
    </>

  )
}

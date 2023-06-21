import React from 'react'
import {useRouter} from 'next/router'
import BlogLayout from './BlogLayout';
export default function  Post(){
  const router = useRouter();
    const {id} = router.query;
  return (
    <>
      <BlogLayout>
        <div>
          {/* product */}
          {id}
        </div>
      </BlogLayout>
    </>
    
  )
}

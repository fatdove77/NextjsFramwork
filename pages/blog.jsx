import React from 'react'
import {useRouter} from 'next/router'
function blog() {
  const router = useRouter();
  const {id} = router.query;
  return (
    <div>
      博客 
      {id}
    </div>
  )
}

  
export default blog
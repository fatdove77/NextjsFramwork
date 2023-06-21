import React from 'react'

const BlogLayout = ({ children }: any) => {
  return (
    <>
      {/* 不变的部分 */}
      <div>这一坨永远不会变</div>
      <div>
        {children}
      </div>
    </>

  )
}

export default BlogLayout
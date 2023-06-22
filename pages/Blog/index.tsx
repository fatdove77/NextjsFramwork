import Link from 'next/link';
import { useRouter } from 'next/router'
export default function Blog({children}:any) {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
      {/* 不变的部分 */}
      <div>这一坨永远不会变</div>
      <div>
        <ul>
          <li>
            <Link href="/Blog/1">
              跳转blog1
            </Link>
          </li>
          <li>
            <Link href="/Blog/22222">
              跳转blog2
            </Link>
          </li>
        </ul>
        {/* <BlogItem></BlogItem> */}
      </div>
      <div>
        {children}
      </div>
    </>

    )

}
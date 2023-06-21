import Link from 'next/link';
import { useRouter } from 'next/router'
import BlogLayout from './BlogLayout';

export default function Blog() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
            <BlogLayout>
                <div>
                    <ul>
                        <li>
                            <Link href="/Blog/1">
                                跳转blog1
                            </Link>
                        </li>
                        <li>
                            <Link href="/Blog/2">
                            跳转blog2
                            </Link>
                        </li>
                        {/* 添加更多产品链接 */}
                    </ul>
                </div>
            </BlogLayout>
        </>
    )

}
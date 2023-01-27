import Head from 'next/head'
import Post from '../components/Post'
import search from "../search.json";
import { useRouter } from 'next/router'
import BlogHeader from '../components/layout/BlogHeader';

export default function Search() {
    const { query } = useRouter()
    const TempPosts = []

    search.map(
        (post) => {
            if (post.draft === false) {
                if (post.title.toLowerCase().includes(query.q) || post.description.toLowerCase().includes(query.q) || post.tags.map(v => v.toLowerCase()).includes(query.q) || post.categories.map(v => v.toLowerCase()).includes(query.q)) {
                    TempPosts.push(post)
                } else {
                    TempPosts.push(null)
                }
            }
        }
    )

    //   remove null in posts 
    const posts = TempPosts.filter(
        path => {
            return path && path
        }
    )

    return (
        <>
            <Head>
                <title>Search</title>
            </Head>
            <div className="drop-shadow-md flex flex-col rounded-lg">
                <BlogHeader title={"Search Term: " + query.q} />
                {
                    posts.length > 0 ?
                        posts.map((post, index) => (
                            <Post key={index} post={post} />
                        )) : <div className='m-auto p-5 mx-5 '>
                            <h2 className='text-center'>
                                {query.q ? `No post find base on ${query.q} ` : 'loadding.. '}
                            </h2>
                        </div>
                }
            </div>
        </>
    )
}

import Post from '../../components/Post'
import Head from 'next/head'
import { allPosts } from "contentlayer/generated";
import { pick } from "@contentlayer/client";
import Pagnation from '../../components/layout/Pagnation';
import BlogHeader from '../../components/layout/BlogHeader';

export const show_per_page = 10

export function pageCount(number) {
    return Math.ceil(number / show_per_page);
}

export function sortByDate(a, b) {
    return new Date(b.date) - new Date(a.date)
}

export default function Home({ posts, totalPostCount }) {

    return (
        <>
            <Head>
                <title>Cameron Varley</title>
            </Head>
            <div id="top" className="flex flex-col max-w-6xl">
                <div className="drop-shadow-md flex flex-col rounded-lg">
                    <BlogHeader title={"Blog Posts"} />
                    {JSON.parse(posts).map(post => (
                        <Post key={post.slug} post={post} />
                    ))}
                </div>
            </div>
            <Pagnation totalPostCount={totalPostCount} />
        </>
    )
}

export async function getStaticPaths() {

    //  help of pick get require filter value
    // const posts = allPosts.map((post) => pick(post, ["title", "date", "slug", "description", "draft", "image", "tags", "categories"]));


    // count how many pages
    let totalPostCount = pageCount(allPosts.length)


    // totalPostCount number convert into a array
    let pageIntoArray = Array.from(Array(totalPostCount).keys())


    let paths = []

    pageIntoArray.map(
        path => paths.push({
            params: { page: `${path + 1}` }
        })
    )


    return {
        paths,
        fallback: false,
    }


}


// fetch all posts 
export async function getStaticProps({ params }) {

    //   help of pick get require filter value
    const posts = allPosts.map((post) => pick(post, ["title", "date", "slug", "description", "draft", "image", "tags", "categories", "id"]));



    // sort article base on  date
    let postSortByDate = posts.sort(sortByDate)


    // filter publish posts

    const publish = postSortByDate.filter(
        (post, i) => {
            return post.draft === false
        }
    )

    // count how many pages
    let totalPostCount = pageCount(allPosts.length)


    // main Logic for dynamic pagination get post base on show_per_page in you app.

    let totalPosts;


    if (Number(params.page) == 1) {
        totalPosts = publish.slice(show_per_page, show_per_page)
    }
    if (Number(params.page) == 2) {

        totalPosts = publish.slice(show_per_page, show_per_page * params.page)
    }

    if (Number(params.page) > 2) {

        totalPosts = publish.slice(show_per_page * params.page - show_per_page, show_per_page * params.page)
    }


    return {
        props: {
            posts: JSON.stringify(totalPosts),
            totalPostCount
        },
    }

}

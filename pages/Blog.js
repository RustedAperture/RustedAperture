import { allPosts } from "contentlayer/generated"
import { pick } from "@contentlayer/client";
import Post from '../components/Post'
import Pagnation from '../components/layout/Pagnation';
import BlogHeader from '../components/layout/BlogHeader';
import fs from 'fs';
import Head from 'next/head'

export const show_per_page = 10

export function pageCount(number) {
  return Math.ceil(number / show_per_page);
}

export function sortByDate(a, b) {
  return new Date(b.date) - new Date(a.date)
}

export async function getStaticProps() {
  const posts = allPosts.map((post) => pick(post, ["title", "date", "slug", "description", "draft", "tags", "categories"]));

  let postSortByDate = allPosts.sort(sortByDate)

  const publish = postSortByDate.filter(
    (post, i) => {
      return post.draft === false
    }
  )

  let totalPostCount = pageCount(allPosts.length)

  let totalPosts = publish.slice(0, show_per_page)

  const jsonString = JSON.stringify(posts)
  fs.writeFileSync('./search.json', jsonString, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })

  return {
    props: {
      posts: totalPosts,
      totalPostCount
    },
  }
}


const Blog = ({ posts, totalPostCount }) => {
  return (
    <>
      <Head>
        <title>Cameron Varley | Blog</title>
      </Head>
      <div id="top" className="flex flex-col max-w-6xl">
        <div className="drop-shadow-md flex flex-col rounded-lg">
          <BlogHeader title={"Blog Posts"} />
          {posts.map(post => {
            return <Post key={post.slug} post={post} />
          }
          )}
        </div>
        <Pagnation totalPostCount={totalPostCount} />
      </div>
    </>
  )
}

export default Blog

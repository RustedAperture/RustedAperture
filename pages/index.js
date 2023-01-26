import { allPosts } from "contentlayer/generated"
import { pick } from "@contentlayer/client";
import Image from "next/image"
import Link from 'next/link';
import Post from '../components/Post'
import Pagnation from '../components/Pagnation';

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
  return {
    props: {
      posts: totalPosts,
      totalPostCount
    },
  }
}


const Index = ({ posts, totalPostCount }) => {
  return (
    <div id="top" className="flex flex-col max-w-6xl">
      <div className="drop-shadow-md flex flex-col rounded-lg">
        {posts.map(post => {
          return <Post key={post.slug} post={post} />
        }
        )}
      </div>
      <Pagnation totalPostCount={totalPostCount} />
    </div>
  )
}

export default Index

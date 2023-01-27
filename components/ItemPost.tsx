import BlogCard from '../components/blogCard'

export default function ItemPost({ post: { post } }) {

    const date = new Date(post.date)

    return (
        <>
            <BlogCard post={post} />
        </>

    )
}
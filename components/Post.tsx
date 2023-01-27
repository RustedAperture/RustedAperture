import BlogCard from '../components/blogCard'

export default function Post({ post }) {

    const date = new Date(post.date)
    return (
        <>
            <BlogCard post={post} />
        </>
    )
}
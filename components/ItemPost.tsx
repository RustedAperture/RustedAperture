import Link from 'next/link'

export default function ItemPost({ post: { post } }) {

    // const imageUrl= process.env.SITE_URL + post.images[0]


    // console.log(imageUrl,' imageUrl ')

    return (
        <div className="card mb-4">
            <a href={`/tag/${post.slug}`} > </a>
            <div className="card-body">

                <h2 className="card-title">{post.title}</h2>
                <p className="card-text">{post.summary}</p>
                <Link href={`${post.slug}`}>
                    Read More
                </Link>
            </div>
        </div >
    )
}
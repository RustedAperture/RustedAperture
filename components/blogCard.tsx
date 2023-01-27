import Link from 'next/link'
import Image from 'next/image';

export function slugify(title) {
    return title.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

export default function BlogCard({ post }) {

    console.log({ post })

    const date = new Date(post.date)
    return (
        <div className="text-slate-500 bg-white m-2 rounded-lg flex flex-row items-stretch">
            {post.image && (
                <a href={`${post.slug}`} > <Image className="aspect-square max-h-[220px] object-cover" src={post.image} alt={post.title} /></a>
            )}
            <div className="p-6 prose max-w-none grow">
                <h2 className="text-slate-900 font-medium my-0">{post.title}</h2>
                <div className='flex flex-col'>
                    <div> {
                        post.tags.map(
                            tag => {

                                const slug = slugify(tag)

                                return (<Link legacyBehavior key={tag} href={`/tag/${slug}`}>
                                    <a className='text-slate-500 underline mr-2 inline'>
                                        <h6 className='inline'>#{tag}</h6>
                                    </a>
                                </Link>)
                            }
                        )
                    } </div>
                    <div className="text-slate-500 mr-2">{`${date.toLocaleString('default', { month: 'long' })} - ${date.getDate()} - ${date.getFullYear()}`}</div>
                </div>
                <p className="text-slate-500 line-clamp-2">{post.description}</p>
                <Link legacyBehavior href={`${post.slug}`}>
                    <a className=''>Read More</a>
                </Link>
            </div>
        </div>
    )
}
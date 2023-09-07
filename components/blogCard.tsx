import Link from 'next/link'
import Image from 'next/image';

export function slugify(title) {
    return title.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

export default function BlogCard({ post }) {

    const date = new Date(post.date)
    return (
        <div className="bg-white dark:bg-zinc-800 my-0.5 rounded mx-2 flex flex-row items-stretch last:rounded-b-lg">
            {post.image && (
                <a href={`${post.slug}`} > <Image className="aspect-square max-h-[220px] object-cover" src={post.image} alt={post.title} /></a>
            )}
            <div className="p-6 prose max-w-none grow">
                <h2 className="text-zinc-800 dark:text-zinc-50 font-medium my-0">{post.title}</h2>
                <div className='flex flex-col'>
                    <div> {
                        post.tags.map(
                            tag => {

                                const slug = slugify(tag)

                                return (<Link legacyBehavior key={tag} href={`/tag/${slug}`}>
                                    <a className='text-zinc-800 dark:text-zinc-50 underline mr-2 inline'>
                                        <h6 className='inline'>#{tag}</h6>
                                    </a>
                                </Link>)
                            }
                        )
                    } </div>
                    <div className="text-zinc-800 dark:text-zinc-50 mr-2">{`${date.toLocaleString('default', { month: 'long' })} - ${date.getDate()} - ${date.getFullYear()}`}</div>
                </div>
                <p className="text-zinc-800 dark:text-zinc-50 line-clamp-2">{post.description}</p>
                <Link legacyBehavior href={`${post.slug}`}>
                    <a className='text-zinc-800 dark:text-zinc-50'>Read More</a>
                </Link>
            </div>
        </div>
    )
}
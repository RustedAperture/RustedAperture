import { allPosts, Post } from "contentlayer/generated";
import {
    GetStaticPathsResult,
    GetStaticPropsContext,
    GetStaticPropsResult,
    InferGetStaticPropsType,
    NextPage,
} from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import Link from "next/link";
import BlogHeader from '../../components/layout/BlogHeader';
import { ThemeSwitcher } from "../../components/ThemeSwitcher";

export function slugify(title) {
    return title.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const paths = allPosts.map((post) => post.slug);
    return {
        paths,
        fallback: false,
    };
}

// Find post with matching slug and return it as props to the page
export async function getStaticProps({
    params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<{ post: Post }>> {
    const post = allPosts.find(
        (post) => post._raw.flattenedPath === params?.slug
    );

    // Redirect to homepage if post not found
    return typeof post === "undefined"
        ? {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
        : {
            props: {
                post,
            },
        };
}

const PostLayout: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
    post,
}) => {
    // Get MDX component for post
    const Component = useMDXComponent(post.body.code);
    const date = new Date(post.date)
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <article className="flex flex-col max-w-6xl basis-full">
                <div className="flex flex-col grow">
                    <div className="bg-white dark:bg-zinc-800 mx-2 mt-2 mb-0.5 rounded-t-lg rounded-b">
                        {/* Display parsed markdown content */}
                        <div className="p-6 prose dark:prose-invert max-w-none">
                            <div className="flex">
                                <h1 className="text-zinc-800 dark:text-zinc-50 grow">{post.title}</h1>
                                <ThemeSwitcher />
                            </div>
                            <Component />
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-800 mx-2 my-0.5 rounded-t rounded-b-lg flex flex-row overflow-hidden justify-between items-baseline items-stretch p-6">
                    <div className=""><strong>{`${date.toLocaleString('default', { month: 'long' })} - ${date.getDate()} - ${date.getFullYear()}`}</strong></div>
                    <div>
                        {
                            post.tags.map(
                                tag => {

                                    const slug = slugify(tag)

                                    return (<Link legacyBehavior key={tag} href={`/tag/${slug}`}>
                                        <a className='underline mr-2'>
                                            <h6 className='inline'>#{tag}</h6>
                                        </a>
                                    </Link>)
                                }
                            )
                        }
                    </div>
                </div>
                {post.toc ? (
                    <div className="max-lg:hidden p-6 bg-white m-2 rounded-lg sm:min-w-[24rem] sticky top-8 space-y-2">
                        <h3 className="text-sm text-neutral-400">On this page</h3>
                        <div className="text-sm flex flex-col space-y-2">
                            {post.headings.map(heading => {
                                return (
                                    <div key={`#${heading.slug}`}>
                                        <a
                                            className="hover:underline data-[level=three]:pl-4 data-[level=four]:pl-8"
                                            data-level={heading.level}
                                            href={`#${heading.slug}`}
                                        >
                                            {heading.text}
                                        </a>
                                    </div>
                                )
                            })}
                            <h3 className="text-sm text-neutral-400"><a
                                className="data-[level=three]:pl-4 data-[level=four]:pl-8"
                                href="#top"
                            >
                                Back to top
                            </a></h3>
                        </div>
                    </div >
                ) : undefined}
            </article >
        </>
    );
};

export default PostLayout;
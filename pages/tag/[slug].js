import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ItemPost from '../../components/ItemPost'
import { allPosts } from "contentlayer/generated"
import { pick } from "@contentlayer/client";
import BlogHeader from '../../components/layout/BlogHeader';
import Head from 'next/head'

export function slugify(title) {
    return title.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('data'))

    let tempStorage = []

    const temppaths = files.map((filename) => {

        let filepathname = path.join('data', filename)

        const markdownWithMeta = fs.readFileSync(filepathname,
            'utf-8'
        )

        const { data: frontmatter } = matter(markdownWithMeta)

        if (frontmatter.draft === false) {
            frontmatter.tags.map(
                tag => {
                    let slug = slugify(tag)
                    tempStorage.push({ params: { slug } });

                }
            )
        } else {
            return null
        }
    })

    const paths = tempStorage.filter((item,
        index) => {
        return tempStorage.indexOf(item) === index
    })

    return {
        paths,
        fallback: false,
    }

}

export async function getStaticProps({ params: { slug } }) {

    const currentSlug = slug

    const posts = allPosts.map((post) => pick(post, ["title", "date", "slug", "description", "draft", "tags"]));

    // Get files from the posts dir
    const files = fs.readdirSync(path.join('data'))

    let tempStorage = []

    // Get slug and frontmatter from posts

    const tempPosts = posts.map((filename) => {

        if (filename.draft === false) {
            filename.tags.map(
                tag => {
                    let tagSlug = slugify(tag)
                    if (slug === tagSlug) {
                        tempStorage.push({ post: filename })
                    }
                }
            )
        } else {
            return null
        }
    })

    const postsout = tempStorage.filter(
        post => {

            return post && post
        }
    )

    return {
        props: {
            postsout, currentSlug
        },
    }
}

export default function tag({ postsout, currentSlug }) {
    return (
        <>
            <Head>
                <title>Tag: {currentSlug}</title>
            </Head>
            <div id="top" className="flex flex-col max-w-6xl">
                <div className="drop-shadow-md flex flex-col rounded-lg">
                    <BlogHeader title={"Current Tag: " + currentSlug} />

                    {
                        postsout.map((post, index) => {

                            return <ItemPost key={index} post={post} slug={currentSlug} />
                        }
                        )

                    }





                </div>
            </div>
        </>
    )
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'
import ItemPost from '../../components/ItemPost'
import { allPosts } from "contentlayer/generated"
import { pick } from "@contentlayer/client";

export function slugify(title) {
    return title.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

export default function tag({ postsout }) {




    return (
        <>
            <div className="container my-3">
                <div className="row">

                    <div className="col-lg-10 post-date m-1 p-2m-auto">

                        {
                            postsout.map((post, index) => {

                                return <ItemPost key={index} post={post} />
                            }
                            )

                        }


                    </div>


                </div>
            </div>
        </>
    )





}


export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('data'))

    let tempStorage = []

    const temppaths = files.map((filename) => {

        let filepathname = path.join('data', filename)

        //console.log(filepathname)

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



    // const paths=["npm"]


    return {
        paths,
        fallback: false,
    }

}

export async function getStaticProps({ params: { slug } }) {

    const posts = allPosts.map((post) => pick(post, ["title", "date", "slug", "description", "draft", "tags", "categories"]));

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
            postsout
        },
    }


}

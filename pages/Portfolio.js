import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import Head from 'next/head'
import Image from 'next/image';
import art from '../img/art.png'
import recipe from '../img/recipe.png'
import textwars from '../img/textwars.png'
import watch from '../img/watch.png'

export default function Resume() {
  return (
    <>
        <Head>
          <title>Cameron Varley | Portfolio</title>
        </Head>
        <div className="md:min-h-[66px] bg-white dark:bg-zinc-800 mb-0.5 max-md:mt-0.5 md:mt-2 mx-2 md:rounded-t-lg rounded max-md:rounded-b flex flex-col md:flex-row overflow-hidden justify-between md:items-center py-3 px-6" >
          <div className=""><strong>Portfolio</strong></div>
        </div >
        <div className="md:min-h-[66px] bg-white dark:bg-zinc-800 mt-1 mb-0.5 mx-2 rounded flex flex-col md:flex-row overflow-hidden justify-between md:items-center py-3 px-6" >
          <div className="">
            Welcome to my portfolio, here you will find projects that I have completed for either myself or clients/friends. My bigest project is the website that you are currently on, it was built using Next.JS and uses markdown files to store the blog posts.
          </div>
        </div >
        <div id="top" className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 my-0.5 mx-2">
          <div className="flex flex-col dark:bg-zinc-800 bg-white rounded my-0.5">
            <a href="https://recipe.wfox.app/" target="_blank" rel="noreferrer">
              <Image className="max-h-[200px] rounded-t object-cover object-top" src={recipe}/>
              <div className="p-6">
                <div className="flex flex-row justify-between items-baseline">
                  <p className="text-lg"><strong>Recipe Book</strong></p>
                  <div className="bg-sky-500 px-1 py-0.5 rounded">Friend</div>
                </div>
                <div className="pt-2">Built using Next.js & Sanity. Store and search for recipes.</div>
              </div>
            </a>
          </div>
          <div className="flex flex-col dark:bg-zinc-800 bg-white rounded my-0.5">
            <a href="https://walnutfox.xyz/" target="_blank" rel="noreferrer">
              <Image className="max-h-[200px] rounded-t object-cover object-top" src={art}/>
              <div className="p-6">
                <div className="flex flex-row justify-between items-baseline">
                  <p className="text-lg"><strong>Art Portfolio</strong></p>
                  <div className="bg-sky-500 px-1 py-0.5 rounded">Friend</div>
                </div>
                <div className="pt-2">Built to showcase reference art for an original character.</div>
              </div>
            </a>
          </div>
          <div className="flex flex-col dark:bg-zinc-800 bg-white rounded my-0.5">
            <a href="https://github.com/RustedAperture/Text-Wars" target="_blank" rel="noreferrer">
              <Image className="max-h-[200px] rounded-t object-cover object-top" src={textwars}/>
              <div className="p-6">
                <div className="flex flex-row justify-between items-baseline">
                  <p className="text-lg"><strong>Text Game</strong></p>
                  <div className="bg-teal-500 px-1 py-0.5 rounded">Myself</div>
                </div>
                <div className="pt-2">Small demonstration game to showcase python OOP skills.</div>
              </div>
            </a>
          </div>
          <div className="flex flex-col dark:bg-zinc-800 bg-white rounded my-0.5">
            <a href="https://play.google.com/store/apps/details?id=com.walnutfox.retro" target="_blank" rel="noreferrer">
              <Image className="max-h-[200px] rounded-t object-cover object-center" src={watch}/>
              <div className="p-6">
                <div className="flex flex-row justify-between items-baseline">
                  <p className="text-lg"><strong>Synthetik</strong></p>
                  <div className="bg-teal-500 px-1 py-0.5 rounded">Myself</div>
                </div>
                <div className="pt-2">First watch face released on google play store</div>
              </div>
            </a>
          </div>
        </div>
    </>
  )
}

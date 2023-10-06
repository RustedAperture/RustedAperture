import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import Head from 'next/head'
import Image from 'next/image';
import art from '../img/art.png'
import recipe from '../img/recipe.png'
import textwars from '../img/textwars.png'

export default function Resume() {
  return (
    <>
        <Head>
          <title>Cameron Varley | Portfolio</title>
        </Head>
        <div className="md:min-h-[66px] bg-white dark:bg-zinc-800 mb-0.5 max-md:mt-0.5 md:mt-2 mx-2 md:rounded-t-lg rounded max-md:rounded-b flex flex-col md:flex-row overflow-hidden justify-between md:items-center py-3 px-6" >
          <div className=""><strong>Portfolio</strong></div>
        </div >
        <div id="top" className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 my-0.5 mx-2">
          <div className="flex flex-col dark:bg-zinc-800 bg-white rounded my-0.5">
            <a href="https://recipe.wfox.app/" target="_blank" rel="noreferrer">
              <Image className="max-h-[200px] rounded-t object-cover object-top" src={recipe}/>
              <div className="p-6">
                <div className="text-lg"><strong>Precipe App</strong></div>
                <div className="pt-2">Built using Next.js & Sanity. Store and search for recipes.</div>
              </div>
            </a>
          </div>
          <div className="flex flex-col dark:bg-zinc-800 bg-white rounded my-0.5">
            <a href="https://walnutfox.xyz/" target="_blank" rel="noreferrer">
              <Image className="max-h-[200px] rounded-t object-cover object-top" src={art}/>
              <div className="p-6">
                <div className="text-lg"><strong>Art Portfolio</strong></div>
                <div className="pt-2">Built to showcase reference art for an original character.</div>
              </div>
            </a>
          </div>
          <div className="flex flex-col dark:bg-zinc-800 bg-white rounded my-0.5">
            <a href="https://github.com/RustedAperture/Text-Wars" target="_blank" rel="noreferrer">
              <Image className="max-h-[200px] rounded-t object-cover object-top" src={textwars}/>
              <div className="p-6">
                <div className="text-lg"><strong>Text Wars</strong></div>
                <div className="pt-2">Small demonstration game to showcase python OOP skills.</div>
              </div>
            </a>
          </div>
        </div>
    </>
  )
}
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profilepic from '../../data/imgs/profile.jpg';
import { faGithub, faMastodon, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    return (
        <header className="max-lg:self-stretch drop-shadow-md flex flex-row flex-wrap xl:flex-col items-stretch sm:min-w-[20rem] bg-white rounded-lg p-6 m-2">
            <div className="max-md:basis-full drop-shadow-md flex-auto grow xl:grow-0 flex flex-col xl:flex-row items-center justify-center xl:justify-start shrink-0 text-center xl:text-left">
                <Link href="/"><Image className="drop-shadow-md max-xl:m-2 mr-2 h-20 w-20 rounded-lg" src={profilepic} /></Link>
                <div>
                    <div className="mt-2 xl:ml-2 text-xl text-slate uppercase">Cameron Varley</div>
                    <p className="xl:ml-2 text-slate font-medium mb-2">RustedAperture</p>
                </div>
            </div>
            <div
                className="drop-shadow-md max-md:justify-between flex-auto xl:flex-none flex md:flex-col my-2 max-md:items-baseline md:item-stretch">
                <a className="min-w-[48px] drop-shadow-md xl:grow text-center text-white md:rounded-lg max-md:rounded-full bg-neutral-800 p-3 my-2"
                    rel="me" href="/">
                    <FontAwesomeIcon icon={faHome} className="md:mr-2" />
                    <span className="max-md:hidden">Home</span>
                </a>
                <a className="min-w-[48px] drop-shadow-md xl:grow text-center text-white md:rounded-lg max-md:rounded-full bg-indigo-800 p-3 my-2"
                    rel="me" href="https://mstdn.ca/@RustedAperture">
                    <FontAwesomeIcon icon={faMastodon} className="md:mr-2" />
                    <span className="max-md:hidden">Mastodon</span>
                </a>
                <a className="min-w-[48px] drop-shadow-md xl:grow text-center text-white md:rounded-lg max-md:rounded-full bg-sky-500 p-3 my-2"
                    href="https://twitter.com/RustedAperture">
                    <FontAwesomeIcon icon={faTwitter} className="md:mr-2" />
                    <span className="max-md:hidden">Twitter</span>
                </a>
                <a className="min-w-[48px] drop-shadow-md xl:grow text-center text-white md:rounded-lg max-md:rounded-full bg-gray-600 p-3 my-2"
                    href="https://github.com/RustedAperture">
                    <FontAwesomeIcon icon={faGithub} className="md:mr-2" />
                    <span className="max-md:hidden">Github</span>
                </a>
            </div>
        </header>
    );
}
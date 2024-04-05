import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faMastodon, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHome, faBook, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    return (
        <div
            className="min-w-[20rem] drop-shadow-md justify-between flex-auto xl:flex-none flex max-md:mt-6 xl:mt-6 md:item-stretch flex-col">
            <Link className="grow text-center text-zinc-900 rounded-b rounded-t-lg hover:bg-zinc-300 bg-zinc-400 p-3 mb-0.5"
                rel="me" href="/">
                <span>Home</span>
            </Link>
            <Link className="grow text-center text-zinc-900 rounded hover:bg-zinc-300 bg-zinc-400 p-3 my-0.5"
                rel="me" href="/Resume">
                <span>Résumé</span>
            </Link>
            <Link className="grow text-center text-zinc-900 rounded-t rounded-b-lg hover:bg-zinc-300 bg-zinc-400 p-3 my-0.5"
                rel="me" href="/Portfolio">
                <span>Portfolio</span>
            </Link>
        </div>
    );
}

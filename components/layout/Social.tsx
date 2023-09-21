import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faMastodon, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Social() {
    return (
        <div className='xl:max-w-[50rem] xl:sticky top-8 max-xl:self-stretch drop-shadow-md flex flex-row flex-wrap items-stretch justify-center ml-1.5 mr-1.5'>
            <a className="min-w-[48px] text-2xl text-center text-indigo-500 p-3 m-0.5"
                rel="me" href="https://mstdn.ca/@RustedAperture">
                <FontAwesomeIcon icon={faMastodon}/>
            </a>
            <a className=" text-2xl text-center text-sky-500 p-3 m-0.5"
                href="https://twitter.com/RustedAperture">
                <FontAwesomeIcon icon={faTwitter}/>
            </a>
            <a className="min-w-[48px] text-2xl text-center text-gray-600 dark:text-gray-300 p-3 m-0.5"
                href="https://github.com/RustedAperture">
                <FontAwesomeIcon icon={faGithub}/>
            </a>
            <a className="min-w-[48px] text-2xl text-center text-blue-500 p-3 m-0.5"
                href="https://www.linkedin.com/in/cameron-varley-687368136/">
                <FontAwesomeIcon icon={faLinkedin}/>
            </a>
        </div>
    );
}
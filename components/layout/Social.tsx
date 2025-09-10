import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareXTwitter,
    faSquareGithub,
    faSquareBluesky,
    faSquareLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Social() {
    return (
        <div className="xl:sticky top-[346px] xl:max-w-[50rem] max-xl:self-stretch drop-shadow-md flex flex-row flex-wrap items-stretch justify-center ml-1.5 mr-1.5">
            <a
                className="min-w-[48px] text-2xl text-center text-zinc-900 p-3 m-0.5"
                href="https://x.com/rustedaperture"
                target="_blank"
                rel="noreferrer"
            >
                <FontAwesomeIcon icon={faSquareXTwitter} />
            </a>
            <a
                className="min-w-[48px] text-2xl text-center text-sky-500 p-3 m-0.5"
                href="https://bsky.app/profile/rustedaperture.xyz"
                target="_blank"
                rel="noreferrer"
            >
                <FontAwesomeIcon icon={faSquareBluesky} />
            </a>
            <a
                className="min-w-[48px] text-2xl text-center text-gray-600 dark:text-gray-300 p-3 m-0.5"
                href="https://github.com/RustedAperture"
                target="_blank"
                rel="noreferrer"
            >
                <FontAwesomeIcon icon={faSquareGithub} />
            </a>
            <a
                className="min-w-[48px] text-2xl text-center text-blue-500 p-3 m-0.5"
                href="https://www.linkedin.com/in/cameron-varley-687368136/"
                target="_blank"
                rel="noreferrer"
            >
                <FontAwesomeIcon icon={faSquareLinkedin} />
            </a>
        </div>
    );
}

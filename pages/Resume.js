import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import Head from 'next/head'

export default function Resume() {
  return (
    <>
        <Head>
            <title>Cameron Varley | Résumé</title>
        </Head>
        <div id="top" className="gap-y-8 xl:sticky top-8 max-xl:self-stretch drop-shadow-md flex flex-row flex-wrap xl:flex-col items-stretch sm:min-w-[20rem] bg-white dark:bg-zinc-800 rounded-lg p-6 m-2">
            <div>
                <p>Productive, efficient and proven fast learning indivual. Currently working as an event and product support specialist with Givergy. My current position puts me in a position to support our operations teams. My skills are focused in programming (web & application), photography, photo/video editing and Linux/Unix system administration.</p>
            </div>
            <div className="flex gap-x-3">
                <span><FontAwesomeIcon icon={faLocationPin}/> Mississauga, Canada</span>
                <span>
                    <a href="mailto:cam.avarley@gmail.com"><FontAwesomeIcon icon={faAt}/> Cam.AVarley@gmail.com</a>
                </span>
            </div>
            <div className="flex flex-col gap-y-4">
                <p className="text-3xl">Skills</p>
                <div className="flex gap-x-3 items-baseline">
                    <p className="text-xl font-bold">Languages</p>
                    <p className="underline decoration-2">Next.JS</p>
                    <p className="underline decoration-2">React</p>
                    <p className="underline decoration-2">Python</p>
                    <p className="underline decoration-2">GoLang</p>
                    <p className="underline decoration-2">Bash</p>
                </div>
                <div className="flex gap-x-3 items-baseline">
                    <p className="text-xl font-bold">Tools</p>
                    <p className="underline decoration-2">Visual Studio Code</p>
                    <p className="underline decoration-2">Git</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <p className="text-3xl">Education</p>
                <div>
                    <p className="text-xl font-bold">George Brown College <span className="font-normal text-base"><FontAwesomeIcon icon={faCircle} size="2xs"/> 2018 - 2021</span></p>
                    <p>Computer Systems Technology - System Administration</p>
                    <p>Technical knowledge of networking and computer systems. CCNA, AWS, MSCA, Full Stack Dev, Cyber Security.</p>
                </div>
                <div>
                    <p className="text-xl font-bold">Mohawk College <span className="font-normal text-base"><FontAwesomeIcon icon={faCircle} size="2xs"/> 2015 - 2017</span></p>
                    <p>Photography - Still & Motion</p>
                </div>
                <div>
                    <p className="text-xl font-bold">John Fraser Secondary School <span className="font-normal text-base"><FontAwesomeIcon icon={faCircle} size="2xs"/> 2011 - 2015</span></p>
                    <p>High School Diploma</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <p className="text-3xl">Work Experience</p>
                <div>
                    <p className="text-xl font-bold">Event and Product Support Specialist <span className="font-normal text-base"><FontAwesomeIcon icon={faCircle} size="2xs"/> June 2022</span></p>
                    <p>Givergy</p>
                    <p>Focused on the event delivery and supporting our North American on site staff to ensure a smooth event process. Quality assurance of our platform through testing. Responding and coordination with our development team on bugs.</p>
                </div>
                <div>
                    <p className="text-xl font-bold">Global Support Agent <span className="font-normal text-base"><FontAwesomeIcon icon={faCircle} size="2xs"/> Aug 2021 - June 2022</span></p>
                    <p>Givergy</p>
                    <p>Providing technical support for a SaS product at a global scale. Handling and priotizing cases and tickets from customers in many regions including Hong Kong, Australia, North America, and the UK.</p>
                </div>
                <div>
                    <p className="text-xl font-bold">Tech Manager <span className="font-normal text-base"><FontAwesomeIcon icon={faCircle} size="2xs"/> May 2019 - June 2023</span></p>
                    <p>Givergy</p>
                    <p>Setting up and monitoring computer systems and networks that run a web based application for silent auction based event. Knowledge of how to setup a LAN/WLAN for use by a group of tablets for bidding.</p>
                </div>
                <div>
                    <p className="text-xl font-bold">Maintenance Coordinator <span className="font-normal text-base"><FontAwesomeIcon icon={faCircle} size="2xs"/> Jul 2018 - May 2019</span></p>
                    <p>The Glenerin Inn & Spa</p>
                    <p>Maintain property around the hotel, communicating effectively with customers and staff to resolve problems when presented. Organizing parking during large events.</p>
                </div>
            </div>
        </div>
    </>
  )
}
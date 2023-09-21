import Link from 'next/link';
import Image from 'next/image';
import profilepic from '../../img/profile.jpg';
import Menu from './Menu'
import Social from './Social'

export default function Header() {
    return (
        <div className='xl:sticky top-8 grow flex flex-col self-stretch items-center'>
            <header className="xl:sticky top-8 max-xl:self-stretch drop-shadow-md flex flex-row flex-wrap xl:flex-col items-stretch sm:min-w-[20rem] bg-white dark:bg-zinc-800 rounded-lg p-6 m-2">
                <div className="max-md:basis-full drop-shadow-md flex-auto grow xl:grow-0 flex flex-col xl:flex-row items-center justify-center xl:justify-start shrink-0 text-center xl:text-left">
                    <Link href="/"><Image className="drop-shadow-md max-xl:m-2 mr-2 h-20 w-20 rounded-lg" src={profilepic} alt="Cameron Varley" /></Link>
                    <div>
                        <div className="mt-2 xl:ml-2 text-xl text-slate uppercase">Cameron Varley</div>
                        <p className="xl:ml-2 text-slate font-medium mb-2">RustedAperture</p>
                    </div>
                </div>
                <Menu />
            </header>
            <Social />
        </div>
    );
}
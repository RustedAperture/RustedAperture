import Search from "../../search.json";
import { useState } from "react";
import Link from 'next/link';
import { navigate } from "@reach/router";
import { ThemeSwitcher } from "../ThemeSwitcher";


export default function BlogHeader({ title }) {
    const [search, setSearch] = useState()
    function findSerach(value) {

        setSearch(value.target.value)
    }

    let qval = Object.values(Object.values({ pathname: '/Search', query: { q: search?.toLowerCase() } })[1])[0]

    function handleKeyPress(target) {
        // I'm guessing you have value stored in state
        if (target.charCode == 13) {
            window.location.href = `/Search?q=${Object.values({ qval })[0]}`;
        }
    }

    return (
        <div className="flex flex-col">
            <div className="md:hidden bg-white dark:bg-zinc-800 my-0.5 mx-2 rounded-t-lg rounded-b flex flex-row overflow-hidden justify-between items-center py-3 px-3" >
                <div className="flex grow">
                    <input onKeyPress={e => handleKeyPress(e)} onChange={findSerach} className="text-zinc-800 mr-0.5 w-full rounded-l-lg bg-gray-300 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                    <Link className="min-w-[42px] flex justify-center items-center aspect-square text-white rounded-r-lg hover:bg-neutral-500 bg-neutral-600 border-transparent" href={{ pathname: '/Search', query: { q: search?.toLowerCase() } }}>
                        GO
                    </Link>
                </div>
                <ThemeSwitcher />
            </div >
            <div className="bg-white dark:bg-zinc-800 mb-0.5 max-md:mt-0.5 md:mt-2 mx-2 md:rounded-t-lg rounded max-md:rounded-b flex flex-col md:flex-row overflow-hidden justify-between md:items-center py-3 px-6" >
                <div><strong>{title}</strong></div>
                <div className="flex max-md:mt-2 max-md:hidden">
                    <input onKeyPress={e => handleKeyPress(e)} onChange={findSerach} className="text-zinc-800 mr-0.5 w-full rounded-l-lg bg-gray-300 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                    <Link className="min-w-[42px] flex justify-center items-center aspect-square text-white rounded-r-lg hover:bg-neutral-500 bg-neutral-600 border-transparent" href={{ pathname: '/Search', query: { q: search?.toLowerCase() } }}>
                        GO
                    </Link>
                    <ThemeSwitcher />
                </div>
            </div >
        </div >
    )
}
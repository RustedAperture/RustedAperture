import Search from "../../search.json";
import { useState } from "react";
import Link from 'next/link';

export default function BlogHeader({ title }) {
    const [search, setSearch] = useState()
    function findSerach(value) {

        setSearch(value.target.value)
    }
    let qval = Object.values(Object.values({ pathname: '/Search', query: { q: search?.toLowerCase() } })[1])[0]
    return (
        <div className="bg-white m-2 rounded-lg flex flex-col md:flex-row overflow-hidden justify-between md:items-center py-3 px-6" >
            <div><strong>{title}</strong></div>
            <form className="flex max-md:mt-2" action={"/Search?q=" + qval} method="post">
                <input onChange={findSerach} className="mr-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                <Link className="min-w-[42px] flex justify-center items-center aspect-square text-white rounded-md bg-neutral-600 border-transparent" href={{ pathname: '/Search', query: { q: search?.toLowerCase() } }}>
                    GO
                </Link>
            </form>
        </div >
    )
}
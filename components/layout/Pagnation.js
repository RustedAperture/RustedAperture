import Link from "next/link";
import { useRouter } from "next/router";

function Pagnation({ totalPostCount }) {
    let router = useRouter()

    /*
     pages give number,base on number we create a array. base on array we map a list elements
     totalPostCount = 3
     conver into array [0,1,2]
     base on array create list in array
     
    */

    let pageIntoArray = Array.from(Array(totalPostCount).keys())


    return (

        <div className="flex flex-row">
            {
                pageIntoArray.map(page => {
                    return <a key={page} className="aspect-square rounded-lg hover:bg-neutral-700 bg-neutral-800 text-white my-0.5 mx-2 p-2" href={page === 0 ? "/" : `/page/${page + 1}`}>
                        <div className="aspect-square w-6 text-center">{page + 1}</div>
                    </a>
                })
            }
        </div>
    )
}

export default Pagnation
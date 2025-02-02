import React, { useState } from "react";

function StarRating({setOpenRating, gameId}){

    const [rating,setRating] = useState(0);
    const [hoverRating,setHoverRating] = useState(0);

    const Rate = (number) =>{
        const spanSet = []

        for(let i=0;i<number;++i){
            spanSet.push(<span key={i} onMouseEnter={() => setHoverRating(i+1)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(i+1)} className={`text-2xl cursor-pointer select-none mx-1 ${ (i < hoverRating || i< rating) ?" text-amber-500":""}`}>★</span>)
        }
        return spanSet;
    }

    const SendRating = () =>{
        if(rating === 0){
            alert("please select a rating")
        }
    }

    return(
        <div className="fixed flex flex-col group-focus-visible: bg-white border-2 border-black p-4 mt-4 w-1/2 h-96 z-50 rounded-lg">
            <div className="flex justify-between">
                <h1 className=" mx-1 select-none"><b>Rate the Game</b></h1>
                <h1 onClick={() => {setOpenRating(false)}} className=" text-red-700 cursor-pointer select-none"><b>x</b></h1>
            </div>
            <div className="flex flex-wrap ">
                {Rate(5)}
            </div>
            <div className="mt-4 h-1/2">
                <textarea id="comment" placeholder="comment..." className="w-full h-20 max-h-24 min-h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                <button onClick={SendRating} className=" select-none bg-orange-400 border-2 border-orange-500 p-2 mt-2 mx-1 rounded-md hover:bg-orange-500 hover:text-white">Submit</button>
            </div>
            {/* others comment section */}
            <div className="max-h-48 overflow-y-scroll border border-gray-300 p-4 rounded-md">
                <h1>username <b className="text-amber-400">★4.5</b></h1>
                <p className="break-words">testsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddaaaaaaaaaaaaa</p>
            </div>
        </div>
    )
}

export default StarRating
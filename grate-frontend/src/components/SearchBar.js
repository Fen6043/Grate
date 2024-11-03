import React, {useState,useEffect,useContext} from "react";
import SearchLogo from "../GameRlogo-removebg-preview.png";
import Arrow from "../arrowUp-removebg-preview.png";
import axios from "axios";
import { GameContext } from "../context/GameProvider";

function SearchBar(){
    const [tagLists, setTagLists] = useState([]);
    const {setSearchResult, setCategory, sortOption, setSortOption, isAscending, setIsAscending, remove, setRemove} = useContext(GameContext);
    function changeSortOrder(){
        setIsAscending(!isAscending);
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/api/taglist')
        .then(response => {
            setTagLists(response.data);
        })
        .catch(error => {console.error(error);});

    },[]);

    // useEffect(() => {
    //     console.log(remove);
    // },[remove])

    return(
            <div className="bg-amber-400 m-2 mt-14 border-2 border-black flex justify-between">
                <div className="flex">
                    <input type="text" onChange={e => setSearchResult(e.target.value)} placeholder="Search" className="my-2 ml-2 pl-2"/>
                    <button className="bg-white my-2">
                        <img src= {SearchLogo} alt = "lookupSearch" className="w-7 h-7"/>
                    </button>
                </div>
                <div className="flex m-2 space-x-3">

                    {/* <button onClick={() => {setRemove(!remove)}} className={`${remove ? "bg-green-600" : "bg-red-600"} px-4 mx-2 border-2 hover:border-black`}><b>-</b></button>
                     */}
                    <button
                      onClick={() => setRemove(!remove)}
                      className={`flex items-center justify-between w-12 p-1 rounded-full transition duration-300 ease-in-out ${
                        remove ? 'bg-red-500' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`w-4 h-4 flex items-center justify-center rounded-full transition transform duration-300 ease-in-out ${remove ? 'translate-x-6 bg-white' : 'bg-white text-red-500'}`}><b>-</b></span>
                    </button>

                    <label>Category:</label>
                    <select onChange={e=>setCategory(e.target.value)}>
                        <option value="">All</option>
                        {
                            tagLists.map(tagList => (
                                <option key={tagList.TagId}>{tagList.TagName}</option>
                            ))
                        }
                    </select>
                    <label>Sort:</label>
                    <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
                        <option value="">--Sort Option--</option>
                        <option value="AZ">A-Z</option>
                        <option value="RDate">Release Date</option>
                        <option value="Popularity">Popularity</option>
                    </select>

                    <button onClick={changeSortOrder}>
                        {isAscending ? <img src= {Arrow} alt="arrowUp" className="w-6 h-7"/> : <img src= {Arrow} alt="arrowDown" className="w-6 h-7 rotate-180"/>}
                    </button>

                </div>
            </div>
    );
}

export default SearchBar;
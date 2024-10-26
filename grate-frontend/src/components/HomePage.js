import {GameContext} from "../context/GameProvider";
import React, {useContext,useState,useEffect} from "react";
import axio from 'axios';
import {parseISO,format} from 'date-fns'
import { useNavigate } from "react-router-dom";

function HomePage(){
    const {category,searchResult, sortOption, setSortOption, isAscending, setIsAscending} = useContext(GameContext);
    const [gameLists, setGameLists] = useState([]);
    const [filteredGameList, setfilteredGameList] = useState([]);
    
    // to navigate to add form
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/addForm");
    }

    useEffect(()=>{
        axio.get('http://localhost:5000/api/gameslist')
        .then(response => {
            //console.log(response.data);
            setGameLists(response.data);
        })
        .catch(error => {
            console.error(`Error Ocuured while getting gamelist: ${error}`);
        })
    },[]);  

    useEffect(()=>{
        let filteredList = (category === "") ? gameLists : gameLists.filter(gameList => gameList.Genre.split("|").includes(category));
        filteredList = (searchResult === "") ? filteredList : filteredList.filter(list => list.GName.toLowerCase().includes(searchResult.toLowerCase()));
        setfilteredGameList(filteredList);
        setSortOption("");
        setIsAscending(true);

    },[gameLists,category,searchResult]);

    useEffect(() => {
        let sortedGameList = [...filteredGameList];
        if(sortOption === "AZ"){
            if(isAscending)
                sortedGameList.sort((a,b) => a.GName.localeCompare(b.GName));
            else
                sortedGameList.sort((a,b) => b.GName.localeCompare(a.GName));
        }
        else if(sortOption === "RDate"){
            if(isAscending){
                sortedGameList.sort((a,b) => {
                    const aReleaseDate = new Date(a.ReleaseDate);
                    const bReleaseDate = new Date(b.ReleaseDate);
                    return bReleaseDate - aReleaseDate;
    
                });
            }
            else{
                sortedGameList.sort((a,b) => {
                    const aReleaseDate = new Date(a.ReleaseDate);
                    const bReleaseDate = new Date(b.ReleaseDate);
                    return aReleaseDate - bReleaseDate;
    
                });
            }
        }
        else if(sortOption === "Popularity")
            {
            if(isAscending)
                sortedGameList.sort((a,b) => b.AvgRating - a.AvgRating);
            else
                sortedGameList.sort((a,b) => a.AvgRating - b.AvgRating);
        }

        setfilteredGameList(sortedGameList);
    },[sortOption,isAscending])

    return(
        <div className = 'flex flex-wrap gap-4 p-4'>
            {filteredGameList.map((gameList,index1) => {
                const tags = gameList.Genre.split('|');
                const releaseDate = parseISO(gameList.ReleaseDate);
                const formattedDate = format(releaseDate, 'MMMM do, yyyy');
                //console.log(formattedDate)

                //image location
                let imgLoc = "http://localhost:5000/" + gameList.ImgFilePath;
                imgLoc = imgLoc.replaceAll('\\','/');

                return (
                <div key= {index1} className="relative bg-cover bg-center h-72 w-1/6 min-w-60 bg-black m-2 border-2 border-black hover:border-orange-500 flex flex-wrap p-4"
                    style=
                    {{
                        backgroundImage: `url(${imgLoc})`
                    }}
                >
                    <div className="relative p-2 z-10 max-w-56 opacity-0 transition duration-300 hover:opacity-100 hover:backdrop-blur-sm ">
                        <div className="bg-orange-400 p-2 rounded-sm">
                        <h2 className="text-white text-lg font-bold break-words">{gameList.GName}</h2>
                        <h3 className="text-white">Release Date: <br />{formattedDate}</h3>
                        </div>
                        <div className="flex flex-wrap mt-2">
                            {tags.map((tag,index2) => (
                                <span key={index2} className="bg-gray-200 text-gray-800 text-xs break-words px-2 py-1 rounded mr-2 mb-2">{tag}</span>
                            ))}
                        </div>
                        <h3 className="text-white">{gameList.AvgRating}</h3>
                    </div>
                </div>
            )})}

            {/* to add new items */}
            <div onClick={handleClick} className="absolute bottom-3 right-3 bg-red-600 rounded-full p-2 cursor-pointer">
                <span className=" pointer-events-none select-none">+</span>
            </div>
             
        </div>
    );
}

export default HomePage;
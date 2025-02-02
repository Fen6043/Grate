import {GameContext} from "../context/GameProvider";
import React, {useContext,useState,useEffect} from "react";
import axio from 'axios';
import {parseISO,format} from 'date-fns'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRating";

function HomePage(){
    const {category,searchResult, sortOption, setSortOption, isAscending, setIsAscending, remove} = useContext(GameContext);
    const [gameLists, setGameLists] = useState([]);
    const [filteredGameList, setfilteredGameList] = useState([]);
    const [openRating,setOpenRating] = useState(false);
    const [gameId, setGameId] = useState(0);
    
    // to navigate to add form
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/addForm");
    }

    //fetch gamelist from db
    const fetchGame = async()=>{
        await axio.get('http://localhost:5000/api/gameslist')
        .then(response => {
            // console.log(response.data);
            setGameLists(response.data);
        })
        .catch(error => {
            console.error(`Error Ocuured while getting gamelist: ${error}`);
        })
    }

    // remove game
    const removeGame = async(id) => {
        //console.log(id);
        try {
            const response = await axio.delete(`http://localhost:5000/api/deletegame/${id}`);
            console.log(response.data); // Set the success message
            fetchGame();
          } catch (error) {
            // Set the error message if there is an issue
            console.log(error.response ? error.response.data : `Error: ${error.message}`);
          }
        
    }

    //Rating function
    const RateGame = (getgameId) =>{
        setGameId(getgameId);
        setOpenRating(true);
    }

    //load gamelist
    useEffect(() => {
        fetchGame();
    },[]);  

    useEffect(()=>{
        let filteredList = (category === "") ? gameLists : gameLists.filter(gameList => gameList.Genre.split("|").includes(category));
        filteredList = (searchResult === "") ? filteredList : filteredList.filter(list => list.GName.toLowerCase().includes(searchResult.toLowerCase()));
        setfilteredGameList(filteredList);
        setSortOption("");
        setIsAscending(true);

    },[gameLists,category,searchResult]);

    //To remove scrolling in background while rating is up
    useEffect(() => {
        if (openRating) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup function to remove the class when component unmounts
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [openRating]);

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
                    return aReleaseDate - bReleaseDate;
    
                });
            }
            else{
                sortedGameList.sort((a,b) => {
                    const aReleaseDate = new Date(a.ReleaseDate);
                    const bReleaseDate = new Date(b.ReleaseDate);
                    return bReleaseDate - aReleaseDate;
    
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
        <div className ="flex items-start justify-center">
            <div className = {`${openRating ? "pointer-events-none select-none blur-md" : ""} flex flex-wrap gap-4 p-4 items-center justify-center`}>
                {filteredGameList.map((gameList,index1) => {
                    const tags = gameList.Genre.split('|');
                    const releaseDate = parseISO(gameList.ReleaseDate);
                    const formattedDate = format(releaseDate, 'MMMM do, yyyy');
                    //console.log(formattedDate)

                    //image location
                    let imgLoc = "http://localhost:5000/" + gameList.ImgFilePath;
                    imgLoc = imgLoc.replaceAll('\\','/');

                    return (
                    <div key = {`${index1}0`}>
                    <div key = {`${index1}1`} className="relative bg-cover bg-center h-72 w-1/6 min-w-60 bg-black m-2 pl-1 pt-1 border-2 border-black hover:border-orange-500 flex flex-wrap"
                        style=
                        {{
                            backgroundImage: `url(${imgLoc})`
                        }}
                    >
                        <div className={`relative z-10 ${remove ? "max-w-48" : "max-w-52"} opacity-0 transition duration-300 hover:opacity-100 hover:backdrop-blur-sm`}>
                            <div className="bg-orange-400 p-2 rounded-sm">
                            <h2 className="text-white text-lg font-bold break-words">{gameList.GName}</h2>
                            <h3 className="text-white">Release Date: <br />{formattedDate}</h3>
                            </div>
                            <div className="flex flex-wrap mt-2">
                                {tags.map((tag,index2) => (
                                    <span key={index2} className="bg-gray-200 text-gray-800 text-xs break-words px-2 py-1 rounded mr-2 mb-2">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* remove tile */}
                        {
                            remove && (<div onClick={() => removeGame(gameList.GameID)} className=" absolute h-4 w-4 rounded-full border-2 border-black hover:border-white cursor-pointer select-none text-white flex items-center justify-center top-2 right-2 bg-red-600">-</div>)
                        }
                    </div>
                    
                    {/* star rating */}
                    <div key = {`${index1}2`} className="px-4 h-6 min-w-60">
                        <span onClick={() => {RateGame(gameList.GameID)}} className="text-xl text-amber-500 hover:text-2xl cursor-pointer select-none">★</span>
                        <span className="mx-1 px-2 font-sans bg-white rounded-md pointer-events-none select-none">{gameList.AvgRating}</span>
                    </div>
                    </div>
                )})}

                {/* to add new items */}                      
                <div onClick={handleClick} className="fixed bottom-3 right-3 bg-red-600 rounded-full p-2 cursor-pointer">
                    <span className=" pointer-events-none select-none">+</span>
                </div>   
            </div>
            
            {/* Rate the game */}
            {openRating &&
                <StarRating setOpenRating = {setOpenRating} gameId = {gameId}/>}
        </div>
    );
}

export default HomePage;
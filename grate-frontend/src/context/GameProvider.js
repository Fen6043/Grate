import React,{useState,createContext} from "react";

export const GameContext = createContext();

function GameProvider({ children }){
    const [userId,setUserId] = useState(100);
    const [category,setCategory] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [isAscending, setIsAscending] = useState(true);
    return(
        <GameContext.Provider value={{userId,setUserId,category,setCategory,searchResult,setSearchResult,sortOption,setSortOption,isAscending,setIsAscending}}>
        {children}
        </GameContext.Provider>
    );
}

export default GameProvider;
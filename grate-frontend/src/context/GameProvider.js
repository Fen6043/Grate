import React,{useState,createContext} from "react";

export const GameContext = createContext();

function GameProvider({ children }){
    const [userId,setUserId] = useState(100);
    const [category,setCategory] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [isAscending, setIsAscending] = useState(true);
    const [remove, setRemove] = useState(false);
    return(
        <GameContext.Provider value={{userId,setUserId,category,setCategory,searchResult,setSearchResult,sortOption,setSortOption,isAscending,setIsAscending,remove,setRemove}}>
        {children}
        </GameContext.Provider>
    );
}

export default GameProvider;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddForm(){
  const [openGenre,setOpenGenre] = useState(false);
  const [taglist,setTaglist] = useState([]);
  const [selectedTagList,setSelectedTagList] = useState([]);
  const [gName,setGName] = useState("");
  const [storePage, setStorePage] = useState("https://");
  const [releaseDate,setReleaseDate] = useState(Date.now());
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/taglist').then(
      response => {
        setTaglist(response.data.map(tagpool => tagpool.TagName));
      }
    )
  },[])

  const clickTagEvent = (tag) => {
    console.log(tag)
    if(selectedTagList.includes(tag)){
      setSelectedTagList(selectedTagList.filter(tags => tags !== tag))
    }
    else{
      setSelectedTagList([...selectedTagList,tag]);
    }
  }

  const formSubmit = async () => {
    const formdata = new FormData();
    const genreList = selectedTagList.join('|');
    formdata.append("imagefile",image);
    formdata.append("GName",gName);
    formdata.append("Genre", genreList);
    formdata.append("ReleaseDate",releaseDate);
    formdata.append("AvgRating","0");
    formdata.append("StorePage",storePage);
    
    const response = await axios.post('http://localhost:5000/api/addgames',formdata,{
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    });

    if(response.status === 201){
      alert("Added Successfully");
    }
    else{
      console.log(response.data)
    }
  }

  return(
    <div className="flex flex-col inset-0 justify-center items-center h-screen">
    <div className="relative max-w-80 mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Game</h2>
      <form onSubmit={formSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="GName" className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="GName"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter title"
            onChange={(e) => setGName(e.target.value)}
            required
          />
        </div>

        {/* Genre Input */}
        <div className="mb-4">
          <h2 className="block text-gray-700 text-sm font-bold mb-2">
            Genre:
          </h2>
          <div className="flex flex-wrap max-w-80">
            {selectedTagList.map((tag,index1) => (
              <span key={index1} onClick={() => clickTagEvent(tag)} className="border-2 border-black m-1 rounded-full px-1 hover:bg-red-500 select-none cursor-pointer">{tag}</span>
            ))}
          </div>
          
          <span onClick={() => {setOpenGenre(true)}} className="w-7 h-7 mt-1 bg-green-600 text-white flex items-center justify-center rounded-full cursor-pointer select-none">+</span>
        </div>

        {/* StorePage Input */}
        <div className="mb-4">
          <label htmlFor="StorePage" className="block text-gray-700 text-sm font-bold mb-2">
            StorePage:
          </label>
          <input
            type="text"
            id="StorePage"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="https://"
            onChange={(e) => setStorePage(e.target.value)}
            required
          />
        </div>

        {/* ReleaseDate Input */}
        <div className="mb-4">
          <label htmlFor="ReleaseDate" className="block text-gray-700 text-sm font-bold mb-2">
            ReleaseDate:
          </label>
          <input
            type="date"
            id="ReleaseDate"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>

    <div className="relative mx-auto w-64 p-4 text-center mt-2">
        <Link to="/" className="text-red-600 hover:text-red-950">Back to Home</Link>
    </div>

    {/* open genre */}
    {openGenre && (
      <div className="fixed bg-white border-2 border-black p-4 w-72 h-48">
      <div className="flex justify-between">
        <h1 className="select-none"><b>Select Genre</b></h1>
        <h1 onClick={() => {setOpenGenre(false)}} className=" text-red-700 cursor-pointer select-none"><b>x</b></h1>
      </div>
      <div className="flex flex-wrap">{
        taglist.map((tag,index2) =>(
          <span key={index2} onClick={() => clickTagEvent(tag)} className= {` ${selectedTagList.includes(tag)? "bg-green-600" :"bg-orange-400"} rounded-md m-1 px-1 cursor-pointer select-none hover:bg-yellow-400`}>{tag}</span>
        ))
      }</div>
      
    </div>
    )}

    </div>
    
  );
}

export default AddForm;
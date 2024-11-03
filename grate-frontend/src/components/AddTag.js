import axios from "axios";
import React, { useState, useEffect } from "react";

function AddTag(){

    const [tagList,setTaglist] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [filteredTaglist, setFilteredTaglist] = useState([]);

    //submit form
    const formSubmit = () => {

    }

    const loadTags = async () => {
        await axios.get('http://localhost:5000/api/taglist').then(
          response => {
            setTaglist(response.data.map(tagpool => tagpool.TagName));
            setFilteredTaglist(response.data.map(tagpool => tagpool.TagName));
          }
        )
      }

    //load
    useEffect(() => {loadTags();},[])

    useEffect(
        () => 
        {
            let newTagList = [...tagList];
            if(newTag !== ""){
                newTagList = tagList.filter(a => a.toLowerCase().includes(newTag.toLowerCase()));
            }
            setFilteredTaglist(newTagList)
        },[newTag])

    return (
        <div className="flex flex-col inset-0 justify-center items-center h-screen">
            <div className="relative w-1/3 mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Tag</h2>
              <form onSubmit={formSubmit}>
                {/* Tags already present */}
                <div className="mb-4">
                  <h2 className="block text-gray-700 text-sm font-bold mb-2">
                    Tags:
                  </h2>
                  <div className="flex flex-wrap w-full">
                    {filteredTaglist.map((tag,index1) => (
                      <span key={index1} className="border-2 border-black m-1 rounded-full px-1 bg-yellow-300 select-none"><b>{tag}</b></span>
                    ))}
                  </div>
                </div>

                {/* New Tag Input */}
                <div className="mb-4">
                  <label htmlFor="Tagname" className="block text-gray-700 text-sm font-bold mb-2">
                    Add new Tag:
                  </label>
                  <input
                    type="text"
                    id="Tagname"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter new Tag"
                    onChange={(e) => {setNewTag(e.target.value)}}
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
        </div>
    );
}

export default AddTag;
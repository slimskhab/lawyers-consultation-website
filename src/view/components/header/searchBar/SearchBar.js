import React, { useState, } from 'react';
import { filterList, clearList, setList } from '../../../../features/Search';
import { useDispatch, useSelector } from 'react-redux';
import "./SearchBar.css"
import { useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
function SearchBar(props) {
    const searchResult = useSelector((state) => state.searchStore.filteredList);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");

useEffect(()=>{
axios.get("http://localhost:6005/lawyer").then((res)=>{
    dispatch(setList(res.data.lawyers))
}).catch((e)=>{
    console.log(e)
})
},[])
const navigate=useNavigate();
    return (
        <div>
            <div className={searchResult.length === 0 ? 'search-bar-closed' : 'search-bar-opened'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
                    <path d="M42.875 42.8754L34.008 34.0085M34.008 34.0085C35.5248 32.4917 36.7279 30.6911 37.5487 28.7094C38.3696 26.7277 38.7921 24.6037 38.7921 22.4588C38.7921 20.3138 38.3696 18.1898 37.5487 16.2081C36.7279 14.2264 35.5248 12.4258 34.008 10.909C32.4913 9.39232 30.6907 8.18918 28.709 7.36833C26.7273 6.54749 24.6033 6.125 22.4583 6.125C20.3133 6.125 18.1894 6.54748 16.2077 7.36833C14.226 8.18918 12.4253 9.39232 10.9086 10.909C7.84545 13.9722 6.12457 18.1268 6.12457 22.4588C6.12457 26.7907 7.84545 30.9453 10.9086 34.0085C13.9718 37.0716 18.1263 38.7925 22.4583 38.7925C26.7903 38.7925 30.9449 37.0716 34.008 34.0085Z" stroke="#001F3F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input className='input-style' placeholder='Search...' value={searchText} onChange={(e) => {
                    setSearchText(e.target.value)
                    if (e.target.value === "") {
                        dispatch(clearList());
                    } else {
                        dispatch(filterList(e.target.value));
                    }


                }}></input>

                {
                    searchText.length !== 0 && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 49 49" fill="none" onClick={() => {
                            setSearchText("");
                            dispatch(clearList());

                        }} style={{ cursor: "pointer" }}>
                            <path d="M6.12457 6.12457L42.8754 42.8754M6.12457 42.8754L42.8754 6.12457" stroke="#001F3F" strokeWidth="4" strokeLinecap="round" />
                        </svg>

                    )
                }

            </div>


            {
                searchResult.length !== 0 && (

                    <div className='data-result-container'>
                        <div className='data-result' >

                            {
                                searchResult.map((e, index) => {
                                    return (<a className='data-item' onClick={()=>{
                                        dispatch(clearList())
                                        navigate(`/lawyer/${e.id}`)
                                    }}><p>{e.firstName} {e.lastName}</p></a>)
                                })
                            }

                        </div></div>)
            }
        </div>
    );
}

export default SearchBar;
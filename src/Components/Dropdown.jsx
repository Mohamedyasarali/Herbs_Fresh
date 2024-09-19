import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown } from '@fortawesome/free-solid-svg-icons';

function Dropdown(){
    const [isToggle,setIsToggle]=useState(false);
    const [selectedOption,setSelectedOption]=useState("All Categories");
    const dropdownRef=useRef(null);
    const options=[
        "All Categoies",
        "Digestive Health",
        "Immunity",
        "skin Care"
    ];

    const toggleDropdown=()=>setIsToggle(!isToggle);

    const handleOptionClick=(option)=>{
        setSelectedOption(option);
        setIsToggle(false);
    }

    useEffect(()=>{
        function handleClickOutside(event){
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsToggle(false);
            }
        }

         // AddEventlistener For Clicks

         document.addEventListener("mousedown",handleClickOutside);

         return()=>{
            document.removeEventListener("mousedown",handleClickOutside)
         }
    },[]);
    return(
        <>
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>{selectedOption} &nbsp;
            <span className={`arrow ${isToggle ? "open" : ""}`}><FontAwesomeIcon icon={faCaretDown} /></span>

            </div>
            {
                isToggle &&(
                    <div className="dropdown-options">
                        {
                            options.map((option,index)=>(
                                <div key={index} className="dropdown-option" onClick={()=>handleOptionClick(option)}>{option}</div>
                            ))
                        }
                    </div>
                )
            }
        </div>
        </>
    )
}
export default Dropdown;
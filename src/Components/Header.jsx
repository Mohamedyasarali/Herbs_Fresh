import { useState } from "react";
import Cards from "./Cards";
import Dropdown from "./Dropdown";

function Header({setIsSearching,setHerbal: setHerbalProp}){
    const [serachQuery,setSearchQuery]=useState("");
    const [herbalItem,setHerbalItem]=useState([]);
    const [herbal,setHerbal]=useState(null);


        function handleSearchChange(event){
            const query=event.target.value;
            setSearchQuery(query);

                //Triggering Searching State
                if(query.length!==0){
                    setIsSearching(true);
                }

            if(query.length!==0){
                fetch(`http://localhost:8000/herbs/${query}`,{
                    method:"GET",
                    headers:{
                        "Content-type":"application/json"
                    }
                })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    console.log(data);
                    if(data.message===undefined){
                        setHerbalItem(data)
                        console.log(data);
                    }
                    else{
                        setHerbalItem([])
                    }
                })
                .catch((err)=>{
                    console.error(err);
                })
            }
            else{
                setIsSearching(false); 
                setHerbalItem([]);
            }
        }

        function handleClick(selectedHerb){
            setHerbalProp(selectedHerb);
            setHerbalItem([]);
            setSearchQuery("");
        }

       

        function handleFilterChange(event){
         
        }
    return(
        <>

            <header className="header">
                <div className="header-logo">
                    <h4 className="logo-name">Herb <span className="logo-span">Sphere</span></h4>
                </div>
                <nav className="nav">
                    <div className="search">
                      <input type="text" placeholder="Search Herbs..." className="search-inp" value={serachQuery} onChange={handleSearchChange} />
    
                      {
                        herbalItem.length!==0?(
                            <div className="serach-display">
                                {
                                    herbalItem.map((herb)=>{
                                        return(
                                            <p className="herb" onClick={()=>{
                                                handleClick(herb)
                                            }}
                                            key={herb._id}>{herb.name}</p>
                                        )
                                    })
                                }
                            </div>
                        ):(null)
                      }
                    </div>
                    {
                        herbal!==null?(
                            <Cards herbal={herbal}/>
                        ):null
                    }

                    <Dropdown/>
                    
                 </nav>
            </header>
        </>
    )
}
export default Header;
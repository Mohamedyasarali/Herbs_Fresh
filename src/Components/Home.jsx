import { useEffect, useState } from "react";

function Home(){

    const [text,setText]=useState("Ayurveda");

    useEffect(()=>{
        const textArray=[
            "Ayurveda",
            "Yoga & Naturopathy",
            "Unani",
            "Siddha",
            "Homeopathy"
        ];

        let index=0;

        const textLoad=()=>{
            setText(textArray[index]);
            index=(index+1)%textArray.length;
        };
        textLoad();

        const intervalId=setInterval(textLoad,3000);

        return()=>clearInterval(intervalId);
    },[]);
    return(
        <>
         <div className="home">
                  <div className="home-creds">
                        <div className="home-title">
                            <h3>Welcome to the Virtual Herbal Garden</h3>
                            <h4 className="home-anime">{text}</h4>
                        </div>
                        <div className="home-subtitle">
                            <p>Explore the wonders of medicinal plants, their benefits, and uses.</p>
                        </div>
                       <button className="btn">Explore Now</button>
                  </div>

         </div>
        </>
    )
}

export default Home;
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Dialog from './Dialog';
import Modal from './Modal';

function Cards(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [herbal,setHerbal]=useState({});
  const [isDialogOpen,setIsDialogOpen]=useState(false);

  //Props Data in Herbal
  useEffect(()=>{
    setHerbal(props.herbal);
  },[props.herbal]);

  useEffect(()=>{
    fetch("http://localhost:8000/herbs",{
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
    if(data && data.length>0){
        setHerbal(data)
    }
  })
  .catch((err)=>{
    console.error(err);
  });
  },[]);

  useEffect(()=>{
    if(herbal){
      console.log(herbal);
    }
  })

  //OpenDialog
  const openDialog=()=>{
    setIsDialogOpen(true);
    document.body.classList.add("blur-background");
  }
//CloseDialog
  const closeDialog=()=>{
    setIsDialogOpen(false);
    document.body.classList.remove("blur-background");
  }


  return (
    <div
      className={`card ${isDialogOpen ? 'blur' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="herb-image">
        <img
          className="herb-img"
          src={herbal.image}
          alt="image"
        />
      </div>
      {/* Card Hover */}
      <div className={`container ${isHovered ? 'show' : ''}`}>
        <div className="title">
          <div className='eye-icon' onClick={openDialog}><FontAwesomeIcon icon={faEye} /></div>
            <h4>{herbal.name} &nbsp;<span className='title-span'>{herbal.scientific_name}</span> </h4>
           <ul className="common-names">
             {herbal?.common_names?.length > 0 ? (
               herbal.common_names.map((name, index) => (
                 <li key={index}>{name}</li>
               ))
             ) : (
               <li>No common names available</li>
             )}
           </ul>
           <div className="active-compounds">
                  {herbal?.active_compounds?.length > 0 ? (
                    herbal.active_compounds.map((compound) => (
                      <div key={compound._id} className="compound">
                        <h6>Active Compounds:{compound.compound}</h6>
                        <p>{compound.properties}</p>
                      </div>
                    ))
                  ) : (
                    <p>No active compounds available</p>
                  )}
            </div>
            {/* <div className="medicinal-uses">
                
            </div> */}
        </div>
        <p></p>
        <div className="desc">
                <h6>Medicinal Uses:</h6>
                    {herbal?.medicinal_uses?.length > 0 ? (
                      herbal.medicinal_uses.map((use) => (
                        <div key={use._id} className="medicinal-use">
                          <h5>{use.property}</h5>
                          <p>{use.description}</p>
                        </div>
                      ))
                    ) : (
                      <p>No medicinal uses available</p>
                    )}
        </div>
      </div>
       {/* Dialog */}
              <Dialog
                 isOpen={isDialogOpen}
                 onClose={closeDialog}
                 content={<Modal/>}
              />
    </div>
  );
}

export default Cards;

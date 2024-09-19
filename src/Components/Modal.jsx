import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const Model=({onLoaded})=>{
    const {scene}=useGLTF("/neem.gltf" ,true);

    if(scene && onLoaded){
        onLoaded();
    }
    return (
        <primitive 
        object={scene} 
        scale={[0.5, 0.5, 0.5]} 
        position={[0, -1, 0]} 
        rotation={[0, Math.PI, 0]} 
      />
    )
}


function Modal(){
    const [loading, setLoading] = useState(true);

    const handleModelLoaded = () => {
        setLoading(false);
    };

    return(
        <>
        <div className='canva-container'>
            {
                loading && (
                    <div className='spinner-container'>
                         <FontAwesomeIcon icon={faSpinner} spin size="2x" className="loading-spinner" />
                    </div>
                )
            }
           <Canvas style={{height:"255px"}}  camera={{position:[3,3,5],fov:50}}>
               <ambientLight intensity={1}/>
               <directionalLight position={[10, 10, 5]} intensity={2} />
               <OrbitControls
                 enablePan={true}
                 enableZoom={true}
                 enableRotate={true}
                 minDistance={1}
                 maxDistance={20}
               />
               <Model onLoaded={handleModelLoaded} />
           </Canvas>
        </div>

        </>
    )
}
export default Modal;
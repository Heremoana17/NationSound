import React from 'react';

const ProgrammeUl = ({allMapScenes, sceneFilter, setSceneFilter, artisteNames, artisteFiltre, setArtisteFiltre}) => {
    return (
        <div className="ps-0">
            <button type="button" className="btn dropdown-toggle text-white " data-bs-toggle="dropdown" aria-expanded="false">
                Scene
            </button>
            <ul className="dropdown-menu ">
                {allMapScenes && 
                    allMapScenes.map((scene, index)=>{
                        return(
                            <li key={index} ><button className="dropdown-item" type="button" onClick={()=>setSceneFilter(scene)}>{scene}</button></li>
                        )
                    })    
                }
                {sceneFilter &&
                    <li><button className="dropdown-item" type="button" onClick={()=>setSceneFilter(null)}>Réinitialiser</button></li>
                }
            </ul>
            <button type="button" className="btn dropdown-toggle text-white " data-bs-toggle="dropdown" aria-expanded="false">
                Artiste
            </button>
            <ul className="dropdown-menu ">
                {artisteNames && 
                    artisteNames.map((artiste, index)=>{
                        return(
                            <li key={index} ><button className="dropdown-item" type="button" onClick={()=>setArtisteFiltre(artiste)}>{artiste}</button></li>
                        )
                    })    
                }
                {artisteFiltre &&
                    <li><button className="dropdown-item" type="button" onClick={()=>setArtisteFiltre(null)}>Réinitialiser</button></li>
                }
            </ul>
        </div>
    );
};

export default ProgrammeUl;
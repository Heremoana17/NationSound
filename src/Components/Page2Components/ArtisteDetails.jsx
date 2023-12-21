import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EpisodeArtisteCards from '../SubComponent/EpisodeArtisteCards';
import { Link } from 'react-router-dom';

const ArtisteDetails = ({id,height}) => {

    const [artistes, setArtistes] = useState([])
    useEffect(()=>{
        axios
            .get(`https://pixelevent.site/api/artistes`)
            .then(res=> setArtistes(res.data['hydra:member']))
    },[])

    const artiste = artistes.filter(artiste => artiste.id === Number(id)).at(0)

    const [showOtherEpisode, setShowOtherEpisode] = useState(false)
    const image = {
        uri : 'https://pixelevent.site/assets/uploads/artiste/'
    }

    return (
        <div style={{minHeight:height}}>
            {artiste && 
            <section className='text-white'>
                <article className='container-xl pt-xl-3'>
                    <div style={{backgroundImage:`url(${image.uri}${artiste.featuredImage})`}} className='centerImageArtiste col-xl-4 float-xl-start mb-sm-2 me-sm-4 '>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h2 className='fs-1 mt-3'>{artiste.name}</h2>
                        <div className='d-flex align-items-end'>
                            <p>liste des reseau sociaux</p>
                        </div>
                    </div>
                    <hr className='mt-2'/>
                    <button className='btn btn-outline-light'>
                        <Link to={artiste.musicLink} target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'>Ecouter un extrait</Link>
                    </button>
                    <p className='mt-3 mb-0'>
                        {artiste.description}
                    </p>
                </article>
                <section className='container'>
                    <button className='btn btn-outline-light container mt-4' onClick={()=>{setShowOtherEpisode(!showOtherEpisode)}}>Voir les autres passage sur scene</button>
                    {showOtherEpisode && 
                        <div className='d-flex pt-3 scrollx'>
                            {artiste.episodes.map((episode, index)=>{
                                return(
                                    <div key={index} >
                                        <EpisodeArtisteCards episode={episode}/>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </section>
            </section>
}
        </div>
    );
};

export default ArtisteDetails;
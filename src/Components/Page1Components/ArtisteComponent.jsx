import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation';
import data from '../../Assets/Data/ArtisteData.json'
import { NavLink } from 'react-router-dom';

const ArtisteComponent = () => {
    const[artistes, setArtistes] = useState([])
    useEffect(()=>{
        setArtistes(data)
    },[])

    const img = {
        url : 'https://pixelevent.site/assets/uploads/artiste/'
    }
    return (
        <div className='doc container '>
            <h1 className='titleA text-center'>Artiste</h1>
            <hr className='text-white'/>
            {artistes &&
                artistes.map((artiste)=>{
                    return(
                        <NavLink key={artiste.id} className='text-decoration-none' to={`/artiste/${artiste.id}`}>
                            <article key={artiste.id} className='text-white d-xl-flex my-3'>
                                <div style={{backgroundImage:`url("${img.url}${artiste.featuredImage}")`}} className='col col-xl-3 centerimg imgA rounded'/>
                                <div className='mx-xl-3 py-2'>
                                    <h2 className='fontRaph'>{artiste.name}</h2>
                                    <p style={{height:90, overflow:'hidden'}}>{artiste.description}</p>
                                    <button className='btn btn-outline-light'>Voir plus</button>
                                </div>
                            </article>
                        </NavLink>
                    )
                })
            }
        </div>
    );
};

export default ArtisteComponent;


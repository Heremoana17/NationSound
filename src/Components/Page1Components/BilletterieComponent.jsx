import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation';
import { useLoaderData } from 'react-router-dom';
import axios from "axios"
import Footer from '../Footer';

const BilletterieComponent = ({height}) => {

    //on recupère les donnés du fetch
	const view = useLoaderData()

    const figure = {
        uri: 'https://pixelevent.site/assets/uploads/figure/',
    };

    const [billets, setBillets] = useState([])
    useEffect(()=>{
        axios
            .get('https://pixelevent.site/api/billets')
            .then(res => setBillets(res.data['hydra:member']))
    },[])

    const img = {
        uri: 'https://pixelevent.site/assets/uploads/billet/',
      };

    const redirect = () =>{
        alert('Vous allez être rediriger vers le site de la billetterie')
    }
    return (
        <div>
            <header style={{backgroundImage:`url(${figure.uri}${view.headerImage.name})`}} className='centerImage'>
                <h1 className='text-center titlePage'>{view.name}</h1>
            </header>
            <main style={{minHeight: height-400}}>
                <article className='container text-white py-4'>
                    <h5 className='text-center'>{view.headerText}</h5>
                    {billets &&
                        billets.map((billet, index)=>{
                            return(
                                <div key={index} className='my-3'>
                                    <div style={{backgroundImage:`url(${img.uri}${billet.featuredImage})`}} className='imgBillet centerImage rounded' onClick={redirect}>
                                        <h2 className='p-3'>{billet.name}</h2>
                                        <p className='px-3'>{billet.description}</p>
                                        <p className='p-3'>Prix : {billet.price} &euro;</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </article>
            </main>
        </div>
    );
};

export default BilletterieComponent;
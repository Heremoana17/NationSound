import React, { useEffect, useState } from 'react';
import data from "../../Assets/Data/SponsorData.json"
import SponsorPixelEventComponent from '../SubComponent/SponsorPixelEventComponent';

const SponsorComponent = ({view, state, height}) => {

    const [channel, setChannel] = useState('data')
    const[sponsors, setSponsors]= useState([])
    useEffect(()=>{
        setSponsors(data)
    },[])

    const figure = {
        uri: 'https://pixelevent.site/assets/uploads/figure/',
    };

    const changeChanel = () =>{
        if (channel === 'pixelevent') {
            setChannel('data')
        }
        if (channel === 'data') {
            setChannel('pixelevent');
        }
    }

    return (
        <div>
            <header style={{backgroundImage:`url(${figure.uri}${view.headerImage.name})`}} className='centerImage'>
                <h1 className='text-center titlePage'>{view.name}</h1>
            </header>
            <main style={{minHeight: height}}>
                {state === 'loading' && 
                    <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
                <h5 className='text-center text-white container py-4'>{view.headerText}</h5>
                <div className='container mb-3'>
                    <button className='btn btn-primary' onClick={changeChanel}><i className="fa-solid fa-rotate"></i></button>
                </div>
                {channel === "data" &&
                    <section className='pb-4 container'>
                        {sponsors && 
                            sponsors.map((sponsor, index)=>{
                                return(
                                    <div key={index} style={{backgroundImage:`url(${sponsor.figure})`}} className='imgArticle centerImage d-flex rounded mb-4'>
                                    <img src={sponsor.logo} alt="sponsorimage" className='rounded  ms-xl-3 p-4' />
                                    <p className='text-white text-center sponsorName col align-self-center me-xl-5 mb-0'>{sponsor.name}</p>  
                                </div>
                                ) 
                            })
                        }
                    </section>
                }
                {channel === 'pixelevent' &&
                    <SponsorPixelEventComponent/>
                }
            </main>
        </div>
    );
};

export default SponsorComponent;
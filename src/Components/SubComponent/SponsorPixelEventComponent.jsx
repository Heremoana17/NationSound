import React, { useEffect, useState } from 'react';
import axios from 'axios'

const SponsorPixelEventComponent = () => {

    const [sponsors, setSponsors] = useState([])
    useEffect(()=>{
        axios
            .get('https://pixelevent.site/api/sponsors')
            .then(res => setSponsors(res.data['hydra:member']))
    },[])
    const imgSponsor = {
        uri: 'https://pixelevent.site/assets/uploads/sponsors/diapo/',
      };
    const logoSponsor = {
        uri: 'https://pixelevent.site/assets/uploads/sponsors/',
      };
    return (
        <div>
            <section className='pb-4 container'>
                {sponsors && 
                    sponsors.map((sponsor, index)=>{
                        return(
                            <div key={index} style={{backgroundImage:`url(${imgSponsor.uri}${sponsor.imageSponsors[0].name})`}} className='imgArticle centerImage d-flex rounded mb-4'>
                                <img src={logoSponsor.uri + sponsor.logo} alt="sponsorimage" className='rounded  ms-xl-3 p-4' />
                                <p className='text-white text-center sponsorName col align-self-center me-xl-5 mb-0'>{sponsor.name}</p>  
                            </div>
                        ) 
                    })
                }
            </section>
        </div>
    );
};

export default SponsorPixelEventComponent;
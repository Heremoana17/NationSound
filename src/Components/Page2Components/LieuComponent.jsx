import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProgrammeArtisteCards from '../SubComponent/ProgrammeArtisteCards';

const LieuComponent = ({id}) => {

    // fonction pour avoir les dimention de l"ecran
	const [screenSize, setScreenSize] = useState(getCurrentDimension());
    function getCurrentDimension(){
      return {
            width: window.innerWidth,
            height: window.innerHeight
      }
    }
    useEffect(() => {
          const updateDimension = () => {
                setScreenSize(getCurrentDimension())
          }
          window.addEventListener('resize', updateDimension);
          return(() => {
              window.removeEventListener('resize', updateDimension);
          })
    }, [screenSize])
    const height = screenSize.height-57-175-59

    const[lieu, setLieu] = useState()
    useEffect(()=>{
       axios
        .get(`https://pixelevent.site/api/lieus/${id}`)
        .then(res => setLieu(res.data))
    },[id])
    const image = {
        url : 'https://pixelevent.site/assets/uploads/lieu/'
    }

    const[showProgramme, setShowProgramme] = useState(false)
    console.log(lieu);

    return (
        <div style={{minHeight: height}}>
            {lieu &&
                <section>
                    <article className='container-xl pt-xl-3 text-white'>
                        <div style={{backgroundImage:`url(${image.url}${lieu.featuredImage})`}} className='centerImageArtiste col-xl-4 float-xl-start mb-sm-2 me-sm-4 '>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <h2 className='fs-1 mt-3'>{lieu.name}</h2>
                            <div className='d-flex align-items-end'>
                                <p>liste des reseau sociaux</p>
                            </div>
                        </div>
                        <hr className='mt-2'/>
                        <p className=' mb-0'>
                            {lieu.description}
                        </p>
                    </article>
                    {lieu.category === 'Scene' &&
                    <section className='container'>
                        <button className='btn btn-outline-light container mt-4' onClick={()=>setShowProgramme(!showProgramme)}>Voir le programme de la scene</button>
                        <div className='d-flex scrollx'>
                        {showProgramme &&
                            lieu.episodes &&
                                lieu.episodes.map((episode, index)=>{
                                    return(
                                        <ProgrammeArtisteCards episode={episode} key={index}/>
                                    )
                                })
                        }
                        </div>
                    </section>
                    }
                </section>
            }
        </div>
    );
};

export default LieuComponent;
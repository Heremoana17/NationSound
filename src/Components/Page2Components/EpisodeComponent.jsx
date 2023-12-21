import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import EpisodeArtisteCards from '../SubComponent/EpisodeArtisteCards';
import { Link } from 'react-router-dom';


const EpisodeComponent = ({id}) => {

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
    
    const [episodes, setEpisodes] = useState([])
    useEffect(()=>{
        axios
            .get(`https://pixelevent.site/api/episodes`)
            .then(res=> setEpisodes(res.data['hydra:member']))
    },[])
    

    const episode = episodes.filter(episode => episode.id === Number(id)).at(0)
    if (episode) {
        var artisteId= episode.artiste.id
    }

    const otherArtisteEpisode = episodes.filter(episode => episode.artiste.id === artisteId)

    const [showOtherEpisode, setShowOtherEpisode] = useState(false)

    const image = {
        uri : 'https://pixelevent.site/assets/uploads/artiste/'
    }

    console.log(episode);
    return (
        <div className=' text-white' style={{minHeight: height}}>
            {episode &&
                <section>
                    <article className='container-xl pt-xl-3'>
                        <div style={{backgroundImage:`url(${image.uri}${episode.artiste.featuredImage})`}} className='centerImageArtiste col-xl-4 float-xl-start mb-sm-2 me-sm-4 '>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <h2 className='fs-1 mt-3'>{episode.artiste.name}</h2>
                            <div className='d-flex align-items-end'>
                                <p>liste des reseau sociaux</p>
                            </div>
                        </div>
                        <hr className='mt-2'/>
                        <div className='d-flex justify-content-between my-3'>
                            <div>
                                <h5>Heure : {moment(episode.hour).format('H.mm')}</h5>
                                <h5>Scene : {episode.lieu.name}</h5>
                            </div>
                            <Link to={episode.artiste.musicLink} target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'>Ecouter un extrait</Link>
                        </div>
                        <p className=' mb-0'>
                            {episode.artiste.description}
                        </p>
                    </article>
                    <section className='container'>
                        <button className='btn btn-outline-light container mt-4' onClick={()=>{setShowOtherEpisode(!showOtherEpisode)}}>Voir les autres passage sur scene</button>
                        {showOtherEpisode && 
                            otherArtisteEpisode && 
                                <div className='d-flex pt-3 scrollx'>
                                    {otherArtisteEpisode.map((otherEpisode, index)=>{
                                        return(
                                            <div key={index}>
                                                <EpisodeArtisteCards episode={otherEpisode}/>
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

export default EpisodeComponent;
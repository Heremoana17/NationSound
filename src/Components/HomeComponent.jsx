import { useEffect, useState } from 'react';
import axios from 'axios'
import { NavLink } from 'react-router-dom';

const HomeComponent = ({view}) => {

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
    const height = screenSize.height-57-175-59-400

    //fonction pour recupéré les hotel
    const [hotels, setHotels] = useState([])
    useEffect(()=>{
      axios
      .get('https://pixelevent.site/api/lieus')
      .then(res => setHotels(res.data['hydra:member']));
    },[])

    //chemin d'accese au image sur le site
    const image = {
        uri: 'https://pixelevent.site/assets/uploads/figure/',
    };
    const imageHotel = {
        uri: 'https://pixelevent.site/assets/uploads/lieu/',
    };

    //fonction pour le slider des hotel
    function prev(){
    document.getElementById('slider-container').scrollLeft -= 270;
    }
    function next(){
        document.getElementById('slider-container').scrollLeft += 270;
    }

    return (
        <div>
            <header style={{backgroundImage:`url(${image.uri}${view.headerImage.name})`}} className='centerImage'>
                <h1 className='text-center titlePage'>NationSound</h1>
            </header>
            <main className='text-center' style={{minHeight: height}}>
                <h5 className='text-center text-white container pt-4'>{view.headerText}</h5>
                {view && 
                    view.pageSections.map((section, index)=>{
                        return(
                            <article key={index} className='py-4 text-white'>
                                {section.display === 'style1' &&
                                    <div>
                                        <h2 className='text-center h1 fw-bold'>{section.title}</h2>
                                        <p className='text-center container'>{section.content}</p>
                                        {section.images[0] &&
                                            <div key={index} style={{backgroundImage:`url(${image.uri}${section.images[0].name})`}} className='container centerImage rounded'></div>
                                        }
                                        
                                    </div>
                                }
                                {section.display === 'style2' &&
                                    <div key={index} style={{backgroundImage:`url(${image.uri}${section.images[0].name})`}} className='centerImage rounded d-flex flex-column justify-content-evenly'>
                                        <h2 className='text-center h1 fw-bold '>{section.title}</h2>
                                        <p className='text-center container '>{section.content}</p>
                                        <div>
                                            {section.title === 'Explorez le site' && <NavLink className='btn btn-primary m-3' to='/map'>Carte</NavLink>}
                                        </div>
                                    </div>
                                }
                                {section.display === 'style3' &&
                                    <div>
                                        <h2 className='text-center h1 fw-bold'>{section.title}</h2>
                                        <p className='text-center container'>{section.content}</p>
                                        <div className='container d-xl-flex'>
                                            {section.images && 
                                                section.images.map((img, index)=>{
                                                    return(
                                                        <div key={index} style={{backgroundImage:`url(${image.uri}${img.name})`}} className='container carrouselImage centerImage rounded'></div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                                    {section.title === 'Hotel' &&
                                        <div className='container'>
                                            <div id="slider-container" className="slider d-flex">
                                                <div onClick={prev} className="control-prev-btn">
                                                    <i className="fas fa-arrow-left"></i>
                                                </div>
                                                {hotels
                                                    .filter(hotels => hotels.category === 'Hotel')
                                                    .map((hotel, index)=>{
                                                        return(
                                                            <div href='accueil' className='slide rounded text-center mx-xl-4 d-flex flex-column justify-content-end text-decoration-none hotelImage' key={index} style={{backgroundImage:`url(${imageHotel.uri}${hotel.featuredImage})`}}>
                                                                <p className='h5 fw-bold text-white text-center pb-3 mx-auto'>{hotel.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                <div onClick={next} className="control-next-btn">
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </div>
                                            <div className="overlay"></div>
                                        </div>
                                    }
                                <div className='mx-auto'>
                                    {section.title === 'Programme' && <NavLink className='btn btn-primary m-3' to='/programme'>Programme</NavLink>}
                                    {section.title === 'Nos remerciement' && <NavLink className='btn btn-primary m-3' to='/sponsor'>Sponsor</NavLink>}
                                </div>
                            </article>
                        )
                    })
                }
            </main>
        </div>
        
    );
};
export default HomeComponent;
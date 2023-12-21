import { Component, useEffect, useState } from 'react';
import React from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const MapComponent = () => {

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
    
    //variable qui permet de voir si la page en chargement
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
    })

    //variable qui contient les lieux en provenance de l'api
    const [lieux, setLieux] = useState([])

    useEffect(()=>{
        axios
            .get('https://pixelevent.site/api/lieus')
            .then(res=>setLieux(res.data['hydra:member']))
    },[])

    //variable qui comptient le marker sur lequelle l'utilisateur a cliquer
    const [activeMarker, setActiveMarker] = useState(null)
    //fonction pour ouvrir la description et centré et sur marker que l'utilisateur a cliquer
    const handleActiveMarker = (marker, lieu) => {
        if (marker === activeMarker) {
            return;
        }
        setLat(Number(lieu.GPSPtLat))
        setLng(Number(lieu.GPSPtLng))
        setActiveMarker(marker)
        setShowEntrer(false)
        setZoom(17)
    }
    //fonction pour fermer la description du marker
    const close = () => {
        setActiveMarker(null)
    }

    //variable qui ouvre l'entrer
    const[showEntrer, setShowEntrer] = useState(false);
    const handleShowEntrer = () => {
        setShowEntrer(!showEntrer)
        setActiveMarker(null)
    }

    //variable qui comptient le chemin d"acces aux image des lieux
    const img = {
        url: 'https://pixelevent.site/assets/uploads/lieu/'
    }

    //Variable qui comptient les coordoné de base
    const [lat, setLat] = useState(43.63373967273727)
    const [lng, setLng] = useState(3.8393621919977496)
    const [zoom, setZoom] = useState(14)
    const dimention ={
        style: {
            height:screenSize.height-57-175-59, width:'100%'
        }
    }
    
    // On map les lieux pour récupéré les catégories.
    const allMapCategories = lieux.map((x)=>x.category)
    // On trie les catégories, pour eleminer les doublons
    const selectCategories = allMapCategories.filter((x, i) => allMapCategories.indexOf(x) === i);

    // var pour les input de type radio
    const [selectedRadio, setSelectedRadio] = useState(null);
    console.log(selectedRadio);
    const resetCoord = () => {
        setLat(43.63373967273727)
        setLng(3.8393621919977496)
    }

    // var pour géré les filtres
    const [openFilter, setOpenFilter] = useState(false)
    const handleOpenFilter = () => {
        setOpenFilter(!openFilter)
        setZoom(14)
    }
    const réinitailisedFiltre = () => {
        setSelectedRadio(null)
        resetCoord()
        setZoom(14)
    }

    return (
        <div className='d-flex justify-content-center align-items-center doc'>
            {isLoaded ?
                <GoogleMap
                center={{lat: lat, lng: lng}} zoom={zoom} mapContainerStyle={dimention.style}
                >
                    <div style={{position:'absolute', marginTop:55, right:7 , transform:'translateX(-5%)'}} className='d-flex'>
                        <div className='px-3 btn btn-sm border' style={{backgroundColor:'white'}} onClick={handleOpenFilter}>
                            <p className='fs-5 mb-0 text-black'>Filtres </p>
                        </div>
                        {selectedRadio !== null && 
                            <div className='px-3 btn btn-sm border' style={{backgroundColor:'white'}} onClick={réinitailisedFiltre}>
                                <p className='fs-5 mb-0 text-black'>Réinitialisé</p>
                            </div>
                        }
                    </div>
                    
                    {openFilter && 
                        <div style={{position:'absolute', marginTop:100, right:7}} className='d-flex flex-column'>
                            {selectCategories.map((category, index)=>{
                                return(
                                    <div key={index} className='btn btn-sm mx-1 py-0 mb-1 border' style={{backgroundColor:'white'}} onClick={() => {setSelectedRadio(category), resetCoord(), handleOpenFilter()}}>
                                        <p className='fs-5 mb-1 text-black'>{category}</p>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    
                    <MarkerF 
                        position={{lat: 43.63156, lng:3.84155}} 
                        icon={{url:'https://pixelevent.site/assets/image/logo.jpg', scaledSize:{width:40, height:40}}}
                        onClick={handleShowEntrer}
                    >
                        {showEntrer && 
                            <div className='rounded' style={{position:'absolute', backgroundColor:'blue', bottom:20, left:20, width:320, height:'10%' }}>
                                <div className='d-flex flex-column justify-content-between'>
                                    <div className='d-flex flex-column justify-content-end'>
                                        <h3 className='mx-auto my-1'>Entrer</h3>
                                        <button className='btn btn-warning'>
                                            ouvrir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </MarkerF>

                    {lieux ?
                        lieux
                        .filter(lieu => lieu.category === selectedRadio)
                        .map((lieu)=>{
                            return(
                                <MarkerF 
                                    key={lieu.id}
                                    position={{lat: Number(lieu.GPSPtLat), lng: Number(lieu.GPSPtLng)}} 
                                    icon={{url:`${img.url}${lieu.featuredImage}`, scaledSize:{width:40, height:40}}} 
                                    onClick={()=>{handleActiveMarker(lieu.id, lieu)}}
                                >
                                    {activeMarker === lieu.id && 
                                        <NavLink to={`/lieu/${lieu.id}`} style={{width:320, height:'25%', backgroundColor:'white', position:"absolute", bottom:20, left:20}} className='rounded d-flex flex-column justify-content-between text-decoration-none text-black'>
                                            <div style={{backgroundImage:`url(${img.url}${lieu.featuredImage})`, height:'50%'}} className='center rounded text-end'>
                                                <button type="button" className="btn-close m-1 " aria-label="Close" onClick={close}></button>
                                            </div>
                                            <div className='d-flex flex-column justify-content-end'>
                                                <h3 className='mx-auto mb-3'>{lieu.name}</h3>
                                                <button className='btn btn-warning'>
                                                    ouvrir
                                                </button>
                                            </div>
                                        </NavLink>
                                    }
                                </MarkerF>
                            )
                        }) :''
                    }
                    
                </GoogleMap>
                :''    
            }
        </div>
    );
};

export default MapComponent;
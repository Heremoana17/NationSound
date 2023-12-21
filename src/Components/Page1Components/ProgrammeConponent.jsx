import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ArtisteCards from '../SubComponent/ProgrammeArtisteCards';
import ProgrammeUl from '../SubComponent/ProgrammeUl';
import ProgrammeListeArtiste from '../SubComponent/ProgrameListeArtiste';

const ProgrammeConponent = ({view, state, height}) => {

    const[days, setDays] = useState([])
    const[scenes, setScenes] = useState([])
    const[artistes, setArtistes] = useState([])
    const[programme, setProgramme] = useState()
    

    useEffect(()=>{
        axios
            .get('https://pixelevent.site/api/days')
            .then(res => setDays(res.data['hydra:member']))
        axios
            .get('https://pixelevent.site/api/lieus')
            .then(res=> setScenes(res.data['hydra:member']))
        axios
            .get('https://pixelevent.site/api/artistes')
            .then(res=> setArtistes(res.data['hydra:member']))
        axios
            .get('https://pixelevent.site/api/programmes/1')
            .then(res=> setProgramme(res.data))
    },[])

    const figure = {
        uri: 'https://pixelevent.site/assets/uploads/figure/',
    };

    //Variable qui filtre et trie pour récupéré les nom des scene
    const allMapScenes = scenes.filter(scene => scene.category ==="Scene").map(x=>x.name)
    //Variable qui contient uniquement les nom des artistes
    const artisteNames = artistes.map(x=>x.name)

    const[dayFilter, setDayFilter] = useState(null)

    const[sceneFilter, setSceneFilter] = useState(null)

    const[artisteFiltre, setArtisteFiltre] = useState(null)

    return (
        <div >
            <header style={{backgroundImage:`url(${figure.uri}${view.headerImage.name})`}} className='centerImage'>
                <h1 className='text-center titlePage'>{view.name}</h1>
            </header>
            <main className='text-white' style={{minHeight: height}}>
                {state === 'loading' && 
                    <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
                <h5 className='py-4 text-center container'>{view.headerText}</h5>
                <div className='d-flex justify-content-center container'>
                    <h2>Nation Sound</h2>
                </div>
                <div className='d-flex justify-content-center pt-2 '>
                    <div className="btn-group " role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={()=>setDayFilter(null)}/>
                        <label className="btn btn-outline-light" htmlFor="btnradio1">Voir tous</label>
                        {days &&
                            days.map((day, index)=>{
                                return(
                                    <div key={index} className='btn-group' onClick={()=>setDayFilter(day.name)}>
                                        <input type="radio" className="btn-check" name="btnradio" id={day.id} autoComplete="off"/>
                                        <label className="btn btn-outline-light" htmlFor={day.id}>{day.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {programme ?
                    dayFilter === null ?
                    programme.day
                        .map((day, index)=>{
                            return(
                                <div key={index} className='mt-3 p-4 container'>
                                    <div className='pb-2 ps-0 container d-flex justify-content-between'>
                                        <h2>{day.name}</h2>
                                        <ProgrammeUl allMapScenes={allMapScenes} sceneFilter={sceneFilter} setSceneFilter={setSceneFilter} artisteNames={artisteNames} artisteFiltre={artisteFiltre} setArtisteFiltre={setArtisteFiltre}/>
                                    </div>
                                    <hr className='container my-0'/>
                                    <section>
                                        {allMapScenes &&
                                            sceneFilter ?
                                            allMapScenes
                                                .filter(scene => scene === sceneFilter)
                                                .map((scene, index)=>{
                                                    return(
                                                        <section key={index}>
                                                            <h4 className='mt-3'>{scene}</h4>
                                                            <ProgrammeListeArtiste artisteFiltre={artisteFiltre} day={day} scene={scene}/>
                                                        </section>
                                                    )
                                                })
                                            :
                                            allMapScenes
                                                .map((scene, index)=>{
                                                    return(
                                                        <section key={index}>
                                                            <h4 className='mt-3'>{scene}</h4>
                                                            <ProgrammeListeArtiste artisteFiltre={artisteFiltre} day={day} scene={scene}/>
                                                        </section>
                                                    )
                                                }) 
                                        }
                                    </section>
                                </div>
                            )
                        })
                    :
                    programme.day
                        .filter(day => day.name === dayFilter)
                        .map((day, index)=>{
                            return(
                                <div key={index} className='mt-3 p-4 container'>
                                    <div className='pb-2 ps-0 container d-flex justify-content-between'>
                                        <h2>{day.name}</h2>
                                        <ProgrammeUl allMapScenes={allMapScenes} sceneFilter={sceneFilter} setSceneFilter={setSceneFilter} artisteNames={artisteNames} artisteFiltre={artisteFiltre} setArtisteFiltre={setArtisteFiltre}/>
                                    </div>
                                    <hr className='container my-0'/>
                                    <section>
                                        {allMapScenes &&
                                            sceneFilter ?
                                            allMapScenes
                                                .filter(scene => scene === sceneFilter)
                                                .map((scene, index)=>{
                                                    return(
                                                        <section key={index}>
                                                            <h4 className='mt-3'>{scene}</h4>
                                                            <ProgrammeListeArtiste artisteFiltre={artisteFiltre} day={day} scene={scene}/>
                                                        </section>
                                                    )
                                                })
                                            :
                                            allMapScenes
                                                .map((scene, index)=>{
                                                    return(
                                                        <section key={index}>
                                                            <h4 className='mt-3'>{scene}</h4>
                                                            <ProgrammeListeArtiste artisteFiltre={artisteFiltre} day={day} scene={scene}/>
                                                        </section>
                                                    )
                                                }) 
                                        }
                                    </section>
                                </div>
                            )
                        })
                    : ''
                }
            </main>
        </div>
    );
};

export default ProgrammeConponent;
import React from 'react';
import ProgrammeArtisteCards from './ProgrammeArtisteCards';

const ProgrameListeArtiste = ({artisteFiltre, day, scene}) => {
    return (
        <div className='d-flex justify-content-between scrollx'>
            {artisteFiltre === null ?
                day.episode
                .filter(episode => episode.lieu.name === scene)
                .map((episode, index)=>{
                    return(
                        <ProgrammeArtisteCards episode={episode} key={index}/>
                    )
                })
                :
                day.episode
                    .filter(episode => episode.artiste.name === artisteFiltre)
                    .filter(episode => episode.lieu.name === scene)
                    .map((episode, index)=>{
                    return(
                        <ProgrammeArtisteCards episode={episode} key={index}/>
                    )
                })
            }
        </div>
        
    );
};

export default ProgrameListeArtiste;
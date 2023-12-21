import moment from 'moment';
import React from 'react';
import { NavLink } from 'react-router-dom';

const ProgrammeArtisteCards = ({episode}) => {
    const artistImg = {
        uri: 'https://pixelevent.site/assets/uploads/artiste/',
    };
    return (
        <NavLink style={{backgroundImage:`url(${artistImg.uri}${episode.artiste.featuredImage})`}}  className='carrouselImage centerImage rounded d-flex flex-column align-items-center justify-content-end text-decoration-none text-white' to={`/episode/${episode.id}`}>
            <h4>{episode.artiste.name}</h4>
            <h4>{moment(episode.hour).format('H:mm')}</h4>
        </NavLink>
    );
};

export default ProgrammeArtisteCards;
import moment from 'moment';
import React from 'react';
import { NavLink } from 'react-router-dom';

const EpisodeArtisteCards = ({episode}) => {
    const lieu = {
        uri: 'https://pixelevent.site/assets/uploads/lieu/',
    };
    console.log(episode);
    return (
        <NavLink style={{backgroundImage:`url(${lieu.uri}${episode.lieu.featuredImage})`}} className='carrouselImage centerImage rounded d-flex flex-column align-items-center justify-content-end text-decoration-none text-white scrollx' to={`/episode/${episode.id}`}>
            <h4>{episode.day.name}</h4>
            <h4>{episode.lieu.name}</h4>
            <h4>{moment(episode.hour).format('H:mm')}</h4>
        </NavLink>
    );
};

export default EpisodeArtisteCards;
import { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import HomeComponent from '../Components/HomeComponent';

const Home = () => {

	//on recupère les donnés du fetch
	const view = useLoaderData()

	//on recupère la propriété state du fetch
	const {state} = useNavigation()

    return (
        <div className='backgroundColor'> 
			<Navigation/>
            <HomeComponent view={view}/>
            <Footer/>
        </div>
    );
};

export default Home;
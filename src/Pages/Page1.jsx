import React, {useEffect, useState} from 'react';
import Navigation from '../Components/Navigation';
import Billetterie from '../Components/Page1Components/BilletterieComponent';
import AboutComponent from '../Components/Page1Components/AboutComponent';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Footer from '../Components/Footer';
import ProgrammeConponent from '../Components/Page1Components/ProgrammeConponent';
import ActualiteComponent from '../Components/Page1Components/ActualiteComponent';
import SponsorComponent from '../Components/Page1Components/SponsorComponent';
import MapComponent from '../Components/Page1Components/MapComponent';
import ArtisteComponent from '../Components/Page1Components/ArtisteComponent';


const Page1 = ({billetterie, about, programme, artiste, actualite, sponsor, map}) => {

    const view = useLoaderData()

    //on recupère la propriété state du fetch
	const {state} = useNavigation()

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

    return (
        <div className='backgroundColor'>
            <Navigation/>
            {billetterie && <Billetterie height={height}/>}
            {about && <AboutComponent view={view} height={height}/>}
            {programme && <ProgrammeConponent view={view} state={state} height={height}/>}
            {artiste && <ArtisteComponent state={state} height={height}/>}
            {sponsor && <SponsorComponent view={view} state={state} height={height}/>}
            {actualite && <ActualiteComponent view={view} state={state} height={height}/>}
            {map && <MapComponent view={view} state={state} height={height}/>}
            <Footer/>
        </div>
    );
};

export default Page1;
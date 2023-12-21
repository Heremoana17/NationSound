import Navigation from '../Components/Navigation';
import {useParams} from 'react-router-dom'
import ArticleComponent from '../Components/Page2Components/ArticleComponent';
import Footer from '../Components/Footer';
import EpisodeComponent from '../Components/Page2Components/EpisodeComponent';
import LieuComponent from '../Components/Page2Components/LieuComponent';
import ArticleWpComponent from '../Components/Page2Components/ArticleWpComponent';
import ArtisteDetails from '../Components/Page2Components/ArtisteDetails';
import { useEffect, useState } from 'react';

const Page2 = ({artiste, article, articlewp, episode, lieu}) => {
    let { id } = useParams();

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
    const height = screenSize.height-57-175-70

    return (
        <div className='doc backgroundColor'>
            <Navigation/>
            {artiste && <ArtisteDetails id={id} height={height}/>}
            {article && <ArticleComponent id={id}/>}
            {articlewp && <ArticleWpComponent id={id}/>}
            {episode && <EpisodeComponent id={id}/>}
            {lieu && <LieuComponent id={id}/>}
            <Footer/>
        </div>
    );
};

export default Page2;
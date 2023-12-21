import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ArticleCards from '../SubComponent/ArticleCards';

const ArticleWpComonent = () => {
    const [articles, setArticles] = useState([])
    useEffect(()=>{
        axios
            .get('https://backoffice.pixelevent.site/wp-json/wp/v2/posts?_embed')
            .then(res => setArticles(res.data))

    },[])
    // On map les articles pour récupéré leurs catégories.
    var allMapCategories = articles.map((article)=>article._embedded['wp:term'][0][0]).map((cate)=>cate.name)

    // On trie les catégories, pour eleminer les doublons
    const selectCategories = allMapCategories.filter((x, i) => allMapCategories.indexOf(x) === i);

    // console.log(articles[0]._embedded['wp:featuredmedia'][0].link);
    const test = articles.map((article)=>article._embedded['wp:term'][0][0]).map((cate)=>cate.name)
    console.log(test);

    //variable qui comptient le filtre
    const [filter, setFilter] = useState(null)

    //Fonctions pour filtrées les articles
    const [nombreArticle, setNombreArticle] = useState(3);
    const tousAfficher = () => {
        setNombreArticle(articles.length);
    };

    return (
        <div className='container'>
            {nombreArticle === 3 ?
                <button className="btn text-white fs-5 ps-0" onClick={tousAfficher}>
                    Tous afficher
                </button>
                :
                <button type="button" className="btn text-white fs-5 ps-0" onClick={()=>setNombreArticle(3)}>
                    Revenir
                </button>
            }
            <button type="button" className="btn dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
                Category
            </button>
            <ul className="dropdown-menu ">
                {selectCategories && 
                    selectCategories.map((category, index)=>{
                        return(
                            <li key={index} onClick={()=>setFilter(category)}><button className="dropdown-item" type="button">{category}</button></li>
                        )
                    })    
                }
            </ul>
            {filter && 
            <button type="button" className="btn text-white" onClick={()=>setFilter(null)}>
                Réinitialisé
            </button>
            }
            {filter === null ?
                articles &&
                    articles
                        .map((article, index)=>{
                            return(
                                <ArticleCards key={index} article={article} channel={'backoffice'}/>
                            )
                        })
                :
                articles &&
                    articles
                        .filter(article => article._embedded['wp:term'][0][0].name === filter)
                        .map((article, index)=>{
                            return(
                                <ArticleCards key={index} article={article} channel={'backoffice'}/>
                            )
                        })
            }
        </div>
    );
};

export default ArticleWpComonent;
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ArticleCards from '../SubComponent/ArticleCards';
import ArticleWpComonent from '../Page2Components/ArticleWpComonent';

const ActualiteComponent = ({view, state, height}) => {

    //variable qui determine le canal de recupération des articles
    const [channel, setChannel] = useState('backoffice')

    //fonction par defaut au chargement de la page pour récupéré les articles de pixelevent
    const [articles, setArticles] = useState([]);
    const [faqs, setFaqs] = useState([]);
    useEffect(()=>{
        if (channel === 'pixelevent') {
            axios
            .get('https://pixelevent.site/api/articles')
            .then(res => setArticles(res.data['hydra:member']));
        }
        axios
        .get('https://pixelevent.site/api/f_a_qs')
        .then(res => setFaqs(res.data['hydra:member']))

    },[channel])

    const figure = {
        uri: 'https://pixelevent.site/assets/uploads/figure/',
    };

    // On map les articles pour récupéré leurs catégories.
    var allMapCategories = articles.map((article)=>article.categories.name)
    // On trie les catégories, pour eleminer les doublons
    const selectCategories = allMapCategories.filter((x, i) => allMapCategories.indexOf(x) === i);

    const changeChannel = () => {
        if (channel === 'pixelevent') {
            setChannel('backoffice')
        }
        if (channel === 'backoffice') {
        axios
            .get('https://pixelevent.site/api/articles')
            .then(res => setArticles(res.data['hydra:member'], 
            setChannel('pixelevent')));
        }
    }

    //variable qui comptient le filtre
    const [filter, setFilter] = useState(null)

    //Fonctions pour filtrées les articles
    const [nombreArticle, setNombreArticle] = useState(3);
    const tousAfficher = () => {
        setNombreArticle(articles.length);
    };

    return (
        <div>
            <header style={{backgroundImage:`url(${figure.uri}${view.headerImage.name})`}} className='centerImage'>
                <h1 className='text-center titlePage'>{view.name}</h1>
            </header>
            <main style={{minHeight: height}}>
                {state === 'loading' && 
                    <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
                <h5 className='text-center text-white container py-4'>{view.headerText}</h5>
                <section>
                    
                    <article className='text-white py-4'>
                        <div className='pb-2 container'>
                            <div className='d-flex justify-content-between mb-1'>
                                <h2>Actualité</h2>
                                <button className='btn btn-primary' onClick={changeChannel}><i className="fa-solid fa-rotate"></i></button>
                            </div>
                            <hr className='container my-0'/>
                        </div>
                        {channel==='pixelevent' &&
                            <div className="container mb-3">
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
                                            .slice(0, nombreArticle)
                                            .map((article, index)=>{
                                                return(
                                                    <ArticleCards key={index} article={article} channel={channel}/>
                                                )
                                            })
                                    : 
                                    articles &&
                                        articles
                                            .filter(article => article.categories.name === filter)
                                            .slice(0, nombreArticle)
                                            .map((article, index)=>{
                                                return(
                                                    <ArticleCards key={index} article={article} channel={channel}/>
                                                )
                                            })
                                }
                            </div>
                        }
                        {channel==='backoffice' &&
                            <ArticleWpComonent/>
                        }
                    </article>
                </section>
                
                <section>
                    <article className='text-white py-4'>
                        <h2 className='container'>FAQ</h2>
                        {faqs &&
                            faqs.map((faq, index)=>{
                                return(
                                    <div key={index} className='container border rounded my-3'>
                                        <div className='text-center py-3'>
                                            <h3 className='h2'>{faq.question}</h3>
                                        </div>
                                        <hr className='mt-0'/>
                                        <div className='pb-3'>
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                    
                                )
                            })
                        }
                    </article>
                </section>
            </main>
        </div>
    );
};

export default ActualiteComponent;
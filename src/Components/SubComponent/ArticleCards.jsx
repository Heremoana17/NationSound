import React from 'react';
import { NavLink } from 'react-router-dom';

const ArticleCards = ({article, channel}) => {

    const imageArticle = {
        uri: 'https://pixelevent.site/assets/uploads/articles/',
    };
    return (
        <>
            {channel === 'pixelevent' ?
                (<NavLink className='d-flex container text-decoration-none text-white' to={`/article/${article.id}`}>
                    <div style={{backgroundImage:`url(${imageArticle.uri}${article.featuredImage})`}} className='imgArticle centerImage rounded col-3'>
                    </div>
                    <div>
                        <h3 className='ps-3 mb-3 pt-2 h2 titleArticle'>{article.title}</h3>
                        <p className='contentArticle px-3'>{article.introduction}</p>
                        <p className='ps-3'>Category : {article.categories.name}</p>
                    </div>
                </NavLink>):''
            }
            {channel === 'backoffice' ?
                (<NavLink className='d-flex container text-decoration-none text-white' to={`/article/wp/${article.id}`}>
                    {article._embedded &&
                        article._embedded['wp:featuredmedia'] ?
                        (<div style={{backgroundImage:`url(${article._embedded['wp:featuredmedia'][0].source_url})`}} className='imgArticle centerImage rounded col-3'>
                        </div>)
                        :
                        (<div className='imgArticle centerImage rounded col-3'></div>)
                    }
                    <article>
                        <h3 className='ps-3 mb-3 pt-2 h2 titleArticle' dangerouslySetInnerHTML={{__html:article.title.rendered}}></h3>
                        {article.excerpt && 
                            <p className='contentArticle px-3' dangerouslySetInnerHTML={{__html:article.excerpt.rendered}}></p>
                        }
                        {article._embedded && 
                            <p className='contentArticle px-3'>Cetegory : <span dangerouslySetInnerHTML={{__html:article._embedded['wp:term'][0][0].name}}></span></p>
                        }
                    </article>
                </NavLink>):''
            }
        </>
    );
};

export default ArticleCards;
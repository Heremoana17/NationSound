import React from 'react';
import logo from '../Assets/Image/logo.jpg';
import snapchat_logo from '../Assets/Image/logo.jpg';
import youtube_logo from '../Assets/Image/youtube_logo.png';
import twitter_logo from '../Assets/Image/twitter_logo.png';
import linkedin_logo from '../Assets/Image/linkedin_logo.png';
import facebook_logo from '../Assets/Image/facebook_logo.png';
import instagram_logo from '../Assets/Image/instagram_logo.png';

const Footer = () => {
    return (
        <>
            <section id='footer'>
            <div className='container d-flex align-items-baseline px-2 pt-3'>
                <img src={logo} id='logoFooter' className='rounded' alt="img"/>
                <h1>NationSound</h1>
            </div>
            <div className='container d-flex flex-wrap align-items-baseline px-2 pb-3'>
                <img src={facebook_logo} className='reaseauFooter rounded-circle m-2' alt="img"/>
                <img src={instagram_logo} className='reaseauFooter rounded-circle m-2' alt="img"/>
                <img src={snapchat_logo} className='reaseauFooter rounded-circle m-2' alt="img"/>
                <img src={linkedin_logo} className='reaseauFooter rounded-circle m-2' alt="img"/>
                <img src={twitter_logo} className='reaseauFooter rounded-circle m-2' alt="img"/>
                <img src={youtube_logo} className='reaseauFooter rounded-circle m-2' alt="img"/>
            </div>
            </section>
            <div>
                <h5 className='text-center my-2 pt-2' id='downFooter' >&copy; - Nation Sounds - 2022</h5>
            </div>
        </>
    );
};

export default Footer;
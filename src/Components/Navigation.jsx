import { NavLink, Outlet } from 'react-router-dom';
import logo from '../Assets/Image/logo.jpg'

const Navigation = () => {
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to='/'>
                        <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top me-3"></img>
                        Nation Sound
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/actualite'>Actualité</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Programme
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to='/programme'>Programme</NavLink></li>
                                <li><NavLink className="dropdown-item" to='/artiste'>Artiste</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/billetterie'>Billetterie</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/sponsor'>Sponsors</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/about'>A-propos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/map'>map</NavLink>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Navigation;
import React from 'react';
import { useRouteError } from 'react-router-dom';

const PageError = () => {
    const error = useRouteError()
    
    return (
        <div>
            <h1>Une erreur est survenut</h1>
            <p>{error?.error?.toString() ?? error?.toString()}</p>
        </div>
    );
};

export default PageError;
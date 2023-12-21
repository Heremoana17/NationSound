import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TestComp = () => {
    const [oui, setOui] = useState([])
    useEffect(()=>{
        axios
        .get('https://pixelevent.site/api/views')
        .then(res=>setOui(res.data))
    },[]);
    console.log(oui);
    return (
        <div>
            <h2>1</h2>
            {oui &&
            oui.map((o)=>{
                return(
                    <h2 key={o.id}>{o.name}</h2>
                )
            })}
            <h2>2</h2>
        </div>
    );
};

export default TestComp;
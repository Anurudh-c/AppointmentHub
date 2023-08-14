import React, { useEffect, useState } from 'react';

    const HelloWorldComponent = () => {
        const [helloMessage, setHelloMessage] = useState('');

        useEffect(() => {
             fetch('http://127.0.0.1:8000/hello/')
             .then((response) => response.json())
             .then((data) => setHelloMessage(data.message))
             .catch((error) => console.log(error));
        }, []);

        return (
           <div className="flex justify-center mt-40">           
           <h1 className='text-5xl' >{helloMessage}</h1></div>
              
    );
    };
export default HelloWorldComponent;

import React, { useEffect, useState } from 'react'

const ViewPort = () => {

    const [viewport, setViewPort] = useState(window.innerWidth)

    useEffect(() => {
        const updateViewPort = () => setViewPort(window.innerWidth)
        window.addEventListener('resize', updateViewPort)
        return () => window.removeEventListener('resize', updateViewPort)
    }, [])

    return (
        <div className='absolute bottom-0 m-4 bg-blue-600 p-3 rounded-2xl text-white font-black text-xl'>
            {
                viewport
            }
        </div>
    );
};

export default ViewPort;
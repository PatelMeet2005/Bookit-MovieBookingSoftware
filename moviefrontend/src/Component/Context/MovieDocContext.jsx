import React, { createContext, useState } from 'react';

export const MovieDocContext = createContext();

export const MovieProvider = ({children}) => {
    const [movieDocData, setMovieDocData] = useState({
        moviedate: '',
        selectTheatre: '',
        selectshow: '',
        movieName: '',
        releaseDate: '',
        actor: '',
        actress: '',
        description: '',
        img: '', 


    });

    return (
        <MovieDocContext.Provider value={{ movieDocData, setMovieDocData }}>
            {children}
        </MovieDocContext.Provider>
    );
}


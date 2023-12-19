// src/pages/details/[id].tsx

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import { fetchDetailsData } from '../api/apiCaller';
import { Details } from '@/interfaces';
import MovieDetails from '@/components/MovieDetails';
import CastComponent from '@/components/CastComponent';
import CommentComponent from '@/components/CommentComponent';

const Details = () => {
    const router = useRouter();
    const { id } = router.query;
    const movieId = typeof id === 'string' ? parseInt(id, 10) : 0;
    const [moviesData, setMoviesData] = useState<Details | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof id === 'string') {
                    const result = await fetchDetailsData(id);
                    setMoviesData(result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <Header />
            <MovieDetails moviesData={moviesData} />
            <div className='md:flex-row flex-col'>
                {moviesData?.movie.cast && <CastComponent casts={moviesData.movie.cast} />}
            </div>
            <div>
                <CommentComponent movieId={movieId}/>
            </div>
        </div>
    );
};

export default Details;
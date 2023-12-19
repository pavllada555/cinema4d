// src/pages/[genre].tsx

import React, {useEffect, useState} from 'react';
import { useRouter} from 'next/router';
import Header from '@/components/Header';
import { fetchGenresData } from './api/apiCaller';
import MovieCard from '@/components/MovieCard';
import { MoviesData } from '@/interfaces';
import PaginationButtons from '@/components/PaginationButtons';

const GenrePage = () => {
  const router = useRouter();
  const { genre, page } = router.query;
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [moviesData, setMoviesData] = useState<MoviesData | null>(null);
  console.log(page)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof genre === 'string') {
          const result = await fetchGenresData(genre, typeof page === 'string' ? page : undefined);
          setMoviesData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setCurrentPage(page ? parseInt(Array.isArray(page) ? page[0] : page, 10) : 1);
  }, [genre, page]);

  return (
    <div>
    <Header />
      {moviesData && (
        <div>
          <div className="flex flex-wrap justify-center">
            {moviesData.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center pb-8">
          <PaginationButtons totalPages={totalPages} currentPage={currentPage} genre={genre}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenrePage;

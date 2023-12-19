// src/pages/index.tsx

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { fetchHomepageData } from '@/pages/api/apiCaller';
import MovieCard from '@/components/MovieCard';
import { MoviesData } from '@/interfaces';
import { useRouter } from 'next/router';
import PaginationButtons from '@/components/PaginationButtons';

const Home = () => {
  const [moviesData, setMoviesData] = useState<MoviesData | null>(null);
  const totalPages = 50;
  const router = useRouter();
  const { page } = router.query;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchHomepageData(Array.isArray(page) ? page[0] : page);
        setMoviesData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    setCurrentPage(page ? parseInt(Array.isArray(page) ? page[0] : page, 10) : 1);
  }, [page]);

  return (
    <div className="">
      <Header />
      {moviesData && (
        <div>
          <div className="flex flex-wrap justify-center">
            {moviesData.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center pb-8">
          <PaginationButtons totalPages={totalPages} currentPage={currentPage} genre=''/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

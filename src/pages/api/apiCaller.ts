// src/pages/api/apiCaller.ts
import { ApiResponse } from "@/interfaces";

export async function fetchHomepageData(page:string='1') {
  const url = `https://yts.mx/api/v2/list_movies.json?page=${page}`
  let response: ApiResponse = await fetch(url).then((res) => res.json());
  const {status, data: {movies}} = response;
  // console.log(movies[0]);
  return {status, movies};
}

export async function fetchGenresData(genre: string, page:string='1') {
  const url = `https://yts.mx/api/v2/list_movies.json?genre=${genre}&page=${page}`;
  let response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error fetching data for genre ${genre}`);
  }

  let data = await response.json();
  const { status, data: { movies } } = data;
  console.log(movies[0]);
  return { status, movies };
}

export async function fetchDetailsData(id: string) {
  const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`;
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data for film with id=${id}`);
  }
  let data = await response.json();
  const { status, data: { movie } } = data;
  console.log(movie);
  return { status, movie };
}
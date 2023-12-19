export interface CastComponentProps {
    casts: Cast[];
}

export interface Cast {
    name: string;
    character_name: string;
    url_small_image: string;
}

export interface Details {
    status: string;
    movie: {
        id: number;
        title: string;
        year: number;
        rating: number;
        description_intro: string;
        genres: string[];
        cast: Cast[];
        medium_cover_image: string;
    }
}

export interface Movie {
    id: number;
    title: string;
    genres: string[];
    rating: number;
    background_image: string;
    medium_cover_image: string;
    year: number;
}

export interface MovieCardProps {
    movie: Movie;
}

export interface MoviesData {
    status: string;
    movies: Movie[];
}

export interface ApiResponse {
    status: string;
    data: {
        movies: any[];
    };
}

export interface CardProps {
    id: number;
    title: string;
    description: string;
    imgSrc: string;
    backgroundClass: string;
}

export interface MovieDetailsProps {
    moviesData: Details | null;
}

export interface Comment {
    id: number;
    username: string;
    text: string;
    movieId: number;
}

export interface NewComment {
    username: string;
    text: string;
    movieId: number;
}
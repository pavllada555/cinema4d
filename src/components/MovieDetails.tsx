import { MovieDetailsProps } from "@/interfaces";

const MovieDetails: React.FC<MovieDetailsProps> = ({ moviesData }) => {
  return (
    <div className="container mx-auto mt-10 flex flex-col lg:flex-row items-center">
      <div className="lg:flex-shrink-0 ml-12 mr-40 mb-6 lg:order-last">
        <img
          src={moviesData?.movie.medium_cover_image}
          alt={moviesData?.movie.title}
          className="w-80 h-100 object-cover rounded"
        />
      </div>
      <div className="flex-1 md:ml-40 ml-10 mr-20">
        <h1 className="font-bold text-xl mb-2">{moviesData?.movie.title}.</h1>
        <div className="mb-2">
          <span className="font-bold">Year: </span>
          {moviesData?.movie.year}.
        </div>
        <div className="mb-2">
          <span className="font-bold">Genres: </span>
          {moviesData?.movie.genres.length === 1
            ? moviesData?.movie.genres[0]
            : moviesData?.movie.genres.join(", ")}.
        </div>
        <div className="mb-2">
          <span className="font-bold">Rating: </span>
          {moviesData?.movie.rating}.
        </div>
        <div className="mb-2">
          <span className="font-bold">Description: </span>
          {moviesData?.movie.description_intro &&
          moviesData?.movie.description_intro.length > 0
            ? moviesData?.movie.description_intro
            : "No description in API."}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

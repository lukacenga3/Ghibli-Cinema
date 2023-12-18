import HeroSection from "./HeroSection/HeroSection";
import MoviesList from "./MoviesList/MoviesList";

export default function MainScreen({ movies, query, setQuery }) {
	return (
		<div className="">
			<HeroSection movies={movies} />
			<MoviesList movies={movies} query={query} setQuery={setQuery} />
		</div>
	);
}

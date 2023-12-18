import React from "react";
import MoviesList from "../components/MainScreen/MoviesList/MoviesList";
import { useLocalStorageState } from "./useLocalStorageState";

export default function FavoriteMovies() {
	const [favorites, setFavorites] = useLocalStorageState([], "favorites");
	console.log("favorites", favorites);

	return (
		<div className="favorites-container">
			<h1 className="fav-title">Your Favorites Movies:</h1>
			<MoviesList
				movies={favorites}
				query=""
				setQuery={() => {}}
				favorites={favorites}
				setFavorites={setFavorites}
			/>
		</div>
	);
}

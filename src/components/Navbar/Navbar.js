import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

export default function Navbar({ query, setQuery }) {
	return (
		<div className="navbar">
			<Logo />
			<Search query={query} setQuery={setQuery} />
			<Favorites />
		</div>
	);
}

function Logo() {
	const link = useNavigate();
	return (
		<div className="logo" onClick={() => link("/")}>
			<span role="img">🍿</span>
			<h1>Ghibli Cinema</h1>
		</div>
	);
}

function Search({ query, setQuery }) {
	const handleClear = () => {
		setQuery(""); // Clear the search query
	};
	return (
		<>
			<div className="search-container">
				<input
					className="search"
					type="text"
					placeholder="Search movies..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				{query && (
					<span className="clear-button" onClick={handleClear}>
						Clear
					</span>
				)}
			</div>
		</>
	);
}

function Favorites() {
	const navigate = useNavigate();
	const handleFavoriteMovies = (event) => {
		event.stopPropagation();

		navigate("/favoriteMovies");
	};

	return (
		<div
			className="favorites"
			onClick={(event) => handleFavoriteMovies(event)}
			component={Link}
			to="/favoriteMovies">
			<span>
				<FavoriteIcon fontSize="large" />
			</span>
		</div>
	);
}

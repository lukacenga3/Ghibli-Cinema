import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useLocalStorageState } from "../../../pages/useLocalStorageState";
import { Alert } from "@mui/material";
import ReservationForm from "../../../pages/ReservationForm";

// truncate card description
function truncateDescription(description, maxLength) {
	if (description.length <= maxLength) {
		return description;
	}
	return `${description.slice(0, maxLength)}...`;
}

// format time to hh:mm:ss
const formatRunningTime = (runningTimeInMinutes) => {
	const hours = Math.floor(runningTimeInMinutes / 60);
	const minutes = runningTimeInMinutes % 60;
	const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

	return formattedTime;
};

// main function MovieList
export default function MoviesList({ movies, query }) {
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
	const [favorites, setFavorites] = useLocalStorageState([], "favorites");
	const [isFormModalVisible, setIsFormModalVisible] = useState(false);
	const isFavoritePage = window.location.pathname === "/favoriteMovies";

	// handle set movie to favoriteMovies
	const handleFavoriteClick = (e, movie) => {
		e.stopPropagation();

		const isFavorite = favorites.find((favMovie) => favMovie.id === movie.id);

		if (!isFavorite) {
			setFavorites((prevFavorites) => [...prevFavorites, movie]);
			setShowAlert(true);

			setTimeout(() => {
				setShowAlert(false);
			}, 4000);
		} else {
			// Movie is already in favorites, show duplicate alert
			setShowDuplicateAlert(true);

			setTimeout(() => {
				setShowDuplicateAlert(false);
			}, 3000);
		}
	};

	// handle remove movie from favoriteMovies, not working...
	const handleRemoveFromFavorites = (e, movie) => {
		e.stopPropagation();

		setFavorites((prevFavorites) => {
			console.log("prevFavorites", prevFavorites);

			const filteredMovies = prevFavorites.filter((favMovie) => favMovie.id !== movie.id);

			console.log("filteredMovies", filteredMovies);

			return filteredMovies;
		});
	};

	const moviesSource = isFavoritePage ? favorites : movies;

	// handle search
	const filteredMovies = moviesSource.filter((movie) => {
		if (movie && movie.title && typeof query === "string") {
			return movie.title.toLowerCase().includes(query.toLowerCase());
		}
		return false;
	});

	return (
		<div className="main">
			<div className="hero-section">
				<div className="movie-grid">
					{filteredMovies.length > 0 ? (
						filteredMovies.map(
							(movie) =>
								movie && (
									<div className="hero-card" key={movie.id}>
										<div className="card-container">
											<div className="image-container">
												<div className="rt-score">{movie.rt_score / 10}</div>
												<div className="img">
													<img className="movie-image" src={movie.image} alt={movie.title} onClick={() => navigate(`/movie/${movie.id}`)} />
												</div>
											</div>
											<div className="body-container">
												<h2 className="movie-title">{movie.title}</h2>
												<h3>
													<p>{movie.original_title}</p>
												</h3>
												<p
													style={{
														fontSize: "1rem",
													}}
												>
													{truncateDescription(movie.description, 120)}
												</p>
												<p className="author">
													Movie by: {movie.director}, {movie.release_date}, {formatRunningTime(movie.running_time)}
												</p>
												<div className="fav">
													<p className="movie-price">{(movie.price = "700 ALL")}</p>
													{favorites.find((favMovie) => favMovie.id === movie.id) ? (
														isFavoritePage ? (
															<>
																<Button
																	key={movie.id}
																	className="reserve-ticket"
																	onClick={() => {
																		setIsFormModalVisible(true);
																	}}
																>
																	Reserve Ticket
																</Button>
																<Button
																	onClick={(e) => {
																		handleRemoveFromFavorites(e, movie);
																	}}
																>
																	<HeartBrokenIcon
																		fontSize="large"
																		style={{
																			color: "#6741D9",
																		}}
																	/>
																</Button>
															</>
														) : (
															<>
																<Button className="add-favorites" onClick={(e) => handleFavoriteClick(e, movie)}>
																	{/* Add to favorites */}
																	<FavoriteIcon
																		fontSize="large"
																		style={{
																			color: "#6741D9",
																		}}
																	/>
																</Button>
															</>
														)
													) : (
														<>
															<Button className="add-favorites" onClick={(e) => handleFavoriteClick(e, movie)}>
																{/* Add to favorites */}
																<FavoriteIcon
																	fontSize="large"
																	style={{
																		color: "#6741D9",
																	}}
																/>
															</Button>
														</>
													)}

													<ReservationForm displayModal={isFormModalVisible} showDisplayModal={setIsFormModalVisible} />
												</div>
											</div>
										</div>
									</div>
								)
						)
					) : (
						<div className="no-movies-message">⛔ No movies found</div>
					)}{" "}
					{showAlert && (
						<div className="alert-container">
							<Alert
								severity="success"
								onClose={() => setShowAlert(false)}
								sx={{
									position: "fixed",
									top: 80,
									right: 14,
									zIndex: 1001,
								}}
							>
								Movie {favorites.length > 0 ? "added to" : "removed from"} favorites!
							</Alert>
						</div>
					)}
					{showDuplicateAlert && (
						<div className="alert-container">
							<Alert
								severity="warning"
								onClose={() => setShowDuplicateAlert(false)}
								sx={{
									position: "fixed",
									top: 80,
									right: 14,
									zIndex: 1001,
								}}
							>
								Movie is already in favorites!
							</Alert>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

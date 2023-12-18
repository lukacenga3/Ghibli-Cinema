import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import axios from "axios";
import MainScreen from "./components/MainScreen/MainScreen";
import Footer from "./components/Footer/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { Route, Routes } from "react-router-dom";
import SingleMovie from "../src/pages/SingleMovie";
import FavoriteMovies from "./pages/FavoriteMovies";
import ReservationForm from "./pages/ReservationForm";
import ScrollToTop from "./pages/ScrollToTop";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState("");

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get("https://ghibliapi.vercel.app/films");
				setIsLoading(false);
				setMovies(response.data);
			} catch (error) {
				console.error("There was an error receiving data!", error);
			}
		};

		fetchMovies();
	}, []);

	return (
		<div className="App">
			{isLoading ? (
				<Backdrop open={isLoading}>
					<CircularProgress />
				</Backdrop>
			) : (
				<>
					<ScrollToTop />
					<Navbar query={query} setQuery={setQuery} />
					<Routes>
						<Route path="/" element={<MainScreen movies={movies} setQuery={setQuery} query={query} />} />
						<Route path="/movie/:id" element={<SingleMovie />} />
						<Route path="/favoriteMovies" element={<FavoriteMovies />} />
						<Route element={<ReservationForm />} />
					</Routes>

					<Footer />
				</>
			)}
		</div>
	);
}

export default App;

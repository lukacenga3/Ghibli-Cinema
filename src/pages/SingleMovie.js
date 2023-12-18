import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";

export default function SingleMovie() {
	const [singleMovie, setSingleMovie] = useState({});
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState(3);
	const [showCarousel, setShowCarousel] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		const fetchSingleMovie = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`https://ghibliapi.vercel.app/films/${id}`);

				setLoading(false);
				setSingleMovie(response.data);
			} catch (error) {
				console.error("There was an error receiving data!", error);
			}
		};

		fetchSingleMovie();
	}, [id]);

	return (
		<div className="main-wrapper">
			{" "}
			<div className="single-movie">
				<div className="single-movie-container">
					{
						<div className="card-info" key={id}>
							<h2 className="single-movie-title">{singleMovie.title}</h2>

							<div className="single-movie-banner">
								<img src={singleMovie.movie_banner} style={{ borderRadius: "1%" }} alt="movieImages"></img>
							</div>
							<div className="ratings-single">
								<Rating name="read-only" value={value} readOnly />
							</div>
							<p className="movie-director">Movie by: {singleMovie.director}</p>
							<p>Release date: {singleMovie.release_date}</p>
							<p className="single-movie-desc">{singleMovie.description}</p>
						</div>
					}
				</div>
				{showCarousel && <SimpleSlider />}
			</div>
		</div>
	);
}

const SimpleSlider = () => {
	const movies = [
		{
			title: "Oppenheimer",
			image: require("../components/MainScreen/HeroSection/assets/oppenjeimer.jpg"),
			description: "Description of Oppenheimer movie.",
			trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
		},
		{
			title: "Blue Eye Samurai: Season 1",
			image: require("../components/MainScreen/HeroSection/assets/samurai.jpg"),
			description: "Description of Blue Eye Samurai: Season 1",
			trailer: "https://www.youtube.com/watch?v=nJ1yQn17lbE",
		},
		{
			title: "John Wick: Chapter 4",
			image: require("../components/MainScreen/HeroSection/assets/wick.jpg"),
			description: "Description of John Wick: Chapter 4.",
			trailer: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
		},
		{
			title: "Game of Thrones: Season 8",
			image: require("../components/MainScreen/HeroSection/assets/snow.jpg"),
			description: "Description of Game of Thrones: Season 8.",
			trailer: "https://www.youtube.com/watch?v=rlR4PJn8b8I",
		},
		{
			title: "The Beekeeper",
			image: require("../components/MainScreen/HeroSection/assets/bk.webp"),
			description: "Description of The Beekeeper.",
			trailer: "https://www.youtube.com/watch?v=SzINZZ6iqxY",
		},
	];

	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 1800,
	};

	return (
		<div className="main-single-slider">
			<h2>People also like:</h2>
			<Slider {...settings}>
				{movies.map((movie) => (
					<div className="single-slider">
						<div key={movie.title}>
							<img
								src={movie.image}
								width={"370px"}
								height={"250px"}
								style={{
									borderTopLeftRadius: "10px",
									borderTopRightRadius: "10px",
								}}
								alt={movie.title}
							/>
							<div className="movie-details">
								<h3>{movie.title}</h3>
								<p>{movie.description}</p>
								<div>
									<Button variant="contained" style={{ backgroundColor: "#6741d9" }} onClick={() => window.open(movie.trailer)}>
										Watch Trailer
									</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const carouselData = [
    {
        src: require("./assets/oppenjeimer.jpg"),
        title: "Oppenheimer",
        rating: 7.5,
        title2: "火垂るの墓",
        description:
            "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history...",
        starring: "Cillian Murphy,Florence Pugh, Robert Downey Jr, Emily Blunt, Matt Damon",
        duration: "02:57:26",
        trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    },
    {
        src: require("./assets/snow.jpg"),
        title: "Game of Thrones: Season 8",
        title2: "火垂るの墓",
        description: "Nine noble families wage war against each other in order to gain control over the mythical land of Westeros. Meanwhile, a force is rising after millenniums and threatens the existence of living men...",
        rating: 7,
        starring: "Emilia Clarke, Kit Harington, Peter Dinklage, Lena Headey",
        duration: "02:57:26",
        trailer: "https://www.youtube.com/watch?v=rlR4PJn8b8I",
    },
    {
        src: require("./assets/wick.jpg"),
        title: "John Wick: Chapter 4",
        title2: "火垂るの墓",
        description: "With the price on his head ever increasing, legendary hit man John Wick takes his fight against the High Table global as he seeks out the most powerful players in the underworld...",
        rating: 7.7,
        starring: "Keanu Reeves, Scott Adkins, Donnie Yen, Bill Skarsgård",
        duration: "02:45:48",
        trailer: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
    },
];

const ImageCard = ({ image }) => {
    return (
        <div className="image-card">
            <img className="image" src={image.src} alt={image.title} />
            <div className="details">
                <h2 className="title">{image.title}</h2>
                <div className="title-ratings">
                    <h2 className="title2">{image.title2}</h2>
                    <div className="rate">
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
                        <FontAwesomeIcon icon={faStarHalf} style={{ color: "#ffd43b" }} />
                    </div>
                    <p>{image.duration}</p>
                </div>

                <p className="description">{image.description}</p>
                <p className="starring">Starring: {image.starring}</p>

                <Button
                    style={{
                        borderRadius: 20,
                        backgroundColor: "#6741D9",
                        marginTop: "10px",
                    }}
                    variant="contained"
                    size="large"
                    onClick={() => window.open(image.trailer)}
                >
                    Watch trailer <ArrowForwardIcon />
                </Button>
                <span className="hero-buttons" />
                <Button
                    style={{
                        borderRadius: 20,
                        backgroundColor: "#010101",
                        marginTop: "10px",
                        color: "#6741D9",
                        border: "2px solid #6741D9",
                    }}
                    variant="outlined"
                    size="large"
                >
                    + Add to favorites
                </Button>
            </div>
        </div>
    );
};

export default function HeroSection() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1800,
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {carouselData.map((image) => (
                    <ImageCard key={image.src} image={image} />
                ))}
            </Slider>
        </div>
    );
}

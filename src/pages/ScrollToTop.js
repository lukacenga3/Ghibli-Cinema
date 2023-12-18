import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

import "../index.css";

export default function ScrollToTop() {
	const [showButton, setShowButton] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setShowButton(true);
		} else if (scrolled <= 300) {
			setShowButton(false);
		}
	};

	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	window.addEventListener("scroll", toggleVisible);

	return (
		<FontAwesomeIcon
			icon={faCircleUp}
			className="scroll-to-top-button"
			size={"lg"}
			onClick={handleScrollToTop}
		/>
	);
}

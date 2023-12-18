import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
	return (
		<div className="page-footer">
			<div className="main-footer">
				<span role="img">🍿</span>
				<h1>Ghibli Cinema</h1>
			</div>
			<div className="copyright">
				<p>© Copyright 2023 Studio Ghibli</p>
			</div>
			<div className="social">
				<ul>
					<li>
						<TwitterIcon />
					</li>
					<li>
						<YouTubeIcon />
					</li>
					<li>
						<InstagramIcon />
					</li>
					<li>
						<FacebookIcon />
					</li>
				</ul>
			</div>
		</div>
	);
}

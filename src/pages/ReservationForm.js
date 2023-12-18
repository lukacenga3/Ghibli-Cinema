import React, { useState } from "react";
import { Button, Modal, Typography, Container, TextField } from "@mui/material";
import WeekendIcon from "@mui/icons-material/Weekend";

const ReservationForm = ({ displayModal, showDisplayModal, movies }) => {
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [showOnlinePurchase, setShowOnlinePurchase] = useState(false);

	const handleSeatClick = (e, seat) => {
		e.stopPropagation();
		const updatedSeats = selectedSeats.includes(seat) ? selectedSeats.filter((selectedSeat) => selectedSeat !== seat) : [...selectedSeats, seat];

		if (updatedSeats.length > 5) {
			<p>You can only select up to 5 seats!</p>;
			console.log("You can only select up to 5 seats!");
			return;
		}

		setSelectedSeats(updatedSeats);
	};

	return (
		<Modal div className="modal" open={displayModal} onClose={() => showDisplayModal(false)}>
			<div>
				<Container
					sx={{
						position: "absolute",
						width: 650,
						height: 600,
						bgcolor: "background.paper",
						border: "2px solid #2F3336",
						borderRadius: 3,
						boxShadow: 24,
						p: 4,
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<Typography variant="h6" component="h2" style={{ color: "#2F3336" }}>
						Ticket Reservation Form
					</Typography>
					<div className="seats" style={{ display: "flex", flexWrap: "wrap" }}>
						{Array.from({ length: 50 }, (_, index) => (
							<WeekendIcon
								key={index}
								style={{
									fontSize: 48,
									cursor: "pointer",
									color: selectedSeats.includes(index) ? "#6741D9" : "black",
									margin: "4px",
								}}
								onClick={(e) => handleSeatClick(e, index)}
							/>
						))}
					</div>
					<Typography variant="body1" component="p" style={{ color: "#2F3336" }}>
						Selected Seats: {selectedSeats.join(", ")}
					</Typography>
					{selectedSeats && (
						<Button
							style={{
								borderRadius: 20,
								backgroundColor: "#6741D9",
								marginTop: "10px",
							}}
							variant="contained"
							size="large"
							onClick={() => setShowOnlinePurchase(true)}
						>
							Confirm reservation
						</Button>
					)}
					<Button style={{ marginTop: "10px", marginLeft: "5px", color: "#6741D9", border: "2px solid #6741D9", borderRadius: 20 }} onClick={() => showDisplayModal(false)}>
						Cancel
					</Button>
				</Container>
				<OnlineTicketPurchase showOnlinePurchase={showOnlinePurchase} setShowOnlinePurchase={setShowOnlinePurchase} />
			</div>
		</Modal>
	);
};

export default ReservationForm;

const OnlineTicketPurchase = ({ showOnlinePurchase, setShowOnlinePurchase }) => {
	const [cardNumber, setCardNumber] = useState("");
	const [cvv, setCVV] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [totalPrice, setTotalPrice] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	const handleCardNumberChange = (e) => {
		setCardNumber(e.target.value);
		validateForm();
	};

	const handleCVVChange = (e) => {
		setCVV(e.target.value);
		validateForm();
	};

	const handleExpiryDateChange = (e) => {
		setExpiryDate(e.target.value);
		validateForm();
	};

	const handleTotalPriceChange = (e) => {
		setTotalPrice(e.target.value);
		validateForm();
	};

	const validateForm = () => {
		// Add your form validation logic here
		// For example, check if all fields are non-empty

		setIsFormValid(cardNumber.trim() !== "" && cvv.trim() !== "" && expiryDate.trim() !== "" && totalPrice.trim() !== "");
	};

	const handlePurchase = () => {
		// Add logic to handle the purchase
		// This can include sending data to a server, etc.
		console.log("Purchase successful!");
	};

	console.log(showOnlinePurchase);

	return (
		<Modal open={showOnlinePurchase} onClose={() => setShowOnlinePurchase(false)}>
			<div>
				<Container
					sx={{
						position: "absolute",
						width: 500,
						height: 400,
						bgcolor: "background.paper",
						border: "2px solid #2F3336",
						borderRadius: 3,
						boxShadow: 24,
						p: 4,
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<Typography variant="h5" style={{ color: "black" }}>
						Online Ticket Purchase
					</Typography>
					<Typography style={{ color: "black" }} sx={{ marginBottom: 1 }}>
						Please insert your payment details:
					</Typography>
					<TextField label="Card Number" value={cardNumber} onChange={handleCardNumberChange} fullWidth sx={{ marginBottom: 1.5 }} />
					<TextField label="CVV" value={cvv} onChange={handleCVVChange} fullWidth sx={{ marginBottom: 1.5 }} />
					<TextField label="Expiry Date" value={expiryDate} onChange={handleExpiryDateChange} fullWidth sx={{ marginBottom: 1.5 }} />
					<TextField label="Total Price" value={totalPrice} onChange={handleTotalPriceChange} fullWidth sx={{ marginBottom: 1.5 }} />
					<Button
						variant="contained"
						style={{
							borderRadius: 20,
							backgroundColor: "#6741D9",
							color: "#f9f9f9",
						}}
						onClick={handlePurchase}
					>
						Purchase
					</Button>
					<Button
						variant="contained"
						style={{
							borderRadius: 20,
							backgroundColor: "#f9f9f9",
							color: "#6741D9",
							border: "1px solid ",
							borderColor: "#6741D9",
							margin: "3px",
						}}
						onClick={() => setShowOnlinePurchase(false)}
					>
						Cancel
					</Button>
				</Container>
			</div>
		</Modal>
	);
};

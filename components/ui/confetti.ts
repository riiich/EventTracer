import confetti from "canvas-confetti";

export const playConfetti = () => {
	const confettiCount = 5;
	const particleCount = 20;

	for (let i = 0; i < confettiCount; i++) {
		confetti({
			particleCount: particleCount,
			startVelocity: 20,
			spread: 360,
			angle: 360,
			origin: {
				x: 0, // 0 - 1 (ex. 0.54732)
				y: 0,
			},
		});
		confetti({
			particleCount: particleCount,
			startVelocity: 20,
			spread: 360,
			angle: 360,
			origin: {
				x: 0.2,
				y: 0,
			},
		});
		confetti({
			particleCount: particleCount,
			startVelocity: 20,
			spread: 360,
			angle: 360,
			origin: {
				x: 0.4,
				y: 0,
			},
		});
		confetti({
			particleCount: particleCount,
			startVelocity: 20,
			spread: 360,
			angle: 360,
			origin: {
				x: 0.6,
				y: 0,
			},
		});
		confetti({
			particleCount: particleCount,
			startVelocity: 20,
			spread: 360,
			angle: 180,
			origin: {
				x: 0.8,
				y: 0,
			},
		});
		confetti({
			particleCount: particleCount,
			startVelocity: 25,
			spread: 360,
			angle: 180,
			origin: {
				x: 1,
				y: 0,
			},
		});
	}
};

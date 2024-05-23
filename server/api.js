import { Router } from "express";
import db from "./db.js";
const router = Router();

router.get("/videos", async (_, res) => {
	try {
		const result = await db.query("SELECT * FROM videos");
		res.json(result.rows);
	} catch (error) {
		res
			.status(500)
			.json({ success: false, error: "Could not connect to the database" });
	}
});

router.post("/videos", async (req, res) => {
	if (!req.body.title) {
		return res.status(422).json({ message: "Title field is required" });
	}
	if (!req.body.src) {
		return res.status(422).json({ message: "src field is required" });
	}
	const result = await db.query(
		`INSERT INTO videos (title,src,rating) VALUES ('${req.body.title}','${req.body.src}', 0) RETURNING id`
	);
	const newVideoId = result.rows[0].id;
	res.status(200).json({ success: true, data: { id: newVideoId } });
});

router.delete("/videos/:id", async (req, res) => {
	const videoId = req.params.id;

	try {
		await db.query("DELETE FROM videos WHERE id = $1", [videoId]);
		res
			.status(200)
			.json({ success: true, message: "Video deleted successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ success: false, error: "Failed to delete the video" });
	}
});

router.put("/videos/:id/rating", async (req, res) => {
	const videoId = req.params.id;
	const { rating } = req.body;

	try {
		const result = await db.query(`SELECT * FROM videos WHERE id=${videoId}`);
		let video = result.rows[0];
		if (!video) {
			return res.status(404).json({ error: "Video not found" });
		}

		await db.query(`UPDATE videos SET rating=${rating} WHERE id=${videoId}`);

		res
			.status(200)
			.json({
				success: true,
				message: "Video updated successfully",
				data: { rating: rating },
			});
	} catch (error) {
		res.status(500).json({ success: false, error: "Internal server error" });
	}
});

export default router;

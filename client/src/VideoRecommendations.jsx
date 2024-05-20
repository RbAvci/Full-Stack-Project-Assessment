import React, { useState, useEffect } from "react";
import "./VideoRecommendations.css";
import DeleteVideoRecommendation from "./DeleteVideoRecommendation";

const VideoList = () => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetch("/api/videos", {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(JSON.stringify(data));
				setVideos(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleDelete = (videoId) => {
		setVideos(videos.filter((video) => video.id !== videoId));
	};

	return (
		<div className="video-list">
			{videos.map((videoData, i) => (
				<div className="video" data-testid="video" key={i}>
					<div>
						<a href={videoData.src}>{videoData.title}</a>
					</div>
					<DeleteVideoRecommendation
						videoId={videoData.id}
						onDelete={handleDelete}
					/>
				</div>
			))}
		</div>
	);
};

export default VideoList;

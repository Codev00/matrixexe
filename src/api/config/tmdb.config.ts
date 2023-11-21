const backdropPath = (imgEndpoint: string) =>
   `https://image.tmdb.org/t/p/original/${imgEndpoint}`;

const posterPath = (imgEndpoint: string) =>
   `https://image.tmdb.org/t/p/w500/${imgEndpoint}`;

const youtubePath = (videoId: string) =>
   `https://www.youtube.com/embed/${videoId}?controls=1&rel=0`;
const youtubeImg = (videoId: string) =>
   `http://img.youtube.com/vi/${videoId}/sddefault.jpg`;
const tmdbConfig = {
   backdropPath,
   posterPath,
   youtubePath,
   youtubeImg,
};

export default tmdbConfig;

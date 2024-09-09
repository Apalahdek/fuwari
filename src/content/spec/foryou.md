<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Search with Markdown</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        h1 {
            background-color: #ff0000;
            color: white;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 20px;
        }
        input, button, textarea {
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        input, textarea {
            width: 80%;
            max-width: 600px;
        }
        button {
            background-color: #ff0000;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #cc0000;
        }
        .results, .markdown-preview {
            margin-top: 20px;
        }
        .video-item {
            background: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            max-width: 300px;
            cursor: pointer;
            display: inline-block;
            margin: 10px;
        }
        .video-item img {
            width: 100%;
            height: auto;
        }
        .video-item p {
            padding: 10px;
            margin: 0;
            font-size: 16px;
            color: #333;
        }
        .video-details {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            z-index: 1000;
            padding: 20px;
            box-sizing: border-box;
            overflow: hidden;
        }
        .video-details iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        .video-details p {
            text-align: center;
            margin: 10px 0;
        }
        .close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            background: red;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>
<body>
    <h1>YouTube Search with Markdown</h1>
    <div class="container">
        <input type="text" id="searchQuery" placeholder="Search for videos...">
        <button onclick="searchVideos()">Search</button>
        <div id="results" class="results"></div>
        <textarea id="markdownInput" rows="10" placeholder="Enter Markdown text here..."></textarea>
        <button onclick="renderMarkdown()">Render Markdown</button>
        <div id="markdownPreview" class="markdown-preview"></div>
    </div>

    <div id="videoDetails" class="video-details">
        <button class="close-button" onclick="closeVideo()">X</button>
        <iframe id="videoPlayer" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p id="videoTitle"></p>
        <p id="videoViews"></p>
    </div>

    <script>
        const API_KEY = 'AIzaSyALDAm7Ueoh29tGubH4sTcJV70mMAv7JdE'; // Replace with your YouTube API Key

        async function searchVideos() {
            const query = document.getElementById('searchQuery').value;
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                displayResults(data.items);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        function displayResults(videos) {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';
            videos.forEach(video => {
                const videoId = video.id.videoId;
                const title = video.snippet.title;
                const thumbnail = video.snippet.thumbnails.medium.url;
                const videoElement = `
                    <div class="video-item" onclick="showVideoDetails('${videoId}', '${title}')">
                        <img src="${thumbnail}" alt="${title}">
                        <p>${title}</p>
                    </div>
                `;
                resultsContainer.innerHTML += videoElement;
            });
        }

        async function showVideoDetails(videoId, title) {
            const videoDetailsContainer = document.getElementById('videoDetails');
            const videoPlayer = document.getElementById('videoPlayer');
            const videoTitle = document.getElementById('videoTitle');
            const videoViews = document.getElementById('videoViews');

            // Set iframe src to empty to stop any previously playing video
            videoPlayer.src = '';

            // Fetch video details
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${API_KEY}&id=${videoId}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                const video = data.items[0];
                const viewCount = video.statistics.viewCount;
                const videoTitleText = video.snippet.title;

                videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoTitle.innerText = videoTitleText;
                videoViews.innerText = `Views: ${viewCount}`;

                videoDetailsContainer.style.display = 'block';
            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        }

        function closeVideo() {
            const videoDetailsContainer = document.getElementById('videoDetails');
            document.getElementById('videoPlayer').src = '';
            videoDetailsContainer.style.display = 'none';
        }

        function renderMarkdown() {
            const markdownInput = document.getElementById('markdownInput').value;
            const markdownPreview = document.getElementById('markdownPreview');
            markdownPreview.innerHTML = marked(markdownInput);
        }
    </script>
</body>
</html>

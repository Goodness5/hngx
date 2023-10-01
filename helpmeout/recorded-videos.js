// video_page.js

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'playVideo') {
        const videoUrl = message.videoUrl;
        const videoElement = document.getElementById('recordedVideo');
        
        // Set the source of the video element to play the recorded video
        videoElement.src = videoUrl;
    }
});

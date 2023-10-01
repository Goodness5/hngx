chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'screenSharingStopped' && message.videoUrl) {
        // Save the recorded video URL in local storage
        chrome.storage.local.set({ recordedVideoUrl: message.videoUrl });
    
        // Redirect to the custom recorded videos page on your separate server
        const customRecordedVideosUrl = "https://example.com/custom_recorded_videos.html"; // Update with your server URL
        chrome.tabs.create({ url: customRecordedVideosUrl });
    }
    
});

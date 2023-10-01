// content.js

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'screenSharingStopped') {
        const videoUrl = message.videoUrl;

        // Create a new tab to display the video page
        chrome.tabs.create({ url: 'recorded_videos.html' }, function(tab) {
            // Listen for the new tab to finish loading
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
                if (tabId === tab.id && changeInfo.status === 'complete') {
                    // Once the new tab is loaded, send a message with the video URL
                    chrome.tabs.sendMessage(tab.id, { action: 'playVideo', videoUrl: videoUrl });
                }
            });
        });
    }
});

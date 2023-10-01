chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'screenSharingStopped' && message.videoUrl) {
        const customRecordedVideosUrl = "https://hngxhelpmeout.netlify.app/?videoUrl=" + encodeURIComponent(message.videoUrl);
        chrome.tabs.create({ url: customRecordedVideosUrl });
    }
});

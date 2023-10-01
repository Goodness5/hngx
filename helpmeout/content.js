chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'screenSharingStopped') {
      // Redirect to the recorded videos page
      console.log('ive been called')
      const recordedVideosUrl = "recorded_videos.html"; // Update with your desired URL
      chrome.tabs.create({ url: recordedVideosUrl }, function (tab) {
        // Save the recorded video URL in local storage (if available)
        if (message.videoUrl) {
         localStorage.setItem('recordedVideosUrl', message.videoUrl);
        }
      });
    }
  });
  
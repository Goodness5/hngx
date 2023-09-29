chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: chrome.runtime.getURL('controls/ontrols.html'), width: 250, height: 150 });
  });
  
  
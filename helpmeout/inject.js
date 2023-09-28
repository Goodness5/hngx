document.getElementById('startRecording').addEventListener('click', startRecording);
document.getElementById('stopRecording').addEventListener('click', stopRecording);
document.getElementById('takeScreenshot').addEventListener('click', takeScreenshot);

let mediaStream = null;
let isRecording = false;
let startTime = null;

function startRecording() {
  chrome.desktopCapture.chooseDesktopMedia(['screen'], (streamId) => {
    if (!streamId) return;
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: streamId,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720
        }
      }
    }).then((stream) => {
      mediaStream = stream;
      isRecording = true;
      startTime = new Date();
    }).catch((error) => {
      console.error('Error starting recording:', error);
    });
  });
}

function stopRecording() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
  }
  isRecording = false;
  startTime = null;
}

function takeScreenshot() {
  chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `screenshot_${new Date().getTime()}.png`;
    a.click();
  });
}

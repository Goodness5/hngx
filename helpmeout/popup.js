document.addEventListener('DOMContentLoaded', function() {
    const startRecordingButton = document.getElementById('startRecording');
    const stopRecordingButton = document.getElementById('stopRecording');
    const takeScreenshotButton = document.getElementById('takeScreenshot');
  
    startRecordingButton.addEventListener('click', startRecording);
    stopRecordingButton.addEventListener('click', stopRecording);
    takeScreenshotButton.addEventListener('click', takeScreenshot);
  });
  
  let mediaStream = null;
  let mediaRecorder = null;
  let recordedChunks = [];
  
  function startRecording() {
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
      .then((stream) => {
        mediaStream = stream;
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `recorded-${Date.now()}.webm`;
          a.click();
          recordedChunks = [];
        };
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error('Error starting recording:', error);
      });
  }
  
  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
  }
  
  function takeScreenshot() {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `screenshot_${new Date().getTime()}.png`;
      a.click();
    });
  }
  
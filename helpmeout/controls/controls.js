document.getElementById('stopRecording').addEventListener('click', stopRecording);
document.getElementById('pauseRecording').addEventListener('click', pauseRecording);
document.getElementById('resumeRecording').addEventListener('click', resumeRecording);
document.getElementById('saveRecording').addEventListener('click', saveRecording);

function stopRecording() {
  chrome.runtime.sendMessage({ command: 'stopRecording' });
}

function pauseRecording() {
  chrome.runtime.sendMessage({ command: 'pauseRecording' });
}

function resumeRecording() {
  chrome.runtime.sendMessage({ command: 'resumeRecording' });
}

function saveRecording() {
  chrome.runtime.sendMessage({ command: 'saveRecording' });
}

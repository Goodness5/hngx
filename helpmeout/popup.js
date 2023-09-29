let mediaRecorder;
let stream;
let chunks = [];
let countdownValue = 2;
let countdownInterval;

const countdownElement = document.getElementById('countdown');
const controlsElement = document.getElementById('controls');
const startButton = document.getElementById('recording-toggle');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const stopButton = document.getElementById('stopButton');


function startScreenRecording() {
    window.create({ url: chrome.runtime.getURL('controls/ontrols.html'), width: 250, height: 150 });
    navigator.mediaDevices.getDisplayMedia({ video: true })
        .then((s) => {
            stream = s;
            const options = {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
                mimeType: "video/mp4",
              };
    
            mediaRecorder = new MediaRecorder(stream, options)
    
            mediaRecorder.ondataavailable = (event) => {
                
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            }
    
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
    
                // Save the recording
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'screen-recording.webm';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
    
                chunks = [];
            }
        })
        .catch((err) => {
            console.error('Error accessing screen:', err);
        });



    countdownInterval = setInterval(() => {
        countdownElement.innerText = countdownValue;
        if (countdownValue === 0) {
            clearInterval(countdownInterval);
            mediaRecorder.start();
        }
        countdownValue--;
    }, 1000);

    controlsElement.style.display = 'block';

    pauseButton.addEventListener('click', () => {
        mediaRecorder.pause();
        pauseButton.disabled = true;
        resumeButton.disabled = false;
    });

    resumeButton.addEventListener('click', () => {
        mediaRecorder.resume();
        pauseButton.disabled = false;
        resumeButton.disabled = true;
    });

    stopButton.addEventListener('click', () => {
        stopRecording();
    });

    startButton.disabled = true;
}

function stopRecording() {
    mediaRecorder.stop();
    stream.getVideoTracks()[0].stop();
    clearInterval(countdownInterval);
}

function takeScreenshot() {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `screenshot_${new Date().getTime()}.png`;
        a.click();
    });
}

document
    .getElementById("recording-toggle")
    .addEventListener("click", startScreenRecording);

document
    .getElementById("stopButton")
    .addEventListener("click", stopRecording);

document
    .getElementById("takeScreenshot")
    .addEventListener("click", takeScreenshot);

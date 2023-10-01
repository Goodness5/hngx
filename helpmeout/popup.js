document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("startRecording")
    .addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: `
                ${startScreenRecording}
                startScreenRecording();
                `,
        });
      });
    });

  // ... (existing code) ...

  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.action === "screenSharingStopped") {
      // Redirect to the recorded videos page
      chrome.tabs.create({ url: "recorded_videos.html" }, function (tab) {
        // Save the recorded video URL in local storage (if available)
        if (message.videoUrl) {
          chrome.storage.local.get(["recordedVideos"], function (result) {
            const recordedVideos = result.recordedVideos || [];
            recordedVideos.push({ url: message.videoUrl });
            chrome.storage.local.set({ recordedVideos: recordedVideos });
          });
        }
      });
    }
  });

  document.getElementById("pauseButton").addEventListener("click", function () {
    chrome.runtime.sendMessage({ command: "pauseRecording" });
  });

  document
    .getElementById("resumeButton")
    .addEventListener("click", function () {
      chrome.runtime.sendMessage({ command: "resumeRecording" });
    });

  const videoEnabled = document.getElementById("cameraToggle").checked;
  const audioEnabled = document.getElementById("microphoneToggle").checked;
  const stopRecordingButton = document.getElementById("stopButton").checked;

  const mediaConstraints = {
    video: videoEnabled,
    audio: audioEnabled,
  };

  let mediaRecorder;
  let stream;



  async function startScreenRecording() {
    

    console.log("Starting recording");

  

    const startRecordingResponse = await fetch(
      "https://live-recorder.onrender.com/api/start_recording",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        // body: JSON.stringify({
        //   folder_name: folderName,
        //   blob_name: blobName,
        // }),
    }
    
    );

    const response = await startRecordingResponse.json();
    
    console.log(response)
    if (startRecordingResponse.ok) {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstart = () => {
        console.log("mediaRecorder started");
        chrome.runtime.sendMessage({ action: "createControls" });
        console.log("message sent");
      };

      mediaRecorder.onstop = async () => {
        console.log("mediaRecorder stopped");

        const blob = new Blob(chunks, { type: "video/webm" });
        const formData = new FormData();
        const folderName = startRecordingResponse.folder_name;
        const blobName = startRecordingResponse.blob_name;

        formData.append("data", blob);
        formData.append("blob_name", blobName);
        formData.append("folder_name", folderName);
        formData.append("content_type", "video/webm"); // Change content type if needed

        // const streamRecordingResponse = await fetch(
        //   "https://live-recorder.onrender.com/api/stream_recording",
        //   {
        //     method: "POST",
        //     body: formData,
        //   }
        // );

        // if (streamRecordingResponse.ok) {
        // const stopRecordingResponse = await fetch(`https://live-recorder.onrender.com/api/stop_recording`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'accept': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         "folder_name": response.folder_name,
        //         "blob_name": response.blob_name
        //     })
        // });

        // if (stopRecordingResponse.ok) {
          // Redirect to the recorded videos page
         window.open(url, "recorded_videos_page.html")
        // } else {
        //     console.error("Error streaming recording:", streamRecordingResponse);
        //   }
        // } else {
        //   console.error("Error stopping recording:", stopRecordingResponse);
        // }
      };
    } else {
      console.error("Error starting recording:", startRecordingResponse);
    }
  }

 
});

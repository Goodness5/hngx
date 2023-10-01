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

    chrome.runtime.onMessage.addListener(async function (
        message,
        sender,
        sendResponse
    ) {
        if (message.action === "screenSharingStopped") {
            // Redirect to the recorded videos page
            const recordedVideosUrl = "recorded_videos.html"; // Update with your desired URL
            chrome.tabs.create({ url: recordedVideosUrl }, function (tab) {
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
            }
        );
    
        const response = await startRecordingResponse.json();
    
        console.log(response);
    
        if (startRecordingResponse.ok) {
            stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });
    
            if (response.blob_name != undefined) {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
    
                async function blobToBase64(blob) {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result.split(',')[1]);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                }
    
                mediaRecorder.ondataavailable = async (event) => {
                    if (event.data.size > 0) {
                        const base64Data = await blobToBase64(event.data);
                        const requestData = {
                            data: base64Data,
                            blob_name: response.blob_name,
                            folder_name: response.folder_name,
                            content_type: "video/webm", // Change content type if needed
                        };
    
                        try {
                            const streamRecordingResponse = await fetch(
                                "https://live-recorder.onrender.com/api/stream_recording",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        accept: "application/json",
                                    },
                                    body: JSON.stringify(requestData),
                                }
                            );

                            const stopRecordingResponse = await fetch(
                            "https://live-recorder.onrender.com/api/stop_recording",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    accept: "application/json",
                                },
                                body: JSON.stringify({
                                    folder_name: response.folder_name,
                                    blob_name: response.blob_name,
                                }),
                            }
                        );
    
                        console.log(stopRecordingResponse);
                        if (stopRecordingResponse.ok) {
                            // const url = URL.createObjectURL(response.blob_name);
                            // chrome.tabs.create({ url: "recorded_videos.html" }, function (tab)
                            chrome.runtime.sendMessage({ action: 'screenSharingStopped', videoUrl: stopRecordingResponse.url });
                        } else {
                            console.error("Error stopping recording:", stopRecordingResponse);
                        }
    
                            if (!streamRecordingResponse.ok) {
                                console.error("Error streaming recording:", streamRecordingResponse);
                            }
                           
                        } catch (error) {
                            console.error("Error streaming recording:", error);
                        }
                    }
                };
    
                mediaRecorder.onstart = () => {
                    console.log("mediaRecorder started");
                    chrome.runtime.sendMessage({ action: "createControls" });
                    console.log("message sent");
                };

                mediaRecorder.onstop = async () => {
                    const chunks = [];
                    console.log("mediaRecorder stopped");
    
                   

                    // await streamRecordingResponse.json(())
    
                    try {
                        
                    } catch (error) {
                        console.error("Error stopping recording:", error);
                    }
                };
    
           
            }
        } else {
            console.error("Error starting recording:", startRecordingResponse);
        }
    }
    


});

const inputEl = document.getElementById('editInput');
const videoElement = document.getElementById('videoPlayer'); // Add an ID 'videoPlayer' to your video element
const videoUrl = document.getElementById('videoUrl');

const editName = () => {
    inputEl.disabled = '';
    inputEl.style.border = '1px solid #120B48';
    inputEl.style.borderRadius = '5px';
    inputEl.style.padding = '5px';
};

const copyUrl = () => {
    let url = videoUrl;
    navigator.clipboard.writeText(url.value).then(() => {
        alert('Text copied to clipboard');
    }).catch((err) => {
        console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", function() {
        const params = new URLSearchParams(window.location.search);
        const videourl = params.get("videoUrl");
    
        if (videourl) {
            videoUrl.value = videourl;
    
            var video = document.getElementById('videoPlayer');
            var source = document.createElement('source');
    
            source.setAttribute('src', videourl);
            source.setAttribute('type', 'video/mp4');
    
            video.appendChild(source);
            video.play();
        }
    });
    
    function togglePlay() {
        var video = document.getElementById('videoPlayer');
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
    
    document.getElementById('videoPlayer').addEventListener('timeupdate', function() {
        var video = this;
        var currentTimeElement = document.getElementById('currentTime');
        currentTimeElement.innerText = formatTime(video.currentTime);
    });
    
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = Math.floor(seconds % 60);
        return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    }
    

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

        const playButton = document.querySelector('.play-button');
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    
        // Add event listener for volume button
        const volumeButton = document.querySelector('.volume-button');
        volumeButton.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
            } else {
                video.muted = true;
            }
        });
    
        // Add event listener for settings button (you can implement your own settings functionality)
        const settingsButton = document.querySelector('.settings-button');
        settingsButton.addEventListener('click', function() {
            // Add your settings functionality here
        });
    
        // Update the time display
        video.addEventListener('timeupdate', function() {
            const currentTime = formatTime(video.currentTime);
            const duration = formatTime(video.duration);
            const timeDisplay = document.querySelector('.time-display');
            timeDisplay.textContent = `${currentTime} / ${duration}`;
        });
    
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    
        var video = document.getElementById('video');
        var source = document.createElement('source');
        
        source.setAttribute('src', videourl);
        source.setAttribute('type', 'video/mp4');
        
        video.appendChild(source);
        video.play();
}
});

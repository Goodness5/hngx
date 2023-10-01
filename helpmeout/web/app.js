const inputEl = document.getElementById('editInput')
// const editBtn = document.getElementById('editBtn')

const editName = ()=>{
        inputEl.disabled = '';
        inputEl.style.border = '1px solid #120B48'
        inputEl.style.borderRadius = '5px'
        inputEl.style.padding = '5px'
}

const videoUrl = document.getElementById('videoUrl')

const copyUrl = ()=>{
        let url = videoUrl
        navigator.clipboard.writeText(url.value).then(()=>{
                alert('Text copied to clipboard')
        }).catch((err)=>{
                console.log(err);
        })

}


document.addEventListener("DOMContentLoaded", function() {
        const params = new URLSearchParams(window.location.search);
        const videourl = params.get("videoUrl");
    
        if (videourl) {
                videoUrl.value = videourl;
            // Do something with the video URL
            console.log("Video URL:", videoUrl);
        } else {
            console.log("Video URL parameter not found.");
        }
    });
    
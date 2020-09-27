// get our elements //
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const resetButton = player.querySelector('.reset')

// build out functions // 

// .paused is a property of Video, .play()/.pause() are functions of Video //
function togglePlay() {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function sliders() {
    /* Wes used this 1 liner however I came oup with the below ugly code on my own so I wanted to keep it in here for lead devs actually looking, to see my raw work */
    // video[this.name] = this.value  //
    if (this.name === 'playbackRate') {
        video.playbackRate = this.value
    } else {
        video.volume = this.value
    }
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

function resetVideo() {
    console.log(this)
    video.currentTime = 0
}

// hook up event listeners //
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)
resetButton.addEventListener('click', resetVideo)
skipButtons.forEach(button => button.addEventListener('click', skip))

let mousedown = false; 
ranges.forEach(range => range.addEventListener('change', sliders))
ranges.forEach(range => range.addEventListener('mousemove', () => mousedown && sliders))
ranges.forEach(range => range.addEventListener('mousedown', () => mousedown = true))
ranges.forEach(range => range.addEventListener('mouseup', () => mousedown = false))

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
// Get elements
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const sliders = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Play/Pause functionality
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Update the toggle button icon
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Update volume and playback speed
function handleSliderUpdate() {
  video[this.name] = this.value;
}

// Skip functionality
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub through the video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Add event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

sliders.forEach(slider => slider.addEventListener('input', handleSliderUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

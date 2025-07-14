const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

const songs = [
  { name: "song1.mp3", title: "Perfect", artist: "Ed Sheeran" },
  { name: "song2.mp3", title: "Summertime Sadness", artist: "Lana Del Rey" },
  { name: "song3.mp3", title: "Lover", artist: "Taylor Swift" }
];

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}`;
  updatePlaylistUI();
}

function updatePlaylistUI() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((li, i) => {
    li.classList.toggle("active", i === songIndex);
  });
}

// Play
function playSong() {
  isPlaying = true;
  playBtn.textContent = "⏸️";
  audio.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.textContent = "▶️";
  audio.pause();
}

// Toggle Play
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next Song
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Prev Song
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Format time
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

function formatTime(time) {
  const mins = Math.floor(time / 60) || 0;
  const secs = Math.floor(time % 60) || 0;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Seek
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Playlist
function createPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(song);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

// Autoplay next
audio.addEventListener("ended", () => {
  nextBtn.click(); // simulate next button click
});

// Initialize
loadSong(songs[songIndex]);
createPlaylist();
volumeSlider.value = 0.5;
audio.volume = 0.5;

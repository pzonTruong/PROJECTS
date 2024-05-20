const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

let songs = [];
let songIndex = 0;

function loadSongs() {
    fetch('assets/songs/songDB.json') // Adjust the path accordingly
        .then(response => response.json())
        .then(data => {
            songs = data;
            loadSong(songs[songIndex]);
        })
        .catch(error => console.error('Error fetching the song list:', error));
}

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = 'assets/songs/Music_DB/' + encodeURIComponent(song.title) + '.mp3'; // Adjust the path accordingly
    console.log(audio.src)
}

function playSong() {
    audio.play();
    playButton.textContent = 'Pause';
}

function pauseSong() {
    audio.pause();
    playButton.textContent = 'Play';
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

playButton.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

// Fetch songs and load the first song
loadSongs();

const searchInput = document.getElementById('search');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';
    songs.forEach(song => {
        if (song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${song.title} by ${song.artist}`;
            listItem.addEventListener('click', () => playSelectedSong(song));
            searchResults.appendChild(listItem);
        }
    });
});

function playSelectedSong(song) {
    songIndex = songs.indexOf(song);
    loadSong(song);
    playSong();
}

// API: https://api.lyrics.ovh/v1/artist/title

document.addEventListener("DOMContentLoaded", function() {
const songsList = document.querySelector('.search__field')
const lyricsReturn = document.querySelector('.lyrics__return')

async function main(artist,title) {
  const response = await fetch (`https://api.lyrics.ovh/v1/${artist}/${title}`);
  const songsData = await response.json();
  
  if (songsData.lyrics) {
    lyricsReturn.innerHTML = songHTML(songsData.lyrics);
  }
  else {
    lyricsReturn.innerHTML = '<p>No lyrics found.</p>';
  }
}

let lyricArea = false;
function toggleLyricArea() {
  if (lyricArea) {
    lyricArea = false
    return document.body.classList.remove("lyric--open")
  }
  lyricArea = true;
  document.body.classList += " lyric--open"
}

toggleLyricArea();

function songHTML(lyrics) {
  return `<div class="lyrics lyrics--visible">${lyrics}</div>`;
}
if (document.getElementById("search__btn")) {
document.getElementById("search__btn").addEventListener("click", function() {
  const input = document.getElementById("search__area").value;
  const [artist, title] = input.split('-').map(item =>item.trim());
  if (artist && title) {
    main(artist, title);
  }
  else {
    lyricsReturn.innerHTML = '<p> Enter in the following format "Artist - Song Title"'
  }
});
}
});


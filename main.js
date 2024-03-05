const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTime = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

// sıra

let index = 4;

// dongu

let loop = true;

// JSON verisi

const songsList = [




    {
        name: "Bütün İstanbul Biliyo",
        link: "assets/istanbul.mp3",
        artist: "ikiye on kala",
        image: "assets/indir.jpeg"
      },
  {
    name: "bebeğim",
    link: "assets/bebeğim.mp3",
    artist: "Kaan Boşnak",
    image: "assets/bebeğim.jpg"
  },

  {
    name: "Seninle Kayboldum",
    link: "assets/kayıp.mp3",
    artist: "Kaan Boşnak",
    image: "assets/kayıp.jpeg"
  },

  {
    name: "Beyaz Skandalım",
    link: "assets/Beyaz.mp3",
    artist: "Emircan İğrek",
    image: "assets/beyaz.jpeg"
  },

  {
    name: "zalim",
    link: "assets/zalim.mp3",
    artist: "Sezen Aksu",
    image: "assets/Zalim.jpeg"
  }

  
];

// oynat

const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

// durdur

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};




const previousSong = () => {
  if (index > 0) {
    pauseAudio()
    index = index - 1
  } else {
    index = songsList.length - 1
  }
  setSong(index)
};



const nextSong = () =>{
  if (loop) {
      if (index == (songsList.length - 1)) {
          index = 0
      }else {
          index = index  + 1
      }
      setSong(index)
  } else {
      let randIndex = Math.floor(Math.random() * songsList.length)
      setSong(randIndex)
  }

}

// öcceki tıklama

prevButton.addEventListener("click", previousSong);
// soraki tiklanıldığında

nextButton.addEventListener("click", nextSong)

// tekrar butonuna tıklanıldığında

repeatButton.addEventListener("click", ()=>{

  if(repeatButton.classList.contains("active")){
    repeatButton.classList.remove("active")
    audio.loop=false
  }else{

    repeatButton.classList.add("active")
    audio.loop = true
  }


  
})


// kariştırıcı tıklanmadsı
shuffleButton.addEventListener('click', ()=>{
  if (shuffleButton.classList.contains('active')) {
      shuffleButton.classList.remove('active')
      audio.loop = true
  } else {
      shuffleButton.classList.add('active')
      audio.loop = false
  }
});


// şarkı bittiğinde
audio.onended = ()=>{
  nextSong()
}


playListButton.addEventListener("click" , () =>{
  playListContainer.classList.remove("hide")
})

closeButton.addEventListener("click",()=>{

  playListContainer.classList.add("hide")
})








// sarki ataması

const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex]

  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadedmetadata = () => {
    // saniye hesaplama

    maxDuration.innerHTML = timeFormatter(audio.duration)
  };

  playListContainer.classList.add("hide");
  playAudio();
};

// sürekli saniye kontrolu
setInterval(() =>{

  currentTime.innerHTML= timeFormatter(audio.currentTime)

  // proggres ilerlemesi

  currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"




},1000)

// şarkı süresideğisim kısmı

progressBar.addEventListener("click" , (event) =>{

  // başlama kısmı
let coordStart = progressBar.getBoundingClientRect().left
console.log(coordStart)
// bitiş alanı
let coordEnd = event.clientX

console.log(coordEnd)

let proggres = (coordEnd-coordStart) / progressBar.offsetWidth
console.log(proggres)

// proggres i ilerletme alanı

currentProgress.style.width = proggres*100 + "%"

// sesi değiştir

audio.currentTime = proggres * audio.duration

audio.play()
pauseButton.classList.remove("hide")
playButton.classList.add("hide")

})
// zaman formattı
const timeFormatter = (timeInput) => {
let minute = Math.floor(timeInput / 60)
minute= minute<10 ? "0" + minute : minute

let second = Math.floor(timeInput%60)
second = second<10 ? "0" :second

return`${minute} : ${second}`
}
// oynat butonuna tıklanıldığında

playButton.addEventListener("click", playAudio);

// durudur butonuna tıklanıldığında
pauseButton.addEventListener("click", pauseAudio);


const initializePlaylist = () =>{
  for(let i in songsList){
      playListSongs.innerHTML += `<li class="playlistSong"
      onclick="setSong(${i})">
      <div class="playlist-image-container">
       <img src="${songsList[i].image}"/>
      </div>
      <div class="playlist-song-details">
       <span id="playlist-song-name">
        ${songsList[i].name}
       </span>
       <span id="playlist-song-artist-album">
       ${songsList[i].artist}
       </span>
      </div>
     </li>
     `
  }
}


  window.onload = () => {
    (index = 0)
    setSong(index)
     pauseAudio()

     initializePlaylist()
  };


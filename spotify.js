
// let currentSong= new Audio();


// async function getSongs() {

//     let a = await fetch("http://127.0.0.1:3000/songs/")
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response
//     let as = div.getElementsByTagName("a")
//     let songs = [];

//     for (let index = 0; index < as.length; index++) {

//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {

//             songs.push(element.href.split("/songs/")[1])
//         }
//     }

//     return songs
// }

// const playMusic= (track)=>{

//     // let audio= new Audio("/songs/" + track)
//     currentSong.src= "/songs/" + track
//     currentSong.play()
// }

// async function main() {


//     let songs = await getSongs()
//     console.log(songs)


//     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li> <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/music.svg" alt="">
// <div class="info">
//     <div>${song.replaceAll("%20", "")} </div>
//     <div>Harry</div>
// </div>
// <div class="playnow">
//     <span>Play Now</span>
// <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/play.svg" alt="">
// </div>


// </li>`

//     }

//  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {

//     e.addEventListener("click", element=>{

//         console.log(e.querySelector(".info").firstElementChild.innerHTML)
//         playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
//     })
//     })

      

// }

// main();
























let currentSong = new Audio();

const secondsToMinutesSeconds = (seconds) => {
    // if (isNaN(seconds) || seconds < 0) {
    //     // console.error("Invalid input: seconds must be a non-negative number.");
    //     // return "Invalid";
    // }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

async function getSongs() {
    const songs = [
        "Spotify/Songs/@coldplay - Fix You (Lyrics).mp3",
        "Spotify/Songs/Anuv Jain - ALAG AASMAAN (a song on the ukulele).mp3",
        "Spotify/Songs/Farq Hai - Suzonn (Official Music Video).mp3",
        "Spotify/Songs/Kaptan Trend Karda New Pti Song 2024 Tappay Bareena Nadeem.mp3"
    ];

    return songs;
}

const playMusic = (track, pause = false) => {
    currentSong.src = "Songs/" + track;

    if (!pause) {
        currentSong.play();
        play.src = "https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/pause.svg";
       
    }

    document.querySelector(".song-info").innerHTML = track;
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
};




async function main() {
    let songs = await getSongs();
    playMusic(songs[0].split("/").pop().replace(/%20/g, " "), true);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        const songName = song.split("/").pop().replace(/%20/g, " ");

        let li = document.createElement("li");
        li.innerHTML = `
            <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/music.svg" alt="">
            <div class="info">
                <div>${songName}</div>
                <div>Harry</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/play.svg" alt="">
            </div>
        `;
        songUL.appendChild(li);
    }



    Array.from(songUL.getElementsByTagName("li")).forEach(li => {
        li.addEventListener("click", () => {
            const songName = li.querySelector(".info").firstElementChild.innerHTML.trim();
            playMusic(songName);
        });
    });




    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/cb54aa395ad2ff4fbfd64353b250bfaedee0611d/Video%2084%20-%20Project%202%20-%20Spotify%20Clone/img/play.svg";
        }
    });



    currentSong.addEventListener("timeupdate", () => {
        const formattedCurrentTime = secondsToMinutesSeconds(currentSong.currentTime);
        const formattedDuration = secondsToMinutesSeconds(currentSong.duration);

        document.querySelector(".song-time").innerHTML = `${formattedCurrentTime} / ${formattedDuration}`;

        document.querySelector(".circle").style.left= (currentSong.currentTime/  currentSong.duration) * 100 + "%"
    });



    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width);
        let newTime = percent * currentSong.duration;
    
        document.querySelector(".circle").style.left = percent * 100 + "%";
    
        if (!isNaN(newTime) && isFinite(newTime)) {
            currentSong.currentTime = newTime;
        }


    });
    

}



main();

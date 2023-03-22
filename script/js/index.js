// Переменные время и дата 
const time = document.querySelector('.time');
time.textContent = "Text";
const dateNow = document.querySelector('.date');
dateNow.textContent = "Text";

// Показывает текущее время и дату 

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();        
  time.textContent = currentTime; 
  setTimeout (showTime, 1000);
  showDate();
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  const greeting = document.querySelector('.greeting');
  greeting.textContent = greetingText; 
}

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options);
  dateNow.textContent = currentDate;
}

showTime();

// Показывает время суток для приветсвия 
    
function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let message;
    if (hours >= 0 && hours < 6) {
    message = "night";
    } else if (hours >= 6 && hours < 12) {
    message =  "morning";
    } else if (hours >= 12 && hours < 18) {
    message =  "afternoon";
    } else {
    message =  "evening";
    }
    return message;
  }

// Переменная для имени, функции для харнения данных и вывода  
const city = document.querySelector('.city');

function setLocalStorage() {
  const name = document.querySelector('.name');
  const city = document.querySelector('.city');
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);


function getLocalStorage() {
  const name = document.querySelector('.name');
  const city = document.querySelector('.city');
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
      getWeather();
    }
  }
  globalThis.addEventListener('load', getLocalStorage);
  city.addEventListener('change', () => getWeather());


//
const body = document.querySelector('body');
body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";

function getRandomNum(min = 1, max = 20) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getRandomNum(1, 20);

  
 let randomNum = getRandomNum(1, 20);
 function setBg() {
   const timeOfDay = getTimeOfDay();
   const bgNum = randomNum.toString().padStart(2, "0");
   const image = new Image();
   const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
   image.onload = () => {
     document.body.style.backgroundImage = `url(${url})`;
   };
   image.src = url;
   setTimeout (setBg, 1000);
 }
 
 function getSlideNext() {
  randomNum += 1;
  if (randomNum === 21) {
    randomNum = 1;
  };
  setBg();
 }
 getSlideNext ();
 const slideNext = document.querySelector(".slide-next");
 slideNext.addEventListener("click", getSlideNext);

 function getSlidePrev() {
  randomNum -=1;
  if (randomNum === 0) {
    randomNum = 20;
  };
  setBg ();
 }
 getSlidePrev ();

const slidePrev = document.querySelector(".slide-prev");
slidePrev.addEventListener("click", getSlidePrev);

// Погода 
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');



async function getWeather() {
  try {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=a73ba445c962f3a7c331fb2e41a78b25&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  


  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  weatherError.textContent = null;
  // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
} catch (err) {
  // console.log(err);
  weatherError.textContent = `Error! city not found for ${city.value}!`;
  temperature.textContent = null;
  weatherDescription.textContent = null;
  wind.textContent = null;
  humidity.textContent = null;
}
} 
getWeather();



document.addEventListener('DOMContentLoaded', getWeather);
// city.addEventListener('keypress', setCity); 

// Цитаты сразу не сработал JSON надо были кавычки 
const quote = document.querySelector ('.quote');
const author = document.querySelector('.author');

function getrandomQuotes(min = 0, max = 8) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getrandomQuotes(0, 8);
// console.log(getrandomQuotes(0, 8));

async function getQuotes() {  
  const quotes = 'script/data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  // console.log(data);

  let randomNumQuote = getrandomQuotes(0, 8);

  quote.textContent = data[randomNumQuote].text;
  author.textContent = data[randomNumQuote].author;

}
getQuotes();

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener("click", getQuotes);


// Плеер 
import playList from './playList.js';
console.log(playList.length);



let isPlay = false; 
let audio = new Audio();
let playNum = 0;


function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if(!isPlay) {
    isPlay = true;
    playBtn.classList.add('pause');
    audio.play();
    setActiveSong();
  } else {
    isPlay = false;
    playBtn.classList.remove('pause');
    audio.pause();
  }
}

function playNext() {
  playNum = playNum >= playList.length - 1 ? 0 : ++playNum;
  isPlay = false;
  playAudio();
  console.log(playNum);
}


function playPrev() {
  if (playNum == 0) {
    playNum = playList.length;
  }
  playNum = playNum - 1;
  isPlay = false;
  playAudio();
  console.log(playNum);
}


const playN = document.querySelector('.play-next');
playN.addEventListener('click', playNext);

const playP = document.querySelector('.play-prev');
playP.addEventListener('click', playPrev);

const playBtn = document.querySelector('.play');
playBtn.addEventListener('click', playAudio);


const playListContainer = document.querySelector('.play-list');

function addTruck() {
  for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = playList[i].title;
  playListContainer.append(li);
  }
}
addTruck();


const songs = document.querySelectorAll(".play-item");
songs.forEach((elem, index) => elem.setAttribute("id", index));

function setActiveSong() {
    const currentSong = document.getElementById(`${playNum}`);
    songs.forEach((elem) => elem.classList.remove("item-active"));
    currentSong.classList.add("item-active");
}
setActiveSong();
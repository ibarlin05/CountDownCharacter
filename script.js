// Configura la fecha objetivo aquí: MM/DD/YYYY
const targetDate = new Date("11/7/2025 00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  let days = 0, hours = 0, minutes = 0, seconds = 0;

  if (diff > 0) {
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((diff / (1000 * 60)) % 60);
    seconds = Math.floor((diff / 1000) % 60);
  }

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);




const boton = document.getElementById('botonImagen');
const audio = document.getElementById('audioDurin');
let audioActivo = false;
let fadeTimeout = null;

function fadeInAudio(audio, duration = 4000) {
    if (fadeTimeout) clearTimeout(fadeTimeout);
    audio.muted = false;
    audio.volume = 0;
    audio.play();
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        let volume = Math.min(progress / duration, 1);
        audio.volume = volume;
        if (progress < duration) {
            fadeTimeout = setTimeout(() => requestAnimationFrame(step), 30);
        } else {
            audio.volume = 1;
        }
    }
    requestAnimationFrame(step);
}

function fadeOutAudio(audio, duration = 400) {
    if (fadeTimeout) clearTimeout(fadeTimeout);
    let start = null;
    let startVolume = audio.volume;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        let volume = Math.max(startVolume * (1 - progress / duration), 0);
        audio.volume = volume;
        if (progress < duration) {
            fadeTimeout = setTimeout(() => requestAnimationFrame(step), 30);
        } else {
            audio.volume = 0;
            audio.muted = true;
        }
    }
    requestAnimationFrame(step);
}

boton.addEventListener('click', function() {
    if (!audioActivo) {
        fadeInAudio(audio, 4000);
        audioActivo = true;
        boton.style.opacity = '1';
    } else {
        fadeOutAudio(audio, 500);
        audioActivo = false;
        boton.style.opacity = '0.5';
    }
});

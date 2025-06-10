const photos = [
  'images/gf1.jpg',
  'images/gf2.jpg',
  'images/gf3.jpg',
];
// Add your girlfriend's photos here inside an "images" folder

const bgMusic = document.getElementById('bg-music');
const startOverlay = document.getElementById('startOverlay');
const mainContent = document.getElementById('mainContent');
const gallery = document.getElementById('gallery');
const showPhotosBtn = document.getElementById('showPhotosBtn');
const buttonsAfterPhotos = document.getElementById('buttonsAfterPhotos');
const showLetterBtn = document.getElementById('showLetterBtn');
const autoReadLetterBtn = document.getElementById('autoReadLetterBtn');
const birthdayLetter = document.getElementById('birthdayLetter');

function startExperience() {
  bgMusic.play().catch(() => {});
  startOverlay.style.display = 'none';
  mainContent.style.display = 'block';
}

// Build gallery images
photos.forEach((src) => {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('fade-photo');
  gallery.appendChild(img);
});

let currentIndex = 0;
let slideshowInterval = null;

function fadePhotos() {
  const imgs = document.querySelectorAll('.fade-photo');
  imgs.forEach(img => img.style.opacity = '0');
  imgs[currentIndex].style.opacity = '1';

  slideshowInterval = setInterval(() => {
    imgs[currentIndex].style.opacity = '0';
    currentIndex++;
    if (currentIndex >= imgs.length) {
      clearInterval(slideshowInterval);
      showPhotosBtn.style.display = 'none';
	buttonsAfterPhotos.style.display = 'block';
	buttonsAfterPhotos.style.opacity = '0'; // reset before animating
	// trigger reflow to restart animation
	void buttonsAfterPhotos.offsetWidth;
	buttonsAfterPhotos.style.animation = 'fadeSlideUp 1s ease forwards';

      return;
    }
    imgs[currentIndex].style.opacity = '1';
  }, 4000);
}

// Birthday paragraph to type:
const birthdayText = `
hey my love
on this very special day
i want to pour out everything in my heart
even though we are separated by miles and screens
and the silence of distance
you have filled my life with so much warmth and happiness
every time i hear your voice
every time i see your smile on that little screen
i feel like the luckiest person alive
because you are not just someone i talk to
you are my safe place
my favorite person
my light in the darkness
and my greatest joy
it amazes me how we managed to build something so beautiful from afar
how our hearts found each other despite all the space between us
and even though i cannot hold your hand or see your face in person right now
i want you to know that you are always right here in my thoughts
wrapped in my dreams
and held tightly in my soul
you make me believe that true love knows no boundaries
no distance
no limits
it only grows stronger every day
like a flower blossoming even in the toughest seasons
you have taught me patience and hope
and the magic of waiting for the day when we will finally be together
when i can look into your eyes and tell you how much i love you
without any words
just with my touch and my presence
until then i promise to keep loving you just as fiercely
just as truly
through every good morning and every good night
through every message and every call
through every silly joke and every serious talk
i want you to feel my love wrapped around you like a soft blanket
keeping you warm and safe no matter where you are in this big wide world
i hope this birthday fills your heart with as much happiness as you have given me
with your kindness
your laughter
your endless support
and the way you make me believe in forever
you are the most precious gift i have ever received
and i thank god every day for bringing you to me
i love you more than words could ever capture
and i promise to love you even more tomorrow and every day after
thank you for being you
thank you for loving me
and thank you for letting me love you
happy happy birthday my forever and always
`.trim();

function typeWriter(text, element, speed = 50, callback) {
  let i = 0;
  element.style.display = 'block';
  element.textContent = '';
  const timer = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}

// Show letter manually on button click
showLetterBtn.addEventListener('click', () => {
  showLetterBtn.disabled = true;
  autoReadLetterBtn.disabled = true;
  typeWriter(birthdayText, birthdayLetter, 45);
});

// Auto read letter at 1.5x speed (100ms -> ~67ms)
autoReadLetterBtn.addEventListener('click', () => {
  showLetterBtn.disabled = true;
  autoReadLetterBtn.disabled = true;
  typeWriter(birthdayText, birthdayLetter, 67);
});

// Show photos button click
showPhotosBtn.addEventListener('click', () => {
  showPhotosBtn.disabled = true;
  fadePhotos();
});

// Prevent dragging images
gallery.querySelectorAll('img').forEach(img => {
  img.ondragstart = () => false;
});

// Autoplay music when possible (fallback)
window.addEventListener('load', () => {
  bgMusic.volume = 0.3;
  bgMusic.play().catch(() => {
    // Must wait for user gesture, so overlay shows
    startOverlay.style.display = 'flex';
  });
});

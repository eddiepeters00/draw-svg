let pathAnimationObj = null;
let dotAnimationObj = null;


pathAnimationObj = drawPaths();
displayDots();


//This function adds a draw-animation on each path and returns a list of all animations
function drawPaths() {
  const paths = document.querySelectorAll('path');
  const pathAnimations = [];
  for (let i = 0; i < paths.length; i++) {
    const drawPathAnimation = {
      targets: paths[i],
      strokeDashoffset: [anime.setDashoffset, 0],
      stroke: getRandomColor(),
      easing: 'easeInOutExpo',
      direction: 'alternate',

      delay: function (el, i) { return i * 100 },
      duration: 10000,
      loop: true,
    };

    pathAnimations.push(anime(drawPathAnimation));
  }

  return pathAnimations;
}


//This function creates 100 divs and adds an animation on them
function displayDots() {
  const dotContainer = document.querySelector('.svg-container');

  for (let i = 0; i < 100; i++) {
    const innerDot = document.createElement('div');
    innerDot.className = 'inner-box';
    dotContainer.append(innerDot);
  }

  const dots = document.querySelectorAll('.inner-box');
  const dotAnimation = {
    targets: dots,
    backgroundColor: getRandomColor(),
    keyframes: [
      { delay: anime.stagger(10), easing: 'easeOutQuint', duration: 5000, rotate: '1080deg', direction: 'alternate', borderRadius: '50%' },
      { easing: 'easeOutInBounce' },
      { scale: 2 }
    ],
    direction: 'alternate',
    duration: 5000,
    loop: true,
  }

  dotAnimationObj = anime(dotAnimation);
}


//Returns a random rgb-color
function getRandomColor() {
  return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}


//EventListeners on the buttons
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', e => {
  pathAnimationObj.forEach(animation => animation.play());
  dotAnimationObj.play();
});

const stopBtn = document.getElementById('stop-btn');
stopBtn.addEventListener('click', e => {
  pathAnimationObj.forEach(animation => animation.pause());
  dotAnimationObj.pause();
});

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', e => {
  pathAnimationObj.forEach(animation => animation.pause());
  pathAnimationObj.forEach(animation => animation.restart());
  
  dotAnimationObj.pause();
  dotAnimationObj.restart();
});


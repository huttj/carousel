'use strict';

const timing =  100;
const container = document.getElementById('container');
const pi = Math.PI;
const count = 63;

(function addImages() {
  container.innerHTML = Array.apply(0, Array(count)).map((n,i) => {
    return `<div class="photo" style="background-image: url('img/${i+1}.jpg')"></div>`;
  }).join('');
})();

const images = Array.apply(0,document.getElementsByClassName('photo'));

let width, height, cardWidth, cardHeight, animating = false;

function calcDims() {
  width = container.offsetWidth;
  height = container.offsetHeight;
  cardWidth = height / 2;
  cardHeight = height;
}
calcDims();
window.addEventListener('resize', calcDims);

let pageX;
let s = 0;
let direction = 0;
let tween;

const body = new Hammer(document.body);

body.on('panstart', e => direction = 0);

body.on('panmove', function(e) {
  e.preventDefault();
  if (tween) tween.stop();
  direction += e.deltaX / cardWidth;
  s = e.deltaX / cardWidth;
  render();
});

body.on('panend', e => {
  const  d = direction > 0 ? 1 : -1;
  console.log(d, direction);
  e.preventDefault();
  var tweening = true;
  var dist = { x: s };
  tween = new TWEEN.Tween(dist)
    .easing(TWEEN.Easing.Exponential.Out)
    .to({ x: d * Math.abs(e.velocityX * e.deltaX / cardWidth) }, 5000)
    .onUpdate(function() {
      s = this.x;
      render();
    })
    .start()
    .onStop(() => tweening = false)
    .onComplete(() => tweening = false);

  requestAnimationFrame(animate);

  function animate(time) {
    if (tweening) {
      requestAnimationFrame(animate);
      tween.update(time);
    }
  }
});

body.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
body.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

render(0);

function render() {
  console.log('rendering!');

  const n = images.length;
  const r = width / 2;
  const h = n / 2;

  images.map((img, i) => {

    const t = 2*pi/n;

    const x = r-r*Math.cos(i*t + s);
    const y = r*Math.sin(i*t + s);

    const dx = x - cardWidth/1.5;

    const z = (1+y/r)/2;
    const zIndex = Math.ceil(100*z);

    //img.style.transform = `translate3d(${dx}px,0,0) scale(${z})`;
    img.style.transform = `translate3d(${dx}px,0,${z}px) rotate3d(0,1,0,${z*140+40}deg) scale(${z*z*z})`;


    img.style.zIndex = zIndex;
    img.style.opacity = .998;

    return t.toFixed(1);

  });
}

function sq(n) {
  return n*n;
}

function cube(n) {
  return n*n*n;
}

function sqrt(n) {
  return Math.sqrt(n);
}

function cbrt(n) {
  return Math.cbrt(n);
}

function qrt(n) {
  return Math.pow(n, 1/4);
}

function rootSolver(n) {
  // x=0,  y=0
  // x=n/2 y=PI/2
  // x=n   y=PI
}
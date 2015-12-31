'use strict';

const timing =  100;
const container = document.getElementById('container');
const pi = Math.PI;
const count = 20;

(function addImages() {
  container.innerHTML = Array.apply(0, Array(count)).map((n,i) => {
    return `<div class="photo" style="background-image: url('img/${i+1}.jpg')"></div>`;
  }).join('');
})();

const images = Array.apply(0,document.getElementsByClassName('photo'));

let width, height, cardWidth, cardHeight;

function calcDims() {
  width = container.offsetWidth;
  height = container.offsetHeight;
  cardWidth = height / 2;
  cardHeight = height;
}
calcDims();
window.addEventListener('resize', calcDims);

let s = 0;

document.body.addEventListener('dragstart', function (e) {
  console.log('dragstart', e);
  s = e.pageX / cardWidth;
});

document.body.addEventListener('drag', function (e) {
  console.log('drag', e);
  s = e.pageX / cardWidth;
  requestAnimationFrame(render);
});

document.body.addEventListener('dragend', function (e) {
  console.log('dragend', e);
  s = e.pageX / cardWidth;
  render();
});

render(0);


function render(animate) {
  console.log('rendering!');

  const n = images.length;
  const r = width / 2;
  const h = n / 2;
  const rt =

  images.map((img, i) => {

    const t = 2*pi/n;

    const x = r-r*Math.cos(i*t + s);
    const y = r*Math.sin(i*t + s);

    const dx = x - cardWidth/1.5;

    const z = (1+y/r)/2;
    const zIndex = Math.ceil(100*z);

    //img.style.transform = `translate3d(${dx}px,0,0) scale(${z})`;
    img.style.transform = `translate3d(${dx}px,0,${z}px) rotate3d(0,1,0,${z*180}deg) scale(${z})`;


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
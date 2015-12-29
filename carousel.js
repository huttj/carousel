'use strict';

const timing =  100;
const container = document.getElementById('container');

const count = 24;

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

for (let k = 0; k < count / 2; k++) {
  images.unshift(null);
  images.unshift(null);
}

loop();

function loop() {
  requestAnimationFrame(()=>{
    console.log('rendering forward loop');
    render();
    if (!images[0]) {
      images.shift();
      images.shift();
      setTimeout(loop, timing);

    } else if (images.length <= count * 2 - 1) {
      images.push(null);
      images.push(null);

      setTimeout(loop, timing);
    } else {

      setTimeout(reverseloop, timing);
    }
  });
}

function reverseloop() {
  requestAnimationFrame(()=> {
    console.log('rendering reverse loop');
    render();
    if (!images[images.length - 1]) {
      images.pop();
      images.pop();
      setTimeout(reverseloop, timing);

    } else if (images.length <= count * 2 - 1) {
      images.unshift(null);
      images.unshift(null);
      setTimeout(reverseloop, timing);

    } else {
      setTimeout(loop, timing);
    }
  });
}

function render() {
  const n = images.length;
  const unit = width / n;

  const r = n / 2;

  images.forEach((img, i) => {

    if (img) {
      const x = i;
      const y = r - sqrt(sq(r - x));

      //const z = cube(y / r);
      const z = qrt(y/r);

      const dx0 = x * unit - (cardWidth / 2);
      const dx = dx0 * .88; // Magic number
      const dy = y * unit;

      img.style.transform = `translate3d(${dx}px,0,0) scale(${z})`;
      //img.style.transform = `translate3d(${dx}px,0,0)`;
      //img.style.opacity = .9;
      img.style.zIndex = y;

    }

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


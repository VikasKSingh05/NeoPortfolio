// locomotive scroll setup
document.addEventListener("DOMContentLoaded", function() {
  window.scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });

  window.addEventListener('load', function() {
    window.scroll.update();
  });
});

const steps = [
  { delay: 1500, text: '✔ Booting personality module...', class: 'text-green-500' },
  { delay: 2000, text: '✔ Loading creativity engine...', class: 'text-green-500' },
  { delay: 2500, text: '✔ Curiosity mode: ENABLED', class: 'text-green-500' },
  { delay: 3000, text: '✔ Found passion: Building & breaking things.', class: 'text-green-500' },
  { delay: 3500, text: '✔ Detected interests: Web · Design · Code · Play', class: 'text-green-500' },
  { delay: 4000, text: '✔ Fetching side quests: Experiments & open source.', class: 'text-green-500' },
  { delay: 4500, text: '✔ Injecting humor.dll into system...', class: 'text-green-500' },
  { delay: 5000, text: '✔ Initializing dark mode aesthetics.', class: 'text-green-500' },
  { delay: 5500, text: '✔ Compiling thoughts into pixels...', class: 'text-green-500' },
  { delay: 6000, html: 'ℹ Output folder:<div class="pl-2">- /projects, /snippets, /artifacts</div>', class: 'text-blue-500' },
  { delay: 6500, text: 'Success! Portfolio loaded without ego.', class: 'text-muted' },
  { delay: 7000, text: 'Type, scroll, click — curiosity leads the way.', class: 'text-muted' },
];

const terminal = document.getElementById('terminal-output');

steps.forEach(({ delay, text, html, class: className }) => {
  setTimeout(() => {
    const line = document.createElement('div');
    line.className = `animated-line ${className}`;
    if (html) {
      line.innerHTML = html;
    } else {
      line.textContent = text;
    }
    terminal.appendChild(line);
  }, delay);
});

setTimeout(() => {
  if (window.scroll) window.scroll.update();
}, 7500);

let timeout;

function firstPageAnim() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  })
    .to(".boundingelem", {
      y: 0,
      duration: 1.5,
      delay: -1,
      stagger: .2,
      ease: Expo.easeInOut
    })
    .from("#landingfooter", {
      y: '-10',
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut
    });
}

function circleSkew() {
  let xscale = 1;
  let yscale = 1;
  let xprev = 0;
  let yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    let xdiff = dets.clientX - xprev;
    let ydiff = dets.clientY - yprev;

    xscale = gsap.utils.clamp(.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(.8, 1.2, ydiff);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circlemousefollower(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function circlemousefollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}

circlemousefollower();
firstPageAnim();
circleSkew();

document.querySelectorAll(".elem").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;
  elem.addEventListener("mousemove", function (dets) {
    let diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
    });
  });
  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5
    });
  });
});

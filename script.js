// Preloader functionality
document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    const vShape = document.getElementById('v-shape');
    const loadingText = document.getElementById('loading-text');
    const main = document.getElementById('main');
    
    let progress = 0;
    const totalDuration = 3000; // 3 seconds total
    const updateInterval = 50; // Update every 50ms
    
    // Hide main content initially and reset GSAP animations
    main.style.opacity = '0';
    main.style.pointerEvents = 'none';
    
    // Reset GSAP animations to initial state
    gsap.set("#nav", { y: '-10', opacity: 0 });
    gsap.set(".boundingelem", { y: '100%' });
    gsap.set("#landingfooter", { y: '-10', opacity: 0 });
    
    // Start the loading animation
    setTimeout(() => {
        vShape.classList.add('loaded');
    }, 500);
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
        progress += (100 / (totalDuration / updateInterval));
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Complete loading
            loadingText.textContent = '100%';
            loadingText.classList.add('complete');
            
            // Morph V to Vikas
            setTimeout(() => {
                vShape.classList.add('morph');
                vShape.textContent = 'Vikas';
            }, 500);
            
            // Hide preloader and show main content with animations
            setTimeout(() => {
                preloader.classList.add('fade-out');
                main.style.opacity = '1';
                main.style.pointerEvents = 'auto';
                
                // Start GSAP animations after preloader is hidden
                setTimeout(() => {
                    firstPageAnim();
                    circleSkew();
                    
                    // Update locomotive scroll after animations complete
                    setTimeout(() => {
                        if (window.scroll) window.scroll.update();
                    }, 2000);
                }, 100);
                
                // Remove preloader from DOM after animation
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1500);
            
        } else {
            loadingText.textContent = Math.floor(progress) + '%';
        }
    }, updateInterval);
});

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
  { delay: 1000, html: 'ℹ Output folder:<div class="pl-2">- /projects /portfolio /about_me</div>', class: 'text-blue-500' },
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
  // Debug: Check if elements exist
  const nav = document.querySelector("#nav");
  const landingFooter = document.querySelector("#landingfooter");
  const boundingelem = document.querySelectorAll(".boundingelem");
  const menuBtn = document.querySelector(".menu-btn");
  
  console.log("Nav element:", nav);
  console.log("Landing footer element:", landingFooter);
  console.log("Bounding elements:", boundingelem.length);
  console.log("Menu button:", menuBtn);
  
  // Debug: Check initial states
  console.log("Nav initial opacity:", getComputedStyle(nav).opacity);
  console.log("Nav initial transform:", getComputedStyle(nav).transform);
  
  var tl = gsap.timeline();
  tl.to("#nav", {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: Expo.easeInOut,
    onStart: function() {
      console.log("Nav animation started");
    },
    onComplete: function() {
      // Ensure nav is visible after animation
      gsap.set("#nav", { clearProps: "all" });
      console.log("Nav animation completed");
      console.log("Nav final opacity:", getComputedStyle(nav).opacity);
    }
  })
    .to(".boundingelem", {
      y: 0,
      duration: 1.5,
      delay: -1,
      stagger: .2,
      ease: Expo.easeInOut
    })
    .to("#landingfooter", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
      onComplete: function() {
        // Ensure landing footer is visible after animation
        gsap.set("#landingfooter", { clearProps: "all" });
        console.log("Landing footer animation completed");
      }
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

// Initialize mouse follower immediately (this can run behind preloader)
circlemousefollower();

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

// Terminal functionality
document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.terminal');
    const terminalContent = document.getElementById('terminal-output');
    const closeBtn = document.querySelector('.terminal-button.close');
    const minimizeBtn = document.querySelector('.terminal-button.minimize');
    const maximizeBtn = document.querySelector('.terminal-button.maximize');
    
    let isMinimized = false;
    let isMaximized = false;
    let hasStarted = false;

    // Close button functionality
    closeBtn.addEventListener('click', () => {
        terminal.style.transform = 'scale(0)';
        terminal.style.opacity = '0';
        setTimeout(() => {
            terminal.style.display = 'none';
        }, 300);
    });

    // Minimize button functionality
    minimizeBtn.addEventListener('click', () => {
        if (!isMinimized) {
            terminal.style.transform = 'translateY(100%)';
            terminal.style.opacity = '0';
            isMinimized = true;
        } else {
            terminal.style.transform = 'translateY(0)';
            terminal.style.opacity = '1';
            isMinimized = false;
        }
    });

    // Maximize button functionality
    maximizeBtn.addEventListener('click', () => {
        if (!isMaximized) {
            terminal.style.maxWidth = '90vw';
            terminal.style.width = '90vw';
            isMaximized = true;
        } else {
            terminal.style.maxWidth = '700px';
            terminal.style.width = 'auto';
            isMaximized = false;
        }
    });

    // Terminal typing animation
    const terminalCommands = [
        { html: 'ℹ Output folder:<div class="pl-2">- /projects /portfolio /about_me</div>', delay: 1000, class: 'text-blue-500' },
        { text: 'Type, scroll, click — curiosity leads the way.', delay: 1000, class: 'text-muted' },
        { text: '> echo "Hello, World!"', delay: 1000 },
        { text: 'Hello, World!', delay: 500, class: 'text-green-500' },
        { text: '> cat about_me.txt', delay: 1000 },
        { text: 'CSE-AIML student by day, code wizard by night.', delay: 500 },
        { text: '> ls skills/', delay: 1000 },
        { text: 'DSA    Web Development    Problem Solving', delay: 500, class: 'text-blue-500' },
        { text: '> cat hobbies.txt', delay: 1000 },
        { text: 'Gaming    Anime    Coding    Learning', delay: 500, class: 'text-green-500' }
    ];

    let currentCommand = 0;

    function typeCommand() {
        if (currentCommand < terminalCommands.length) {
            const command = terminalCommands[currentCommand];
            const line = document.createElement('div');
            line.className = 'animated-line';
            if (command.class) {
                line.classList.add(command.class);
            }
            
            // Create typing animation
            const typing = document.createElement('div');
            typing.className = 'typing';
            if (command.html) {
                typing.innerHTML = command.html;
            } else {
                typing.textContent = command.text;
            }
            
            line.appendChild(typing);
            terminalContent.appendChild(line);

            // Start typing animation
            requestAnimationFrame(() => {
                typing.classList.add('animate');
            });

            // Remove typing animation after delay
            setTimeout(() => {
                typing.classList.remove('typing', 'animate');
                currentCommand++;
                if (currentCommand < terminalCommands.length) {
                    setTimeout(typeCommand, 800);
                }
            }, command.delay);
        }
    }

    // Intersection Observer for terminal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                // Clear existing content
                terminalContent.innerHTML = '';
                currentCommand = 0;
                // Start typing animation
                setTimeout(typeCommand, 500);
            }
        });
    }, {
        threshold: 0.5 // Start when 50% of the terminal is visible
    });

    // Observe the about section
    observer.observe(document.getElementById('about'));

    // Add hover effect for terminal buttons
    const buttons = document.querySelectorAll('.terminal-button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });
});

const aboutMeSequence = [
  { text: '> echo "Hello, World!"', delay: 5000 },
  { text: 'Hello, World!', delay: 500, class: 'text-green-500' },
  { text: '> cat about_me.txt', delay: 1000 },
  { text: 'CSE-AIML student by day, code wizard by night.', delay: 500 },
  { text: '> ls skills/', delay: 1000 },
  { text: 'DSA    Web Development    Problem Solving', delay: 500, class: 'text-blue-500' },
  { text: '> cat hobbies.txt', delay: 1000 },
  { text: 'Gaming    Anime    Coding    Learning', delay: 500, class: 'text-green-500' },
  // { text: '> echo "Always learning, always building."', delay: 2000 },
  // { text: 'Always learning, always building.', delay: 1000, class: 'text-muted' }
];

// Preloader functionality
document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    const vShape = document.getElementById('v-shape');
    const loadingText = document.getElementById('loading-text');
    const main = document.getElementById('main');
    const progressBar = document.getElementById('progress-bar');
    
    main.style.opacity = '0';
    main.style.pointerEvents = 'none';
    
    gsap.set("#nav", { y: '-10', opacity: 0 });
    gsap.set(".boundingelem", { y: '100%' });
    gsap.set("#landingfooter", { y: '-10', opacity: 0 });
    
    gsap.to(vShape, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
    });

    gsap.to(vShape, {
        rotation: 360,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.set(vShape, { rotation: 0 });
        }
    });

    let progress = 0;
    const totalDuration = 1200; 
    const updateInterval = 30;
    let skipped = false;
    
    const progressInterval = setInterval(() => {
        if (skipped) return;
        
        progress += (100 / (totalDuration / updateInterval));
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            completeLoading();
        } else {
            progressBar.style.width = progress + '%';
            loadingText.textContent = Math.floor(progress) + '%';
        }
    }, updateInterval);
    
    function completeLoading() {
        loadingText.textContent = '100%';
        progressBar.style.width = '100%';
        
        setTimeout(() => {
            vShape.classList.add('morph');
            vShape.textContent = 'Vikas';
        }, 200);
        
        setTimeout(() => {
            preloader.classList.add('fade-out');
            main.style.opacity = '1';
            main.style.pointerEvents = 'auto';
            
            setTimeout(() => {
                firstPageAnim();
                circleSkew();
                
                setTimeout(() => {
                    if (window.scroll) window.scroll.update();
                }, 2000);
            }, 100);
            
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 800);
    }
    
    preloader.addEventListener('click', () => {
        if (!skipped) {
            skipped = true;
            clearInterval(progressInterval);
            progressBar.style.width = '100%';
            loadingText.textContent = '100%';
            completeLoading();
        }
    });
});

// locomotive scroll setup
document.addEventListener("DOMContentLoaded", function() {
  window.scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });

  window.addEventListener('load', function() {
    if (window.scroll && window.scroll.update) {
      window.scroll.update();
    }
    // Extra update after a short delay for images/fonts
    setTimeout(function() {
      if (window.scroll && window.scroll.update) {
        window.scroll.update();
      }
    }, 1000);
  });
});



let timeout;

function firstPageAnim() {

  const nav = document.querySelector("#nav");
  const landingFooter = document.querySelector("#landingfooter");
  const boundingelem = document.querySelectorAll(".boundingelem");
  const menuBtn = document.querySelector(".menu-btn");
  
  console.log("Nav element:", nav);
  console.log("Landing footer element:", landingFooter);
  console.log("Bounding elements:", boundingelem.length);
  console.log("Menu button:", menuBtn);
  
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
        gsap.set("#landingfooter", { clearProps: "all" });
        console.log("Landing footer animation completed");
        // Animate #second in after landing animation, on all devices
        document.getElementById('second').classList.add('visible');
        // Animate #about in after #second (with a slight delay)
        setTimeout(function() {
          document.getElementById('about').classList.add('visible');
          // Animate #projects in after #about (with a slight delay)
          setTimeout(function() {
            document.getElementById('projects').classList.add('visible');
            // Animate #subscribe in after #projects (with a slight delay)
            setTimeout(function() {
              document.getElementById('subscribe').classList.add('visible');
              // Animate #footer in after #subscribe (with a slight delay)
              setTimeout(function() {
                document.getElementById('footer').classList.add('visible');
              }, 400);
            }, 400);
          }, 400);
        }, 400);
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

// Terminal content - displayed instantly
    const terminalCommands = [
        { html: 'ℹ Output folder:<div class="pl-2">- /projects /portfolio /about_me</div>', class: 'text-blue-500' },
        { text: 'Type, scroll, click — curiosity leads the way.', class: 'text-muted' },
        { text: '> cat about_me.txt', isCommand: true, output: 'CSE-AIML student by day, code wizard by night.' },
        { text: '> ls skills/', isCommand: true, output: 'DSA    Web Development    Problem Solving' },
        { text: '> cat hobbies.txt', isCommand: true, output: 'Gaming    Anime    Coding    Learning' }
    ];

    function createTerminalLine(command, index) {
        const line = document.createElement('div');
        line.className = 'animated-line';
        if (command.class) line.classList.add(command.class);
        if (command.isCommand) line.classList.add('clickable');

        if (command.html) {
            line.innerHTML = command.html;
        } else {
            line.textContent = command.text;
        }

        if (command.isCommand) {
            line.addEventListener('click', () => executeCommand(line, command.output));
        }

        return line;
    }

    function executeCommand(line, output) {
        if (line.dataset.executed === 'true') return;

        line.dataset.executed = 'true';

        const processingLine = document.createElement('div');
        processingLine.className = 'processing-line';
        processingLine.textContent = 'processing...';
        line.insertAdjacentElement('afterend', processingLine);

        setTimeout(() => {
            processingLine.remove();
            line.classList.add('executed');

            const outputLine = document.createElement('div');
            outputLine.className = 'animated-line text-green-500';
            outputLine.style.opacity = '0';
            outputLine.style.transform = 'translateY(-5px)';
            outputLine.textContent = output;
            line.insertAdjacentElement('afterend', outputLine);

            requestAnimationFrame(() => {
                outputLine.style.opacity = '1';
                outputLine.style.transform = 'translateY(0)';
                outputLine.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            });

            if (window.scroll && window.scroll.update) window.scroll.update();
        }, 500);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                terminalContent.innerHTML = '';
                terminalCommands.forEach((command, index) => {
                    const line = createTerminalLine(command, index);
                    terminalContent.appendChild(line);
                });

                const cursor = document.createElement('span');
                cursor.className = 'terminal-cursor';
                terminalContent.appendChild(cursor);

                if (window.scroll && window.scroll.update) window.scroll.update();
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(document.getElementById('about'));

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

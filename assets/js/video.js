// -----------------------------------------------------------
//  HERO ANIMATION — CDN VERSION (Matches ES Module 1:1)
// -----------------------------------------------------------

// SAFETY: confirm GSAP is loaded
if (typeof gsap === "undefined") {
  console.error("GSAP not loaded. Add GSAP CDN before video.js");
}


const preloadImages = (count = 35) => {
  const imgs = [];
  for (let i = 1; i <= count; i++) {
    const img = new Image();
    img.src = `/assets/imgs/preloader/img${i}.jpg`;
    imgs.push(img);
  }
  return imgs;
};

preloadImages();


document.addEventListener("DOMContentLoaded", () => {

  // Register CustomEase
  gsap.registerPlugin(CustomEase);

  // EXACT same curve as ES module version (spacing matters)
  CustomEase.create("hop", "0.9, 0, 0.1, 1");

  // -----------------------------------------------------------
  //  SELECTORS
  // -----------------------------------------------------------
  const projectsContainer = document.querySelector(".projects");
  const locationsContainer = document.querySelector(".locations");
  const gridImages = gsap.utils.toArray(".img");
  const heroImage = document.querySelector(".img.hero-img");
  const images = gridImages.filter((img) => img !== heroImage);

  // -----------------------------------------------------------
  //  SPLIT TEXT (CDN requires absolute:false explicitly)
  // -----------------------------------------------------------
  const introCopy = new SplitType(".intro-copy h3", {
    types: "words",
    absolute: false
  });

  const titleHeading = new SplitType(".title h1", {
    types: "words",
    absolute: false
  });

  gsap.set(introCopy.words, { y: "110%" });
  gsap.set(titleHeading.words, { y: "110%" });

  // -----------------------------------------------------------
  //  DATA (copied from ES module version)
  // -----------------------------------------------------------
  const projectsData = [
    {
      name: "Brand Awareness Blast",
      director: "Flipkart – Influencer Squad",
      location: "Pan India Campaign",
    },
    {
      name: "App Download Accelerator",
      director: "Garnier Digital Team",
      location: "Mumbai, India",
    },
    {
      name: "Product Launch Spotlight",
      director: "Crocs Creator Network",
      location: "Bangalore Studio",
    },
    {
      name: "Sales Conversion Drive",
      director: "Myntra Trend Partners",
      location: "Delhi NCR",
    },
    {
      name: "UGC Content Engine",
      director: "Venusia Dermatology Creators",
      location: "Remote – India / SEA",
    },
    {
      name: "Podcast Feature Series",
      director: "Eke18 Media Collective",
      location: "Bangalore | Remote",
    },
    {
      name: "Festival Buzz Campaign",
      director: "Lakmé Beauty Tribe",
      location: "Mumbai Fashion Week",
    },
    {
      name: "CSR + Cause Awareness",
      director: "Goldmedal Social Impact Unit",
      location: "Hyderabad",
    },
    {
      name: "Influencer Event Experience",
      director: "House of Hiranandani – Creator Crew",
      location: "Chennai Showcase Event",
    },
    {
      name: "Music x Tech Collaboration",
      director: "MARKFTINGZ Creative Labs",
      location: "Los Angeles, CA",
    },
    {
      name: "Creator Product Trials",
      director: "Myntra Try-On Network",
      location: "Bangalore HQ",
    },
    {
      name: "Design-Led UGC Series",
      director: "Crocs Aesthetic Studio",
      location: "Kuala Lumpur",
    },
  ];

  // -----------------------------------------------------------
  //  POPULATE LISTS
  // -----------------------------------------------------------
  function initializeDynamicContent() {
    projectsData.forEach((project) => {
      const el = document.createElement("div");
      el.className = "project-item";
      el.innerHTML = `<p>${project.name}</p><p>${project.director}</p>`;
      projectsContainer.appendChild(el);
    });

    projectsData.forEach((project) => {
      const el = document.createElement("div");
      el.className = "location-item";
      el.innerHTML = `<p>${project.location}</p>`;
      locationsContainer.appendChild(el);
    });
  }

  // -----------------------------------------------------------
  //  IMAGE ROTATION — EXACT SAME LOGIC AS ORIGINAL
  // -----------------------------------------------------------
  const allImageSources = Array.from(
    { length: 35 },
    (_, i) => `/assets/imgs/preloader/img${i + 1}.jpg`
  );

  const getRandomImageSet = () => {
    const shuffled = [...allImageSources].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
  };

  function startImageRotation() {
    const totalCycles = 25;

    for (let cycle = 0; cycle < totalCycles; cycle++) {
      const randomImages = getRandomImageSet();

      gsap.to({}, {
        duration: 0,
        delay: cycle * 0.15,
        onComplete: () => {
          gridImages.forEach((img, index) => {
            const imgTag = img.querySelector("img");

            if (cycle === totalCycles - 1 && img === heroImage) {
              imgTag.src = "/assets/imgs/preloader/img7.png";
              gsap.set(".hero-img img", { scale: 1.5 });
            } else {
              imgTag.src = randomImages[index];
            }
          });
        }
      });
    }
  }

  // -----------------------------------------------------------
  //  INITIAL STATES
  // -----------------------------------------------------------
  function setupInitialStates() {
    gsap.set("nav", { y: "-125%" });
  }

  // -----------------------------------------------------------
  //  INIT
  // -----------------------------------------------------------
  function init() {
    initializeDynamicContent();
    setupInitialStates();
    createAnimationTimelines();
  }

  init();

  // -----------------------------------------------------------
  //  MAIN TIMELINES — PERFECT 1:1 MATCH
  // -----------------------------------------------------------
  function createAnimationTimelines() {

    const overlayTimeline = gsap.timeline();
    const imagesTimeline = gsap.timeline();
    const textTimeline = gsap.timeline();

    // LOGO animation (exact)
    overlayTimeline.to(".logo-line-1", {
      backgroundPosition: "0% 0%",
      color: "#fff",
      duration: 1,
      ease: "none",
      delay: 0.3
    });

    overlayTimeline.to(".logo-line-1", {
      opacity: 0,
      duration: 1.25,
      ease: "power1.out"
    });

  // APPEAR — fade in + slide in (GRAY)
overlayTimeline.to(
  [".projects-header", ".project-item"],
  {
    opacity: 1,
    y: 0,
    duration: 0.35,
    stagger: 0.06,
    ease: "power2.out",
    color: "#7a7a7a",   // ⭐ start gray
    delay: 1,
  }
);

// LOCATIONS APPEAR — same motion
overlayTimeline.to(
  [".locations-header", ".location-item"],
  {
    opacity: 1,
    y: 0,
    duration: 0.35,
    stagger: 0.06,
    ease: "power2.out",
    color: "#7a7a7a",
  },
  "<"
);

// COLOR TRANSITION — GRAY → WHITE
overlayTimeline.to(
  [".projects-header", ".project-item", ".locations-header", ".location-item"],
  {
    color: "#ffffff",    // ⭐ turn white
    duration: 0.25,
    stagger: 0.04,
    ease: "power1.out",
  }
);

// EXIT — same animation reversed
overlayTimeline.to(
  [".projects-header", ".project-item", ".locations-header", ".location-item"],
  {
    opacity: 0,
    y: -20,
    duration: 0.25,
    stagger: 0.04,
    ease: "power2.in",
  }
);


    overlayTimeline.to(".overlay", {
      opacity: 0,
      duration: 0.25,
      delay: 1.5,
      onComplete: () => {
        document.querySelector(".overlay").style.display = "none";
      }
    });

    // IMAGE GRID OPENS
    imagesTimeline.to(".img", {
      clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
      duration: 1,
      delay: 2.5,
      stagger: 0.05,
      ease: "hop",
      onStart: () => {
        setTimeout(() => {
          startImageRotation();
          gsap.to(".loader", { opacity: 0, duration: 0.3 });
        }, 1000);
      }
    });

    // IMAGE GRID CLOSES
    imagesTimeline.to(images, {
      clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
      duration: 1,
      delay: 2.5,
      stagger: 0.05,
      ease: "hop"
    });

    // HERO POP
    imagesTimeline.to(".hero-img", {
      y: -50,
      duration: 1.5,
      ease: "hop"
    });

    imagesTimeline.to(".hero-img", {
      scale: 4,
      clipPath: "inset(5% 18%)",
      duration: 1.5,
      ease: "hop",
      onStart: () => {
        gsap.to(".hero-img img", { scale: 1, duration: 1.25 });
        gsap.to(".banner-img", { scale: 1, delay: 0.5,duration: 1 });
        gsap.to("nav", { y: "0%", duration: 1, delay: 0.25 });
      }
    });

    imagesTimeline.to(".banner-img-1", {
      left: "40%", rotate: -20, duration: 1.75, ease: "hop"
    }, "<");

    imagesTimeline.to(".banner-img-2", {
      left: "60%", rotate: 20, duration: 1.75, ease: "hop"
    }, "<");

    // TEXT REVEAL TIMING FIXED TO MATCH ES MODULE
    textTimeline.to(titleHeading.words, {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      delay: 9.5,
      ease: "power3.out"
    });

    textTimeline.to(introCopy.words, {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    }, "<");
  }

  

});



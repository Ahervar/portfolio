const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  // if(window.scrollY > 500){
  //   backToTop.style.display = "flex";
  // } else {
  //   backToTop.style.display = "none";
  // }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

// const backToTop = document.createElement('div');
// backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
// backToTop.id = "back-to-top";
// document.body.appendChild(backToTop);

// backToTop.style.cssText = `
//   position: fixed;
//   bottom: 100px;
//   right: 40px;
//   background: #474af0;
//   color: white;
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   display: none;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   z-index: 1000;
//   transition: transform 0.3s ease;
// `;

// backToTop.addEventListener('click', () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// });

// backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
// backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "React Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display='none', 500);
    mainPage.classList.add("visible");
  }, 4000);
});

// ============================================
// 🟢 CUSTOMIZE ASSISTANT BOAT HERE
// ============================================
const USER_DATA = {
  name: "Manish",
  role: "Front-End Developer",
  location: "Rajkot, Gujarat, India",
  bio: "I'm a creative front-end developer based in India, passionate about building modern, responsive web experiences. I specialize in turning ideas into clean code using React and Python.",
  email: "manishahervar@gmail.com",
  availability: "Available for freelance work",
  skills: ["HTML", "CSS", "JavaScript", "Python", "React.js", "Tailwind CSS", "Bootstrap", "Shopify"],
  projects: [
      { title: "E-Commerce Website", description: "Modern online store with product filtering, cart, and payment features using React.js & Tailwind." },
      { title: "Amazon Clone", description: "A functional single-page replica of the Amazon website." },
      { title: "Spotify Clone", description: "Music streaming interface clone." },
      { title: "Currency Converter", description: "Real-time currency comparison tool." },
      { title: "Shopify Website", description: "E-commerce site managed via Shopify admin panel." }
  ]
};

const BOAT_DATA = {
  name: "Skipper",
  welcome: `Ahoy! I'm Skipper. Ask me about ${USER_DATA.name}'s skills or projects!`
};

// ============================================
// ⚙️ WIDGET LOGIC (DO NOT EDIT BELOW)
// ============================================

let isChatOpen = false;
const chatWindow = document.getElementById('boat-chat-window');
const toggleBtn = document.getElementById('boat-toggle-btn');
const notification = document.getElementById('boat-notification');
const messagesContainer = document.getElementById('boat-messages');
const inputField = document.getElementById('boat-input');
const typingIndicator = document.getElementById('typing-indicator');

// Initialize with welcome message
// Changed from window.onload to addEventListener to be safer
window.addEventListener('load', function() {
  addMessage(BOAT_DATA.welcome, 'bot');
});

function toggleChat() {
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
      chatWindow.classList.add('open');
      notification.style.display = 'none';
      toggleBtn.style.animation = 'none'; // Stop floating when open
      // Focus input
      setTimeout(() => inputField.focus(), 100);
  } else {
      chatWindow.classList.remove('open');
      toggleBtn.style.animation = 'floatBoat 3s ease-in-out infinite';
  }
}

function handleSendMessage(e) {
  e.preventDefault();
  const text = inputField.value.trim();
  if (!text) return;

  // 1. Add User Message
  addMessage(text, 'user');
  inputField.value = '';

  // 2. Show Typing Indicator
  showTyping(true);

  // 3. Generate Response (Simulated Delay)
  setTimeout(() => {
      const response = generateResponse(text);
      showTyping(false);
      addMessage(response, 'bot');
  }, 800);
}

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  
  // Insert before typing indicator
  messagesContainer.insertBefore(div, typingIndicator);
  scrollToBottom();
}

function showTyping(show) {
  typingIndicator.style.display = show ? 'flex' : 'none';
  scrollToBottom();
}

function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// The Logic Brain
function generateResponse(input) {
    const lowerInput = input.toLowerCase();
    
    // Greeting
    if (lowerInput.match(/(hi|hello|hey|ahoy|namaste|greetings|morning|afternoon|evening)/)) {
        return `Hello! Welcome to ${USER_DATA.name}'s portfolio. How can I help you navigate today?`;
    }

    // About / Bio
    if (lowerInput.includes("who is") || lowerInput.includes("about") || lowerInput.includes("manish") || lowerInput.includes("yourself")) {
        return `${USER_DATA.name} is a ${USER_DATA.role} from ${USER_DATA.location}. ${USER_DATA.bio}`;
    }

    // Location
    if (lowerInput.includes("where") || lowerInput.includes("location") || lowerInput.includes("based") || lowerInput.includes("live")) {
        return `${USER_DATA.name} is based in ${USER_DATA.location}, but works with clients globally.`;
    }

    // Availability / Freelance
    if (lowerInput.includes("freelance") || lowerInput.includes("hire") || lowerInput.includes("available") || lowerInput.includes("job") || lowerInput.includes("work")) {
        return `Yes! ${USER_DATA.name} is currently: ${USER_DATA.availability}. You can discuss projects via email.`;
    }

    // Skills / Tech
    if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("stack") || lowerInput.includes("language") || lowerInput.includes("program")) {
        return `Manish's tech stack includes: ${USER_DATA.skills.join(", ")}. He is constantly learning new technologies!`;
    }

    // Services
    if (lowerInput.includes("service") || lowerInput.includes("offer") || lowerInput.includes("do for me")) {
        return "Manish specializes in Web Development (React, HTML/CSS), UI/UX Implementation, Web Performance optimization, and SEO.";
    }

    // Education
    if (lowerInput.includes("education") || lowerInput.includes("study") || lowerInput.includes("degree") || lowerInput.includes("background")) {
        return "Manish is a self-taught coder with hands-on experience in Shopify web customization and full-stack development.";
    }

    // Projects (General)
    if (lowerInput.includes("project") || lowerInput.includes("portfolio") || lowerInput.includes("built") || lowerInput.includes("case study")) {
        const titles = USER_DATA.projects.map(p => p.title).join(", ");
        return `Here are some featured works: ${titles}. Which one would you like to know more about?`;
    }
    
    // Specific Project Details (Expanded keywords)
    if (lowerInput.includes("amazon")) return "The Amazon Clone is a robust single-page application built with HTML, CSS, and JS, replicating the core shopping experience.";
    if (lowerInput.includes("spotify")) return "The Spotify Clone is a responsive music player interface demonstrating complex CSS layouts and audio control logic.";
    if (lowerInput.includes("commerce") || lowerInput.includes("shop")) return "The E-Commerce project is a fully functional store with cart management, product filtering, and payment integration using React & Tailwind.";
    if (lowerInput.includes("currency")) return "The Currency Converter uses real-time APIs to provide instant global currency exchange rates.";

    // Resume / CV
    if (lowerInput.includes("resume") || lowerInput.includes("cv") || lowerInput.includes("download")) {
        return "You can download Manish's CV from the 'Download CV' button in the main header, or request a copy via email.";
    }

    // GitHub / LinkedIn
    if (lowerInput.includes("github") || lowerInput.includes("git") || lowerInput.includes("code")) {
        return "You can view the source code for these projects on Manish's GitHub profile linked in the header.";
    }
    if (lowerInput.includes("linkedin")) {
        return "Let's connect! You can find the LinkedIn profile link in the contact section or header.";
    }

    // Contact
    if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("phone") || lowerInput.includes("call") || lowerInput.includes("reach")) {
        return `You can email Manish at: ${USER_DATA.email} or call +91 93******06. He's always open to discussing new opportunities!`;
    }
    
    // Hobbies / Fun
    if (lowerInput.includes("hobby") || lowerInput.includes("fun") || lowerInput.includes("interest") || lowerInput.includes("outside work")) {
        return "When not coding, Manish enjoys learning new technologies, improving personal projects, and exploring ways to make the web faster.";
    }

    // Pricing (Safe answer)
    if (lowerInput.includes("price") || lowerInput.includes("rate") || lowerInput.includes("cost") || lowerInput.includes("charge")) {
        return "Rates depend on the project scope and complexity. Please email your requirements for a custom quote!";
    }

    // Fallback
    return "I'm not sure about that. Try asking about 'skills', 'projects', 'services', 'resume', or 'contact info'!";
}
  


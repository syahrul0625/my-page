fetch('../../footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
})
.catch(error => console.error('Error fetching footer.html:', error));

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {    
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

let indexJob = 1;
setInterval(animateJob, 1500);

function animateJob() {
    const job = ['Software Engineer','Android Developer','Web Developer'];
    let span = document.querySelector('.job-text');

    span.textContent = job[indexJob];
    indexJob++;
    if (indexJob==3) {
        indexJob=0;
    }
    
}

ScrollReveal({ 
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200 
});

ScrollReveal().reveal('.home-content, .heading, .features-content img', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form, .contact-content, .paragraph', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img, .features h3', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content, .features p', { origin: 'right' });
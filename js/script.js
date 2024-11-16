function toggleImage() {
    const image = document.getElementById("toggleImage");
    if (!image.classList.contains("activeMenu")) {
        image.src = "assets/close.png";
        image.classList.add("activeMenu");
    }
    else {
        image.src = "assets/open.png";
        image.classList.remove("activeMenu");
    }
}

function createNavbar() {

    let BASE_URL = '/AlgoExpert';

    // Create main nav element
    const nav = document.createElement("nav");
    nav.className = "navbar navbar-expand-lg bg-body-tertiary sticky-top";

    // Create container div
    const container = document.createElement("div");
    container.className = "container-fluid";

    // Create logo
    const logo = document.createElement("h1");
    logo.className = "logo";
    logo.innerHTML = 'Algo<span class="highlight">Expert</span>';

    logo.addEventListener("click",()=>{
        window.location.href = `${BASE_URL}/?page=home`;
    })
    // Create navbar toggler button
    const toggler = document.createElement("button");
    toggler.className = "navbar-toggler";
    toggler.type = "button";
    toggler.setAttribute("data-bs-toggle", "collapse");
    toggler.setAttribute("data-bs-target", "#navbarNav");
    toggler.setAttribute("aria-controls", "navbarNav");
    toggler.setAttribute("aria-expanded", "false");
    toggler.setAttribute("aria-label", "Toggle navigation");
    toggler.setAttribute("onclick", "toggleImage()");

    const togglerImg = document.createElement("img");
    togglerImg.src = "./assets/open.png";
    togglerImg.id = "toggleImage";
    togglerImg.alt = "Toggle Button";
    toggler.appendChild(togglerImg);

    // Create navbar collapse div
    const collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse navbar-collapse";
    collapseDiv.id = "navbarNav";

    // Create nav list
    const ul = document.createElement("ul");
    ul.className = "navbar-nav";

    // Add nav items
    const navItems = [
        { text: "Home", href: `${BASE_URL}/`, class: "nav-link", ariaCurrent: "page" ,page_name : "home"},
        { text: "Playground", href: `${BASE_URL}/playground.html`, class: "nav-link",page_name : "playground" },
        { text: "Learn", href: `${BASE_URL}/learn.html`, class: "nav-link" ,page_name : "learn"},
    ];

    navItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "nav-item";

        const a = document.createElement("a");
        a.className = item.class;
        a.textContent = item.text;
        a.id = `${item.page_name}`;
        a.href = `${item.href}?page=${a.id}`;



        if (item.ariaCurrent) {
            a.setAttribute("aria-current", item.ariaCurrent);
        }

        li.appendChild(a);
        ul.appendChild(li);
    });

    // Append ul to collapseDiv
    collapseDiv.appendChild(ul);

    // Append elements to container
    container.appendChild(logo);
    container.appendChild(toggler);
    container.appendChild(collapseDiv);

    // Append container to nav
    nav.appendChild(container);

    // Append nav to body or a specific element
    document.querySelector(".header").appendChild(nav);
}

function createFooter() {
    // Create footer container
    const footer = document.querySelector(".footer");

    // Create footer content section
    const footerContent = document.createElement("div");
    footerContent.className = "footer-content";

    const footerLogo = document.createElement("h2");
    footerLogo.className = "footer-logo";
    footerLogo.innerHTML = '<span class="highlight">Algo</span>Expert';

    const footerCopyright = document.createElement("p");
    footerCopyright.className = "footer-copyright";
    footerCopyright.textContent = "© 2024-2025 All rights reserved.";

    footerContent.appendChild(footerLogo);
    footerContent.appendChild(footerCopyright);

    // Create social icons section
    const socialIcons = document.createElement("div");
    socialIcons.className = "social-icons";

    const socialIconsData = [
        { src: "./assets/github.png", alt: "Instagram", class: "social-icon",href:"https://github.com/Harish-Kushwah/AlgoExpert" },
        { src: "./assets/gmail.png", alt: "Facebook", class: "social-icon" ,href:"mailto:harishkushwah54321@gmail.com"},
        { src: "./assets/twitter.png", alt: "Twitter", class: "social-icon" ,href:"https://twitter.com/HarishKushwah_7"},
    ];

    socialIconsData.forEach(icon => {
        const a = document.createElement("a");
        a.href = icon.href;
        const img = document.createElement("img");
        img.src = icon.src;
        img.alt = icon.alt;
        img.className = icon.class;
        a.appendChild(img);
        socialIcons.appendChild(a);
    });

    // Append sections to footer
    footer.appendChild(footerContent);
    footer.appendChild(socialIcons);
}

function addClassToActiveLink(page_name) {
    const bars = document.querySelectorAll(".nav-link");
    for (let bar of bars) {
        bar.classList.remove("active-a");
    }
    document.getElementById(page_name).classList.add("active-a");
}

function activatePageLink() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_name = urlParams.get('page');
    addClassToActiveLink(page_name);
}

createNavbar();
createFooter();
activatePageLink();



// https://chat.openai.com/share/15899523-45b6-4bb2-8b88-573f07809296
// Scroll animations and loading
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25 // % of the height of the section
};

// Fade scroll sections in when scrolled into
const sections = document.querySelectorAll(".scroll-section");

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.target.id == "hero") return; // ignore main header

        let iframe = entry.target.querySelector("iframe[data-src]");
        const iframeWindow = iframe.contentWindow;
        const spinner = entry.target.querySelector(".spinner");

        if (entry.isIntersecting) {
            // Fade section in
            entry.target.classList.add("active");
            let allChildren = entry.target.getElementsByTagName("*");
            for (child of allChildren) {
                child.classList.add("active");
            }

            // Lazy load iframes
            if (iframe.src === "") {
                iframe.src = iframe.getAttribute("data-src");

                // Hide the spinner once the iframe has loaded.
                iframe.addEventListener("load", () => {
                    spinner.style.display = 'none';
                    iframe.classList.add("active");
                });
            }

            // Resume p5.js sketch
            if (iframeWindow && iframeWindow.loop) {
                iframeWindow.loop();
            }

        } else {
            // Fade section out
            entry.target.classList.remove("active");
            let allChildren = entry.target.getElementsByTagName("*");
            for (child of allChildren) {
                child.classList.remove("active");
            }
            // Pause p5.js sketch
            if (iframeWindow && iframeWindow.noLoop) {
                iframeWindow.noLoop();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

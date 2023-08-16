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
            entry.target.classList.add("fade-in");

            // Lazy load iframes
            if (iframe.src === "") {
                iframe.src = iframe.getAttribute("data-src");

                // Hide the spinner once the iframe has loaded.
                iframe.addEventListener("load", () => {
                    spinner.style.display = 'none';
                });
            }

            // Resume p5.js sketch functions
            if (iframeWindow && iframeWindow.loop) {
                iframeWindow.loop();
            }
        } else {
            entry.target.classList.remove("fade-in");
            // Pause p5.js sketch functions
            if (iframeWindow && iframeWindow.noLoop) {
                iframeWindow.noLoop();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

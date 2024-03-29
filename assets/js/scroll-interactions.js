// https://chat.openai.com/share/15899523-45b6-4bb2-8b88-573f07809296
// Scroll animations and loading
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25 // % of the height of the section
};

// Fade scroll sections in when scrolled into
const sections = document.querySelectorAll(".scroll-section");

const sectionObserver = new IntersectionObserver((entries, _observer) => {
    entries.forEach(entry => {
        // Update URL to this section's anchor
        if (entry.isIntersecting && window.history.pushState) {
            const anchor = entry.target.querySelector('a.section-anchor');
            let url = window.location.origin + window.location.pathname
            // Add the anchor, if there is one (there isn't one for the
            // hero. When scrolling to the hero, the url goes back to root)
            if (anchor) {
                const id = anchor.id
                url += '#' + id
            }
            window.history.pushState({}, '', url);
        }

        // Ignore main header for the rest of the effects
        if (entry.target.id == "hero") return;

        const iframe = entry.target.querySelector("iframe[data-src]");
        const iframeWindow = iframe.contentWindow;
        const spinner = entry.target.querySelector(".spinner");

        if (entry.isIntersecting) {
            // Fade section in
            entry.target.classList.add("active");
            let allChildren = entry.target.getElementsByTagName("*");
            for (child of allChildren) {
                if (child.classList.contains("spinner")) continue;
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

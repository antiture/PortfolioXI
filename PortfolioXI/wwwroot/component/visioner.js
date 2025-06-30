

window.enableGrabScroll = function (elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    el.addEventListener('mousedown', function (e) {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        scrollLeft = el.scrollLeft;
        scrollTop = el.scrollTop;
        el.classList.add('grabbing');

        function onMove(ev) {
            if (!isDragging) return;
            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;
            el.scrollLeft = scrollLeft - dx;
            el.scrollTop = scrollTop - dy;
        }

        function onUp() {
            isDragging = false;
            el.classList.remove('grabbing');
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });
};
window.enableDragOnly = function (id) {
    const container = document.getElementById(id);
    if (!container) return;

    const img = container.querySelector("img");
    if (!img) return;

    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function updateTransform() {
        const scale = parseFloat(img.dataset.scale || "1");
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        img.style.transformOrigin = "center center";
    }

    img.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    updateTransform();
};


window.updateImageScale = function (id, scale) {
    const imgElement = document.getElementById(id);
    if (!imgElement) return;
    imgElement.dataset.scale = scale;
    imgElement.style.transform = `scale(${scale})`;
    imgElement.style.transformOrigin = "center center";
};
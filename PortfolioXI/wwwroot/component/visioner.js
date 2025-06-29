window.enableGrabScroll = function (elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    const mouseDownHandler = function (e) {
        e.preventDefault();

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        scrollLeft = el.scrollLeft;
        scrollTop = el.scrollTop;

        el.classList.add('grabbing');
         

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.scrollLeft = scrollLeft - dx;
        el.scrollTop = scrollTop - dy;
    };

    const mouseUpHandler = function () {
        isDragging = false;
        el.classList.remove('grabbing');
        

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

     
    el.addEventListener('mousedown', mouseDownHandler);
};

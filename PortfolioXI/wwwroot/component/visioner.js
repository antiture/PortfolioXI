// 启用鼠标拖动滚动容器（Grab模式）
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

// 启用图像拖拽（Translate 模式，不滚动容器）
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

    // 加载完成后设置初始大小
    img.onload = () => {
        if (!img.dataset.initialWidth || !img.dataset.initialHeight) {
            img.dataset.initialWidth = img.offsetWidth;
            img.dataset.initialHeight = img.offsetHeight;
        }
        updateTransform();
    };

    // 若已加载
    if (img.complete) {
        if (!img.dataset.initialWidth || !img.dataset.initialHeight) {
            img.dataset.initialWidth = img.offsetWidth;
            img.dataset.initialHeight = img.offsetHeight;
        }
        updateTransform();
    }
};

window.updateImageSize = function (id, scale) {
    const img = document.getElementById(id);
    if (!img) return;

    // 如果未记录初始尺寸，则保存一次
    if (!img.dataset.initialWidth || !img.dataset.initialHeight) {
        img.dataset.initialWidth = img.offsetWidth;
        img.dataset.initialHeight = img.offsetHeight;
    }

    const baseWidth = parseFloat(img.dataset.initialWidth);
    const baseHeight = parseFloat(img.dataset.initialHeight);

    const newWidth = baseWidth * scale;
    const newHeight = baseHeight * scale;

    img.style.width = `${newWidth}px`;
    img.style.height = `${newHeight}px`;

    // 禁用 max 限制，避免自动缩回
    img.style.setProperty("max-width", "none", "important");
    img.style.setProperty("max-height", "none", "important");

    // 更新当前缩放值
    img.dataset.scale = scale;
};

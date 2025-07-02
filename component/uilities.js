window.responsiveResizeObserver = {
    observers: {},
    observe: function (dotNetRef, element, id) {
        if (!window.ResizeObserver) return;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                dotNetRef.invokeMethodAsync("OnResizeCallback", width);
            }
        });

        observer.observe(element);
        this.observers[id] = observer;
    },
    unobserve: function (id) {
        if (this.observers[id]) {
            this.observers[id].disconnect();
            delete this.observers[id];
        }
    }
};
window.detectMobile = function () {
    const el = document.getElementById("mobile-check");
    return window.getComputedStyle(el).display !== "none";
};
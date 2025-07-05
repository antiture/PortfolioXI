window.responsiveResizeObserver = {
  observers: {},
  observe: function (dotNetRef, element, id) {
    if (!window.ResizeObserver) return;

    const observer = new ResizeObserver((entries) => {
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
  },
};
window.themeHelper = {
  getThemeArt: function () {
    return localStorage.getItem("isDarkModeArt") === "true";
  },
  saveThemeArt: function (value) {
    localStorage.setItem("isDarkModeArt", value);
  },
  getThemeTech: function () {
    const key = "isDarkModeTech";
    let value = localStorage.getItem(key);

    if (value === null) {
      localStorage.setItem(key, "true"); // 默认暗色
      return true;
    }

    return value === "true";
  },
  saveThemeTech: function (value) {
    localStorage.setItem("isDarkModeTech", value);
  },
  applyMetaThemeTech: function (isDark) {
    const themeColor = document.querySelector("meta[name='theme-color']");
    const statusBar = document.querySelector(
      "meta[name='apple-mobile-web-app-status-bar-style']"
    );

    if (isDark) {
      if (themeColor) themeColor.setAttribute("content", "#32333d");
      if (statusBar) statusBar.setAttribute("content", "black-translucent");
    } else {
      if (themeColor) themeColor.setAttribute("content", "#ffffff");
      if (statusBar) statusBar.setAttribute("content", "default");
    }
  },

  applyMetaThemeArt: function (isDark) {
    const themeColor = document.querySelector("meta[name='theme-color']");
    const statusBar = document.querySelector(
      "meta[name='apple-mobile-web-app-status-bar-style']"
    );

    if (isDark) {
      if (themeColor) themeColor.setAttribute("content", "#32333d");
      if (statusBar) statusBar.setAttribute("content", "black-translucent");
    } else {
      if (themeColor) themeColor.setAttribute("content", "#ffffff");
      if (statusBar) statusBar.setAttribute("content", "default");
    }
  },
};
window.blazorCulture = {
  get: () => {
    let culture = localStorage.getItem("blazorCulture");
    if (!culture) {
      culture = navigator.language || "en-US";
      localStorage.setItem("blazorCulture", culture);
    }
    return culture;
  },
  set: (value) => localStorage.setItem("blazorCulture", value),
};

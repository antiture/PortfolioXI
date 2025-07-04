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
window.themeHelper = {
	getThemeArt: function () {
		return localStorage.getItem("isDarkModeArt") === "true";
	},
	saveThemeArt: function (value) {
		localStorage.setItem("isDarkModeArt", value);
	},
	getThemeTech: function () {
		return localStorage.getItem("isDarkModeTech") === "true";
	},
	saveThemeTech: function (value) {
		localStorage.setItem("isDarkModeTech", value);
	}
};

window.themeHelper = {
	applyMetaThemeTech: function (isDark) {
		const themeColor = document.querySelector("meta[name='theme-color']");
		const statusBar = document.querySelector("meta[name='apple-mobile-web-app-status-bar-style']");

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
		const statusBar = document.querySelector("meta[name='apple-mobile-web-app-status-bar-style']");

		if (isDark) {
			if (themeColor) themeColor.setAttribute("content", "#32333d");  
			if (statusBar) statusBar.setAttribute("content", "black-translucent");  
		} else {
			if (themeColor) themeColor.setAttribute("content", "#ffffff");
			if (statusBar) statusBar.setAttribute("content", "default");
		}
	}
};



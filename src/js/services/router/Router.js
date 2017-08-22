class Router {
	constructor(container) {
		this.routes = [];
		this.container = container;
		this.currentComponent = undefined;
	}

	addRoute(url, component) {
		const route = {
			url: url,
			component: component
		};

		this.routes.push(route);
	}

	initialize() {
		window.addEventListener('popstate', function(event) {
    		router.go(event.state, true);
		});

		if (this.routes.find( (x) => x.url === window.location.pathname) === undefined) {
		    router.go("/");
		} else {
			router.go(window.location.pathname);
		}
	}

	go(url, options) {
		console.log("go", url);
		const route = this.routes.find(x => x.url === url);
		if (route !== undefined) {
			if (this.currentComponent !== undefined) {
				this.currentComponent.destroy();
			}

			this.container.innerHTML = "";

			this.currentComponent = new route.component(this.container, this);
			this.currentComponent.initialize();
		}
		console.log(options);
		if (!options) {
			history.pushState(url, "", url);
		}
	}
}
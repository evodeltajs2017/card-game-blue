class Dashboard {
    constructor(container) {
        this.container = container;
    }

    initialize() {
        const div = document.createElement("div");
        div.innerHTML = "<h1 class='dashboard'>Dashboard</h1>";
        this.container.appendChild(div);
    }

    destroy() {}
}
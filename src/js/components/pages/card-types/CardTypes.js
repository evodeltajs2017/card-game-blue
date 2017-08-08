class CardTypes {
    constructor(container) {
        this.container = container;
    }

    initialize() {

        const repo = new CardTypeRepository();
        var receivedObj;
        var buttonNum;
        var searchText = "";
        const div = document.createElement("div");
        div.className = "view-type-container";
        repo.getData("").then((receivedObj) => {
            this.addAll(receivedObj);
            this.addEventToIndexButtons(repo, searchText);
            let buton = div.querySelector(".buton");
            buton.setAttribute("id", "off");
            buton.setAttribute("disabled", "true");


            div.querySelector(".view-type-search-button").addEventListener("click", () => {
                this.addEventToSearch(repo, searchText);
            });

            div.querySelector(".view-type-search-text").addEventListener("keyup", () => {
                if (event.keyCode == 13) {
                    this.addEventToSearch(repo, searchText);
                }
            });
        });
        let template = `
		<div class="view-type-headder">
            <h1>View Card Type</h1>
			<div class="view-type-search">
                <input type="search" class="view-type-search-text">
				<input class="view-type-search-button" value="Search" type="submit">
			</div>
		</div>

		<div class="view-type-content-container">
			<table class="view-type-table">
            </table>
		</div>
		<div class="view-type-under-table">
            <p class="view-type-under-text"></p>
            <div class="view-type-under-buttons"></div>
		</div>`;
        div.innerHTML = template;
        this.domElement = div;
        this.container.appendChild(div);
    }

    addAll(receivedObj) {
        this.createIndexButtons(receivedObj);
        this.fillTable(receivedObj);
        this.addEventToTableButtons();

    }


    addEventToSearch(repo, searchText) {
        searchText = this.domElement.querySelector(".view-type-search-text").value;
        this.domElement.querySelector(".view-type-search-text").value = "";
        repo.getData(searchText).then(receivedObj => {
            this.addAll(receivedObj);
            if (searchText !== "")
                this.createIndexButtons(receivedObj);
            this.addEventToIndexButtons(repo, searchText);
            this.disableButton();
        });
    }

    addEventToTableButtons() {
        let elementList = this.domElement.querySelectorAll(".table-edit,.table-delete");
        for (let i = 0; i < elementList.length; i++) {
            elementList[i].addEventListener("click", () => {
                let id = elementList[i].value;
                console.log(id);
            });
        };
    }

    addEventToIndexButtons(repo, searchText) {
        let elementList = this.domElement.querySelectorAll(".buton");
        for (let i = 0; i < elementList.length; i++) {
            elementList[i].addEventListener("click", () => {
                repo.getData(searchText, elementList[i].value).then(receivedObj => {
                    this.fillTable(receivedObj);
                    this.addEventToTableButtons();
                    this.createShowingText(receivedObj);
                });
                this.disableButton(event.target);
            });
        };
    }


    disableButton(element = this.domElement.querySelector(".buton")) {
        let buton = document.getElementById("off");
        if (buton != undefined) {
            buton.removeAttribute("disabled");
            buton.removeAttribute("id");
        }
        element.setAttribute("id", "off");
        element.setAttribute("disabled", "true");
    }

    createShowingText(receivedObj) {
        this.domElement.querySelector(".view-type-under-text").innerHTML = `Showing ${receivedObj.items.length} out of ${receivedObj.count}`;
    }

    createIndexButtons(receivedObj) {
        this.createShowingText(receivedObj);

        let buttonNum = Math.ceil(receivedObj.count / 10);
        this.domElement.querySelector(".view-type-under-buttons").innerHTML = "";
        for (let i = 1; i <= buttonNum; i++) {
            this.domElement.querySelector(".view-type-under-buttons").innerHTML += `<button value="${i}" class="buton">${i}</button>`;
        }
    }


    fillTable(receivedObj) {
        let tableTemplate = `
                <tr>
					<th style="width:20px">ID</th>
					<th>Name</th>
					<th style="width:60px">Cost</th>
					<th style="width:60px">Damage</th>
					<th style="width:60px">Health</th>
					<th style="width:118px">Actions</th>
                </tr>`;

        const renderFuncs = {
            "ID": rowData => `<td>${rowData}</td>`,
            "Name": rowData => `<td style=\"text-align:left;padding-left:1%\">${rowData}</td>`,
            "Cost": rowData => `<td>${rowData}</td>`,
            "Damage": rowData => `<td>${rowData}</td>`,
            "Health": rowData => `<td>${rowData}</td>`,
            "Actions": rowData => `<td bgcolor=\"#fff\"><button class="table-edit" value="${rowData}">Edit</button><button class="table-delete" value="${rowData}" >Delete</button></td>`
        };


        for (let i = 0; i < receivedObj.items.length; i++) {
            if (i % 2 !== 0)
                tableTemplate += "<tr>";
            else
                tableTemplate += "<tr bgcolor=\"#778e97\" style=\"color:white\">";

            tableTemplate += renderFuncs.ID(receivedObj.items[i].cod);
            tableTemplate += renderFuncs.Name(receivedObj.items[i].name);
            tableTemplate += renderFuncs.Cost(receivedObj.items[i].cost);
            tableTemplate += renderFuncs.Damage(receivedObj.items[i].damage);
            tableTemplate += renderFuncs.Health(receivedObj.items[i].health);
            tableTemplate += renderFuncs.Actions(receivedObj.items[i].cod);

            tableTemplate += "</tr>";
        }
        this.domElement.querySelector(".view-type-table").innerHTML = tableTemplate;
    }
    destroy() {}
}
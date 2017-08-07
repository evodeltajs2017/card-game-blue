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
        repo.getAllData((receivedObj) => {
            this.addAll(receivedObj);

            let elementList = document.querySelectorAll(".buton");
            for (let i = 0; i < elementList.length; i++) {
                console.log(`Am pus la butonul ${i}`);
                elementList[i].addEventListener("click", () => {
                    repo.getPagedData(elementList[i].value, searchText, (receivedObj) => {
                        this.fillTable(receivedObj);
                        this.addEventToTableButtons();
                    });
                });
            };

            document.querySelector(".view-type-search-button").addEventListener("click", () => {
                searchText = document.querySelector(".view-type-search-text").value;
                document.querySelector(".view-type-search-text").value = "";
                repo.getSearchData(searchText, (receivedObj) => {
                    this.addAll(receivedObj);
                    if (searchText !== "") this.createSearchButtons(receivedObj);
                    let elementList = document.querySelectorAll(".buton");
                    for (let i = 0; i < elementList.length; i++) {
                        console.log(`Am pus la butonul ${i}`);
                        elementList[i].addEventListener("click", () => {
                            repo.getPagedData(elementList[i].value, searchText, (receivedObj) => {
                                this.fillTable(receivedObj);
                                this.addEventToTableButtons();
                            });
                        });
                    };

                });
            });

            document.querySelector(".view-type-search-text").addEventListener("keyup", () => {
                if (event.keyCode == 13) {
                    searchText = document.querySelector(".view-type-search-text").value;
                    document.querySelector(".view-type-search-text").value = "";
                    repo.getSearchData(searchText, (receivedObj) => {
                        this.addAll(receivedObj);
                        if (searchText !== "") this.createSearchButtons(receivedObj);
                        let elementList = document.querySelectorAll(".buton");
                        for (let i = 0; i < elementList.length; i++) {
                            console.log(`Am pus la butonul ${i}`);
                            elementList[i].addEventListener("click", () => {
                                repo.getPagedData(elementList[i].value, searchText, (receivedObj) => {
                                    this.fillTable(receivedObj);
                                    this.addEventToTableButtons();
                                });
                            });
                        };

                    });
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
		</div>
		`;


        div.innerHTML = template;
        this.container.appendChild(div);



    }




    addAll(receivedObj) {
        this.createAllButtons(receivedObj);
        this.fillTable(receivedObj);
        this.addEventToTableButtons();

    }


    addEventToTableButtons() {
        let elementList = document.querySelectorAll(".table-edit");
        for (let i = 0; i < elementList.length; i++) {
            elementList[i].addEventListener("click", () => {
                let id = elementList[i].value;
                console.log(id);
            });
        };

        elementList = document.querySelectorAll(".table-delete");
        for (let i = 0; i < elementList.length; i++) {
            elementList[i].addEventListener("click", () => {
                let id = elementList[i].value;
                console.log(id);
            });
        };
    }


    createAllButtons(receivedObj) {

        document.querySelector(".view-type-under-text").innerHTML = `Showing 10 out of ${receivedObj.count}`;
        let buttonNum = Math.ceil(receivedObj.count / 10);
        document.querySelector(".view-type-under-buttons").innerHTML = "";
        for (let i = buttonNum; i > 0; i--) {
            document.querySelector(".view-type-under-buttons").innerHTML += `<button value="${i}" class="buton">${i}</button>`;
        }
    }

    createSearchButtons(receivedObj) {
        if (receivedObj.items.length < 10) document.querySelector(".view-type-under-text").innerHTML = `Showing ${receivedObj.items.length} out of ${receivedObj.searchCount}`;
        else
            document.querySelector(".view-type-under-text").innerHTML = `Showing 10 out of ${receivedObj.searchCount}`;
        let buttonNum = Math.ceil(receivedObj.searchCount / 10);
        document.querySelector(".view-type-under-buttons").innerHTML = "";
        for (let i = buttonNum; i > 0; i--) {
            document.querySelector(".view-type-under-buttons").innerHTML += `<button value="${i}" class="buton">${i}</button>`;
        }
    }

    fillTable(receivedObj) {
        console.log(receivedObj);
        let tableTemplate = `
                <tr>
					<th style="width:20px">ID</th>
					<th>Name</th>
					<th style="width:60px">Cost</th>
					<th style="width:60px">Damage</th>
					<th style="width:60px">Health</th>
					<th style="width:118px">Actions</th>
				</tr>`;
        for (let i = 0; i < receivedObj.items.length; i++) {
            if (i % 2 !== 0)
                tableTemplate += "<tr>";
            else
                tableTemplate += "<tr bgcolor=\"#778e97\" style=\"color:white\">";
            for (let j = 0; j < 6; j++) {
                switch (j) {
                    case 0:
                        {
                            tableTemplate += `<td>${receivedObj.items[i].cod}</td>`;
                            break;
                        }
                    case 1:
                        {
                            tableTemplate += `<td style=\"text-align:left\">${receivedObj.items[i].name}</td>`;
                            break;
                        }
                    case 2:
                        {
                            tableTemplate += `<td>${receivedObj.items[i].cost}</td>`;
                            break;
                        }
                    case 3:
                        {
                            tableTemplate += `<td>${receivedObj.items[i].damage}</td>`;
                            break;
                        }
                    case 4:
                        {
                            tableTemplate += `<td>${receivedObj.items[i].health}</td>`;
                            break;
                        }
                    case 5:
                        {
                            tableTemplate += `<td bgcolor=\"#fff\"><button class="table-edit" value="${ receivedObj.items[i].cod }">Edit</button><button class="table-delete" value="${receivedObj.items[i].cod}" >Delete</button></td>`;
                            break;
                        }
                }
            }
            tableTemplate += "</tr>";
        }
        document.querySelector(".view-type-table").innerHTML = tableTemplate;


    }

    destroy() {}
}
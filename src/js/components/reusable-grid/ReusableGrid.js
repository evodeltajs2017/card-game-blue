class ReusableGrid {

	constructor(container, pageTitle, url, fields, searchByField){
		this.url = url;
		this.pageTitle = pageTitle;
        this.fields = fields;
		this.searchByField = searchByField;
		this.container = container;
      		
	}

	initialize() {
        let searchText = "";
        this.buildViewContainer();
		this.getData("").then((receivedObj) => {
			
			this.addAll(receivedObj);
            this.addEventToIndexButtons(searchText);

            this.domElement.querySelector(".view-type-search-button").addEventListener("click", () => {
            this.addEventToSearch(searchText);
            });
		});		
	}

    addAll(receivedObj) {
        this.buildTable(receivedObj);
        this.createIndexButtons(receivedObj);
      //  this.addEventToEditButtons();
      //  this.addEventToDeleteButtons(repo);
    }

	getData(searchText, page = 1) {
        return new Promise((resolve, reject) => {
            var myPagedRequest = new XMLHttpRequest();
            var URL = `http://localhost:3000/${this.url}?pageIndex=${page}&pageSize=10`;

            if (searchText != "" && searchText != undefined) {
                URL += `&search=${searchText}`;
            }

            myPagedRequest.open('GET', URL, true);

            myPagedRequest.onreadystatechange = function() {

                if (myPagedRequest.readyState === 4) {

                    let receivedObj = JSON.parse(myPagedRequest.response);
                    resolve(receivedObj);
                }
            }

            myPagedRequest.send();
        });
    }

    buildViewContainer(){
        let template = `
            <div class="view-type-headder">
                <h1>${this.pageTitle}</h1>
                <div class="view-type-search">
                    <input type="search" class="view-type-search-text">
                    <input class="view-type-search-button" value="Search" type="submit">
                </div>
            </div>

            <div class="view-type-content-container">
            </div>

            <div class="view-type-under-table">
                <p class="view-type-under-text"></p>
                <div class="view-type-under-buttons"></div>
            </div>`;

        const div = document.createElement("div");
        div.className = "view-type-container";
        div.innerHTML = template;
        this.domElement = div;
        this.container.appendChild(div);




    }

    buildTable(receivedObj){
       	let tableHeader = "";
    	let tableBody = "";

    	for (let i = 0; i < this.fields.length; i++) {
       		tableHeader += `<th style="width:${this.fields[i].width}px;">${this.fields[i].displayName}</th>`;
    	}
            tableHeader += `<th style="300px;">Action Buttons</th>`;

		for (let j=0; j < receivedObj.items.length; j++){
			if (j % 2 == 0)				
				tableBody += `<tr bgcolor="#4d76ce" style="color:white">`;			
			else
				tableBody += `<tr>`;

			for (let i=0; i < this.fields.length; i++){
				let category = this.fields[i].fieldName;
  				tableBody += `<td>${this.fields[i].render(receivedObj.items[j][category])} </td>`;

  			}
  			tableBody += `<td>
                            <button class="action-button edit" value="Edit">Edit</button>
                            <button class="action-button delete" value="Delete" >Delete</button></td>`;
  			tableBody += `</tr>`;
    	}

    	let tableContainer =`<table class="grid-table">
    						<thead class="table-header">
    							${tableHeader}
    						</thead>
    						<tbody class="table-body">
    							${tableBody}
   							</tbody>
    						</table>`;

        this.domElement.querySelector(".view-type-content-container").innerHTML = tableContainer;
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

    addEventToIndexButtons(searchText) {
        let elementList = this.domElement.querySelectorAll(".buton");
        for (let i = 0; i < elementList.length; i++) {
            elementList[i].addEventListener("click", () => {
                console.log(elementList[i].value);
                this.getData(searchText, elementList[i].value).then(receivedObj => {
                    this.buildTable(receivedObj);
               //     this.addEventToEditButtons();
               //     this.addEventToDeleteButtons(repo);
                    this.createShowingText(receivedObj);
                });
           //     this.disableButton(event.target);
            });
        };
    }

    addEventToSearch(searchText) {
        searchText = this.domElement.querySelector(".view-type-search-text").value;
        this.domElement.querySelector(".view-type-search-text").value = "";
        this.getData(searchText).then(receivedObj => {
            this.addAll(receivedObj);
            if (searchText !== "")
                this.createIndexButtons(receivedObj);
            this.addEventToIndexButtons(searchText);
        //    this.disableButton();
        });
    }




	//destroy{};
}
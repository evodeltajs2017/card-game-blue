class CardTypes {
    constructor(container) {
        this.container = container;
    }

    initialize() {

        var receivedObj;
        var buttonNum;
        const div = document.createElement("div");
        div.className = "view-type-container";
        myRequest.send();
        let template = `
		<div class="view-type-headder">
            <h1>View Card Type</h1>
			<div class="view-type-search">
				<input type="search" value="Search">
				<input type="submit">
			</div>
		</div>

		<div class="view-type-content-container">
			<table class="view-type-table">
            </table>
		</div>
		<div class="view-type-under-table">
		<p class="view-type-under-text"></p>
		</div>
		`;


        div.innerHTML = template;
        this.container.appendChild(div);

    }

    destroy() {}
}



var myRequest = new XMLHttpRequest();

myRequest.open('GET', 'http://localhost:3000/view-card-type', true);

myRequest.onreadystatechange = function() {

    if (myRequest.readyState === 4) {
        receivedObj = JSON.parse(myRequest.response);
        document.querySelector(".view-type-under-text").innerHTML = `Showing 10 out of ${receivedObj.count}`;
        buttonNum = Math.ceil(receivedObj.count / 10);
        for (let i = buttonNum; i > 0; i--) {
            document.querySelector(".view-type-under-table").innerHTML += `<button>${i}</button>`;
        }
        fillTable(receivedObj);
        console.log(receivedObj);
    }
};

function fillTable(receivedObj) {
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
    for (let i = 0; i < 10; i++) {
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
                        tableTemplate += "<td bgcolor=\"#fff\"><button>Edit</button><button>Delete</button></td>";
                        break;
                    }
            }
        }
        tableTemplate += "</tr>";
    }
    document.querySelector(".view-type-table").innerHTML += tableTemplate;
}
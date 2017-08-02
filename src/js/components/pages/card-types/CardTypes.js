class CardTypes {
	constructor(container) {
		this.container = container;
	}

	initialize() {
		const div = document.createElement("div");
		div.className = "view-type-container";
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
				<tr>
					<th style="width:20px">ID</th>
					<th>Name</th>
					<th style="width:60px">Cost</th>
					<th style="width:60px">Damage</th>
					<th style="width:60px">Health</th>
					<th style="width:118px">Actions</th>
				</tr>
				`

		for(let i=0;i<10;i++){
			if(i%2!==0)
				template += "<tr>";
			else
				template +="<tr bgcolor=\"#565656\" style=\"color:white\">";
			for(let j=0;j<6;j++){
				if(j===5)
				template += "<td><button>Edit</button><button>Delete</button></td>";
				else
					if(j===1)
						template += "<td style=\"text-align:left\">CardName</td>";
					else	
						template += "<td>" + j + "</td>";
			}
			template += "</tr>";
		}

		template +=
		`	</table>
		</div>

		<div class="view-type-under-table">
		<p>Showing 10 out of 23</p>
		`
		for(let i=6;i>0;i--){
			template+=`<button>${i}</button>`;
		}
		template +=
		`
		</div>
		`;
		
		
		div.innerHTML = template;
		this.container.appendChild(div);
	}

	destroy() {
	}
}
class ViewDecks {
	constructor(container) {
        this.container = container;
    }

    initialize() {

    	const fields = [{
	    					fieldName : "cod",
	    					displayName: "cod",
	    					width: 100,
	    					render: rowData => `<div>${rowData}</div>`
	    				},
    					{
	    					fieldName : "name",
	    					displayName: "Nume",
	    					width: 100,
	    					render: rowData => `<div">${rowData}</div>`
    					}];
    	
    	const theGrid = new ReusableGrid(this.container,"View Decks", "view-decks", fields, 1);
    	theGrid.initialize();

    }

    destroy() {
    		//TBD
    }
}
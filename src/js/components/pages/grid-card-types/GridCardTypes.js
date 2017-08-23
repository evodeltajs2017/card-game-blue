class GridCardTypes {
	constructor(container) {
        this.container = container;
    }

    initialize() {

    	const fields = [{
	    					fieldName : "cod",
	    					displayName: "Id",
	    					width: 100,
	    					render: rowData => `<div>${rowData}</div>`
	    				},
    					{
	    					fieldName : "name",
	    					displayName: "Nume",
	    					width: 100,
	    					render: rowData => `<div>${rowData}</div>`
    					},
                        {
                            fieldName : "cost",
                            displayName: "Cost",
                            width: 100,
                            render: rowData => `<div>${rowData}</div>`
                        },
                        {
                            fieldName : "damage",
                            displayName: "Damage",
                            width: 100,
                            render: rowData => `<div>${rowData}</div>`
                        },
                        {
                            fieldName : "health",
                            displayName: "Health",
                            width: 100,
                            render: rowData => `<div>${rowData}</div>`
                        }];
    	
    	const theGrid = new ReusableGrid(this.container,"View Card Types (with Grid)", "view-card-type", fields, 1);
    	theGrid.initialize();

    }

    destroy() {
    		//TBD
    }
}
class ConstructDeckRepository {
    constructor() {}

    getData(){

        return new Promise((resolve, reject) => {
            var myRequest = new XMLHttpRequest();
            var URL = `http://localhost:3000/addnewdeck`;

            
            myRequest.open('GET', URL, true);

            myRequest.onreadystatechange = function() {

                if (myRequest.readyState === 4) {

                    let receivedObj = JSON.parse(myRequest.response);
                    resolve(receivedObj);
                }
            }

            myRequest.send();
        });
    
    }

    postNewDeck(data) {
        return new Promise((resolve, reject) =>{
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:3000/addnewdeck", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 )
                if (xhr.status == 200){ 
                    console.log(this.status);
                    resolve(xhr.responseText, this.status);
                
                } else {
                    reject(xhr.responseText, this.status);  
                }           
        }

        xhr.send(data); 
        }); 
    }



}
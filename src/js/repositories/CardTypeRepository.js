class CardTypeRepository {
    constructor() {}

    getData(searchText, page = 1) {
        return new Promise((resolve, reject) => {
            var myPagedRequest = new XMLHttpRequest();
            var URL = `http://localhost:3000/view-card-type?pageIndex=${page}&pageSize=10`;

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

    deleteCard(id) {
        return new Promise((resolve, reject) => {
            var deleteRequest = new XMLHttpRequest();

            var body = { cardTypeId: id };
            var URL = `http://localhost:3000/view-card-type`;

            deleteRequest.open('POST', URL, true);
            deleteRequest.setRequestHeader("Content-Type", "application/json");
            deleteRequest.onreadystatechange = function() {

                if (deleteRequest.readyState === 4) {

                    let receivedObj = JSON.parse(deleteRequest.response);
                    resolve(receivedObj);
                }
            }

            deleteRequest.send(JSON.stringify(body));
        });
    }


}
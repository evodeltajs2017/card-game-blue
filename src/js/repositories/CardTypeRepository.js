class CardTypeRepository {
    constructor() {}

    getData(searchText, callback, page = 1) {
        var myPagedRequest = new XMLHttpRequest();
        var URL = `http://localhost:3000/view-card-type?pageIndex=${page}&pageSize=10`;

        if (searchText != "" && searchText != undefined) {
            URL += `&search=${searchText}`;
        }

        myPagedRequest.open('GET', URL, true);

        myPagedRequest.onreadystatechange = function() {

            if (myPagedRequest.readyState === 4) {

                let receivedObj = JSON.parse(myPagedRequest.response);
                callback(receivedObj);
            }
        }

        myPagedRequest.send();
    }



}
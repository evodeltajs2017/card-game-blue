class CardTypeRepository {
    constructor() {}

    getAllData(callback) {
        var myMainRequest = new XMLHttpRequest();

        myMainRequest.open('GET', `http://localhost:3000/view-card-type?pageIndex=${1}&pageSize=10&search=${""}`, true);

        myMainRequest.onreadystatechange = function() {

            if (myMainRequest.readyState === 4) {

                let receivedObj = JSON.parse(myMainRequest.response);

                callback(receivedObj);
            }
        }

        myMainRequest.send();
    }

    getPagedData(page, searchText, callback) {
        var myPagedRequest = new XMLHttpRequest();
        myPagedRequest.open('GET', `http://localhost:3000/view-card-type?pageIndex=${page}&pageSize=10&search=${searchText}`, true);

        myPagedRequest.onreadystatechange = function() {

            if (myPagedRequest.readyState === 4) {

                let receivedObj = JSON.parse(myPagedRequest.response);


                callback(receivedObj);
            }
        }

        myPagedRequest.send();
    }

    getSearchData(word, callback) {
        var mySearchRequest = new XMLHttpRequest();
        mySearchRequest.open('GET', `http://localhost:3000/view-card-type?pageIndex=${1}&pageSize=10&search=${word}`, true);

        mySearchRequest.onreadystatechange = function() {

            if (mySearchRequest.readyState === 4) {

                let receivedObj = JSON.parse(mySearchRequest.response);


                callback(receivedObj);
            }
        }

        mySearchRequest.send();
    }

}
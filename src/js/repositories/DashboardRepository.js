class DashboardRepository {
    constructor() {}

    getCardTypeList() {
        return new Promise((resolve, reject) => {
            var myPagedRequest = new XMLHttpRequest();
            var URL = `http://localhost:3000/play-game`;

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

}
"use strict";

let pattern = /^[A-Za-z-'\.]+ [A-Za-z-'\.]+$/i;
// document.getElementById("Button").disabled = true;

let performSeatLookUp = () => {

    let fullName;
    if(document.getElementById('fullName').value) {
        fullName = document.getElementById('fullName').value.trim();
        // document.getElementById("Button").disabled = false;
    }

    if(pattern.test(fullName) === true) {
        //const envUrl = (process.env.NODE_ENV ? PRODUCTION_URL : BASE_URL);
        const envUrl = window.location.origin;

        let url = envUrl  + '/seatlookup/' + fullName;

        //make the request
        return makeRequest(url, 'GET');
    } else {
        document.getElementById('errMessage').innerHTML = `Please enter valid name`;
    }

}

let makeRequest = (url, method) => {
    let xhr = new XMLHttpRequest();

    let promise = new Promise((resolve, reject) => {
        xhr.open(method, url);
        xhr.onload = function() {
            if(xhr.status === 200){
                console.log('xhr response --- ' , xhr.response);
                resolve(JSON.parse(xhr.response));
            } else if(xhr.status === 500){
                reject(xhr.response);
            } else {
                reject(xhr.err);
            }
        }
    });

    xhr.send();
    return promise;
};


let onSubmit = () => {
    performSeatLookUp()
        .then((lookUpResult) => {
            // document.getElementById('message1').innerHTML = `${lookUpResult.name} is seated on Seat ${lookUpResult.seat} Floor ${lookUpResult.floor}`;
            document.getElementById('message1').innerHTML = `${lookUpResult.name} is seated on`;
            document.getElementById('message2').innerHTML = `Seat ${lookUpResult.seat}`;
            document.getElementById('message3').innerHTML = `Floor ${lookUpResult.floor}`;

        })
        .catch((err) => {
            document.getElementById('errMessage').innerHTML = `${err}`;
        });
}



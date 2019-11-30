"use strict";

const pattern = /^[A-Za-z-'\.]+ [A-Za-z-'\.]+$/i;

let performSeatLookUp = () => {

    let fullName;
    if(document.getElementById('fullName').value) {
        fullName = document.getElementById('fullName').value.toLowerCase().trim();
    } else {
        return new Promise((resolve, reject) => {
            reject(`Please enter valid name`) ;
        });
    }

    if(pattern.test(fullName) === true) {
        const envUrl = window.location.origin;

        const url = envUrl  + '/seatlookup/' + fullName;

        //make the request
        return makeRequest(url, 'GET');
    } else {
        return new Promise((resolve, reject) => {
            reject(`Please enter valid name`) ;
        });
    }

}

let makeRequest = (url, method) => {
    const xhr = new XMLHttpRequest();

    const promise = new Promise((resolve, reject) => {
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
            populateSeatMessage(lookUpResult);
            hideErrorMessage();
        })
        .catch((err) => {
            populateErrorMessage(err);
            hideSeatMessage();
        });
};

let populateSeatMessage = (lookUpResult) => {
    document.getElementById('successMessageContainer').className="flex-container";
    document.getElementById('message1').innerHTML = `${lookUpResult.name} is seated on`;
    document.getElementById('message2').innerHTML = `Floor ${lookUpResult.floor}`;
    document.getElementById('message3').innerHTML = `Seat ${lookUpResult.seat}`;
};

let hideErrorMessage = () => {
    document.getElementById('errorMessageContainer').className="hide";
};

let populateErrorMessage = (err) => {
    document.getElementById('errorMessageContainer').className="flex-container";
    document.getElementById('errMessage').innerHTML = `${err}`;
};

let hideSeatMessage = () => {
    document.getElementById('successMessageContainer').className="hide";
};

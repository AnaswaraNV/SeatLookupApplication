let performSeatLookUp = () => {
    let fullName = document.getElementById('fullName').value;
    let url = BASE_URL  + 'seatlookup/' + fullName;
    return makeRequest(url, 'GET');
}

let makeRequest = (url, method) => {
    let xhr = new XMLHttpRequest();

    let promise = new Promise((resolve, reject) => {
        xhr.open(method, url);
        xhr.onload = function() {
            if(xhr.status === 200){
                console.log('xhr response --- ' , xhr.response);
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
            console.log('here');
            document.getElementById('result-container').innerHTML = `${lookUpResult.name} is seated on Seat ${lookUpResult.seat}
                and Floor ${lookUpResult.floor}`;
        })
        .catch(() => {
            document.getElementById('result-container').innerHTML = `This employee doesn't exist`;
        });
}



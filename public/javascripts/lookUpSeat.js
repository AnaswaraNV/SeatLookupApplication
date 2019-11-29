let performSeatLookUp = () => {
    let xhr = new XMLHttpRequest();
    let fullName = document.getElementById('fullName').value;

    let seatLookupPromise = new Promise((resolve, reject) => {
        xhr.open('GET', BASE_URL  + 'seatlookup/' + fullName);
        xhr.onload = function() {
            if(xhr.status === 200){
                console.log('xhr response --- ' , xhr.response);
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.err);
            }
        }
    });

    xhr.send();
    return seatLookupPromise;
}


let onSubmit = () => {
    performSeatLookUp()
        .then((lookUpResult) => {
            document.getElementById('result-container').innerHTML = `This employee is in Seat ${lookUpResult.seat}
                and Floor ${lookUpResult.floor}`;
        })
        .catch(() => {
            document.getElementById('result-container').innerHTML = `This employee doesn't exist`;
        });
}



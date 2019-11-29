// let display = () => {
//     alert('display');
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://localhost:3000/seatlookup');
//     xhr.onload = function() {
//         if(xhr.status === 200){
//             console.log(xhr.response);
//         }
//     }
//     xhr.send();
// }
let display = () => {
    alert('display');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/seatlookup/dani corn');
    xhr.onload = function() {
        if(xhr.status === 200){
            console.log(xhr.response);
        }
    }
    xhr.send();
}


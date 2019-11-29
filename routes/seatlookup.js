// import {SeatDetail} from "../model/SeatDetail";

const express = require('express');
const router = express.Router();
let employeeInfo = require("../resources/MOCK_DATA.json");
let employeeMap = createEmployeeMap();

/* GET Seat Lookup page. */
// router.get('/', function(req, res, next) {
//     const fullName = req.query.fullName;
//     res.send('seatLookUp');
// });

router.get('/:fullName', function(req, res, next) {
    console.log('Username param was detected: ', req.params.fullName);

    let employeeSeatResult = findEmployee(req.params.fullName);
    console.log('seat--> ' , employeeSeatResult['seat']);
    res.json(employeeSeatResult);
});

function findEmployee(fullName) {
    for (let [key, value] of employeeMap) {
        console.log(key + ' => ' + ' seat = ' + value['seat'] + ' , floor = ' + value['floor']);

        if(key === fullName) {
            return value;
        }
    }
    return null;
}

function createEmployeeMap() {
    let employeeMap = new Map();

    let result = employeeInfo.forEach((emp)=> {
        let firstName = emp['first_name'].toLowerCase();
        let lastName = emp['last_name'].toLowerCase();
        let seat = emp['seat'];
        let floor = emp['floor'];

        let fullName = firstName + ' ' + lastName;
        let seatDetails = {seat: seat, floor: floor};
        // let seatDetails = new SeatDetail(seat, floor);

        employeeMap.set(fullName, seatDetails);
    });
    return employeeMap;
}


module.exports = router;

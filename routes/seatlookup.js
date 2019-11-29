// import {SeatDetail} from "../model/SeatDetail";
let pattern = /^[A-Za-z-'\.]+ [A-Za-z-'\.]+$/i;

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

    let fullName = req.params.fullName;

    if(pattern.test(fullName) === true) {
        let employeeSeatResult = findEmployee(fullName);
        if(employeeSeatResult === null) {
            // res.send(`Sorry, Cannot find ${fullName} in the System` );
            res.status(500).send(`Sorry, cannot find ${fullName} in the system`);
        } else {
            employeeSeatResult.name = fullName.split(" ", 1).toString();
            console.log('name--> ' , employeeSeatResult['name']);
            res.json(employeeSeatResult);
        }
    } else {
        res.send(500).send('Please enter valid name');
    }
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

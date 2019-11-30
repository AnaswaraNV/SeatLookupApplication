const pattern = /^[A-Za-z-'\.]+ [A-Za-z-'\.]+$/i;

const express = require('express');
const router = express.Router();
const employeeInfo = require("../resources/MOCK_DATA.json");
let employeeMap = createEmployeeMap();


router.get('/:fullName', function(req, res, next) {

    let fullName = req.params.fullName;

    if(pattern.test(fullName) === true) {
        let employeeSeatResult = findEmployee(fullName);
        if(employeeSeatResult === null) {
            res.status(500).send(`Sorry, cannot find ${fullName} in the system`);
        } else {
            employeeSeatResult.name = fullName
                                        .split(" ", 1)
                                        .toString()
                                        .replace(/^\w/, c => c.toUpperCase());
            res.json(employeeSeatResult);
        }
    } else {
        res.send(500).send('Please enter valid name.');
    }
});


// find employee from key value pair
let findEmployee = (fullName) => {
    for (let [key, value] of employeeMap) {
        if(key === fullName) {
            return value;
        }
    }
    return null;
};


// Create an employee map from the json file
function createEmployeeMap() {
    let employeeMap = new Map();

    let result = employeeInfo.forEach((emp)=> {
        let firstName = emp['first_name'].toLowerCase();
        let lastName = emp['last_name'].toLowerCase();
        let seat = emp['seat'];
        let floor = emp['floor'];

        let fullName = firstName + ' ' + lastName;
        let seatDetails = {seat: seat, floor: floor};

        employeeMap.set(fullName, seatDetails);
    });
    return employeeMap;
};


module.exports = router;

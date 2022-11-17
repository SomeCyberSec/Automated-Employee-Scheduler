const express = require('express');
const router = express.Router();
const db = require("../db.js");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended : true }));

// POST and GET admin/main page.
router.post('/main', function(req, res, next) {
    let val = req.body;
    let userName = val.userName;
    let userPassword = val.userPassword;
    let query = 'Select * From user where uid=? AND upassword=?';
    
  db.query(query, [userName, userPassword], function(error, data) {
    if(error) {
      console.log('login failed, query error');
      throw error;
    }
    else if ( data.length > 0) {
      console.log('user %s login successfully', userName);

      res.render('main');
      //res.redirect('/main'); // after fix auth system should use this to prevent resubmit (post/redir/get)
    }
    else {
      console.log('user %s login failed, no matched credential', userName);

      res.end('login unsuccessfully, please return');
    }
  })
});

// get method just for testing purpose
// GET current schedule page
router.get('/currentSchedule', function(req, res, next) {
  let query = "SELECT isscheduled.eid, name, epos, DATE_FORMAT(start, '%m/%d') as date, DATE_FORMAT(start, '%w') as day, DATE_FORMAT(start, '%H:%i') as start_time, DATE_FORMAT(end, '%H:%i') as end_time FROM employee, isscheduled, shift WHERE isscheduled.eid = employee.eid AND isscheduled.sid = shift.sid order by name;";

  db.query(query, function (error, results) {
    if(error) {
      console.log('query error');
      throw error;
    }

    let prevEid; // Prevent duplicate employees
    let i; // shifts index for each employee
    let employee_sched = []; // a list of employee and their shifts
    let shifts = []; // a list of shift for a employee
    let employee; // employee object

    results.forEach(element => {
      if (element.eid != prevEid){ // push the empolyee and it shifts sets when changing to an new employee
        pair = {
            "employee": employee,
            "shifts": shifts
        };
        employee_sched.push(pair);
        shifts = [];
        i = 0;
      }

        employee = { // other employee attributes can be added later as needed
          "eid": element.eid, // eid will not be needed in UI, this is just for maximize test data passing
          "name": element.name,
          "epos": element.epos
        };

        shifts[i] = {    
          "schedule": element.start_time + " - " + element.end_time,
          "day": parseInt(element.day) // INT
        };

        prevEid = element.eid;
        i++;
    });

    pair = {
      "employee": employee,
      "shifts": shifts
    };

    employee_sched.push(pair); // push last set to employee_sched
    employee_sched.shift(); // pop front, employee_sched[0] is a empty set

    console.log(employee_sched);

    // testing data passing with currentSchedule.ejs
    res.render("currentSchedule", {data: employee_sched});
  });
});

// get method just for testing purpose
// GET main page
router.get('/main', function(req, res, next) {
  res.render('main'); // test for basic html get method
});

module.exports = router;

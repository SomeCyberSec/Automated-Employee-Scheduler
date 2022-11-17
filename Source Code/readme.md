# Employee Scheduler

## This file is a partial solution for 
* issue #5 
	* task 1: Define data access layer to represent employees and their availabilities
	* task 2: Define data access later to represent schedules and employees needed for each
* issue #3 
	* task 1: Enable data layer to store role for each employee
* issue #2 
	* partial task 1: Define data layer to store permission rank for each user
		* now data layer has "admin" permission that has full control of the system
	* partial task 3: Task "Creates distinct interfaces for administrators and basic users
		* now the system is able to login as "admin" role and display admin views


## How to set up

1. npm, node.js, MySQL are required
1. create a schema named employee_schedule in MySQL
1. import test/employee_schedule.sql data file to this schema
    * if utf8mb4_0900_ai_ci error occurs, open the .sql in notepad and change all utf8mb4_0900_ai_ci to utf8mb4_general_ci
1. go to db.js file change line 6 content to your MySQL server password
    * MySQL server default password should be empty
    * change "host", "user", "database", and "port" if needed
1. run npm install command to install all required modules
1. run "node ./bin/www" command to start, and go to localhost
    * can also run "npm run dev" to enter developer mode if nodemon is installed

If any error occurs during this set up process please contact Yuan zy21@uakron.edu

## How to test

1. enter "admin" in user field, and enter "admin123" to password field, and press Login.
    * If the page goes to http://localhost:3000/admin/main, then the post to '/main' method in route/admin.js is tested and passed. It was tested to communicate with and get the corresponding data from the database.
2. press Scheduler on the left side bar, and press Current Scheduler from its sub-menu.
    * If the page goes to http://localhost:3000/admin/currentSchedule, then the get method to '/currentSchedule' is tested and passed.
    * If the page display
    
| EMPLOYEE  | SUNDAY | MONDAY | TUESDAY | WEDNESDAY | THURSDAY | Friday | SATURDAY |
| --------- |--------|--------|---------|-----------|----------|--------|----------|
| Larva Gross 17482938 |      | 10:00 - 20:00 | 10:00 - 20:00 | 10:00 - 20:00 | 10:00 - 20:00 | 10:00 - 20:00| 11:00 - 17:00|
| Narly Fart 17459283  |      | 10:00 - 20:00|  | 10:00 - 20:00|  | 10:00 - 20:00|  |
| Stephanie Richards 12342987 |     | 10:00 - 20:00| 10:00 - 20:00| 10:00 - 20:00| 10:00 - 20:00| 10:00 - 20:00|  |
| Yuan Zifeng 17482935 | 11:00 - 17:00| 10:00 - 20:00| 10:00 - 20:00| 10:00 - 20:00| 10:00 - 20:00| 10:00 - 20:00| 11:00 - 17:00|

	then the tests of below items are passed
 	1. getting correctsponding data from database
 	1. repacking raw data into a proper standard object
 	1. sending the repacked oject to front-end
 	1. can be properly displayed in front-end

3. press Home on the left side bar
   * If the page goes to http://localhost:3000/admin/main, then the get to '/main' method is tested and passed. render('main') can direct user to the correct view.
 
4. The schedule generation algorithm is currently inaccessible from the frontend components, due to time constraints. Within the EmployeeScheduler-P3 directory, run "node testGenerateSchedule.js" to execute a test suite for the schedule generation algorithm contained in generateSchedule.js. No data input is required, as the test suite contains sample data to validate the algorithm.

If any error occurs during this test process please contact Yuan zy21@uakron.edu

## Bugs detected
1. In routes/admin.js file and the get '/currentSchedule' method, first element in data object is an empty array, currently pop element out but should find root cause for full implementation.
2. In routes/admin.js file and the get '/currentSchedule' method, text between work times for employees intended should be newline, but has been formatted with a dash(' - ') due to newline implementation not outputting.

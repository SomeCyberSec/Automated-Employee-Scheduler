// Test data
const {Shift, Employee, fillShift, findChildren, buildSchedule} = require("./generateSchedule");

const tom = new Employee(1, "cook", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 8);
const joe = new Employee(2, "cook", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
const richard = new Employee(3, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
const harry = new Employee(4, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
const staffing = [tom, richard, harry, joe];

const req1 = {
    cook: 1,
    server: 0,
    manager: 0
};
const req2 = {
    cook: 1,
    server: 1,
    manager: 0
};

const root = {
  shift: null,
  children: []
};

let shift1 = new Shift(1, 9, 17, req1, 1);
const shift2 = new Shift(2, 9, 17, req1, 1)
const ex1 = new Shift(1, 9, 17, req2, 1);
ex1.staffing = [1, 3, 2];
const ex2 = new Shift(2, 9, 17, req2, 1);
ex2.staffing = [1, 2]
expected = [ex1, ex2];
const shifts = [shift1, shift2];

function testFillShift() {
  originalShift1 = JSON.parse(JSON.stringify(shift1));
  result = fillShift([tom], shift1, root);
  shift2.staffing.push(tom.eid);
  if(result.start === shift2.start && result.end === shift2.end && result.requirements.toString() === shift2.requirements.toString()
    && result.staffing.toString() === shift2.staffing.toString()&& result.day === shift2.day) {
      console.log("fillShift test passed!");
      console.log(result);
      console.log(shift2);
    } else {
      console.log("fillShift test failed.")
      console.log(result);
      console.log(shift2);
    }
    shift1 = originalShift1;
    shift2.staffing.pop();
}

function testFindChildren() {
  const shifts = [shift1, shift2];
  findChildren(root, staffing, shifts, shift1);
  // Tree should have depth = 2
  if(root.children.length > 0 && root.children[0].children.length > 0 && root.children[0].children[0].children.length === 0) {
    console.log("findChildren test passed!");
    console.log(root.children.length);
    console.log(root.children[0].children.length);
    console.log(root.children[0].children[0].children.length);
  } else {
    console.log("findChildren test failed.");
    console.log(root.children.length);
    console.log(root.children[0].children.length);
    console.log(root.children[0].children[0].children.length);
  }
}

function testBuildSchedule() {
  let result = [];
  result = buildSchedule(root, result, shifts);
  if (result.toString() === expected.toString()) {
    console.log("buildSchedule test passed!");
  } else {
    console.log("buildSchedule test failed.")
  }
  console.log(result);
  //console.log(expected);
}

// Unit tests
testFillShift();
testFindChildren();
testBuildSchedule();

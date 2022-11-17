class Shift {
    constructor(sid, start, end, requirements, day) {
        this.sid = sid;
        this.start = start;
        this.end = end;
        this.requirements = requirements;
        this.staffing = [];
        this.day = day;
    }
};

class Employee {
    constructor(eid, position, availability, maxhrs) {
        this.eid = eid;
        this.position = position;
        this.availability = availability;
        this.maxhrs = maxhrs;
    }
};

// Prototype for a tree node; functions as root of the tree built in findChildren()
const root = {
    shift: null,
    children: []
};

// args: array of shifts, array of employees
function generateSchedule(shifts, employees) {
    // Build tree
    findChildren(root, employees, shifts, shift1);
    let stack = [];
    stack = buildSchedule(root, stack, shifts);
    return stack;
}

function fillShift(employees, shift, node) {
    let newRequirements = JSON.parse(JSON.stringify(shift.requirements));
    let shiftLen = shift.end - shift.start;
    if (shiftLen <= 0) {
        shiftLen = shift.end + 24 - shift.start;
    }
    for (let employee of employees) {
        if (shift.day === 1) { // Mon
            if (employee.maxhrs >= shiftLen && shift.start >= employee.availability[0]
                && shift.end <= employee.availability[1]
                && shift.staffing.indexOf(employee.eid) === -1
                && !(node.children.some(e => e.shift.staffing.toString() === shift.staffing + "," + employee.eid))) {
                if (newRequirements[employee.position] > 0) {
                    employee.maxhrs -= shiftLen;
                    shift.staffing.push(employee.eid);
                    newRequirements[employee.position] -= 1;
                }
            }
        } else if (shift.day === 2) { // Tues
            if (employee.maxhrs >= shiftLen && shift.start >= employee.availability[2]
                && shift.end <= employee.availability[3]
                && shift.staffing.indexOf(employee.eid) === -1
                && !(node.children.some(e => e.shift.staffing.toString() === shift.staffing + "," + employee.eid))) {
                if (newRequirements[employee.position] > 0) {
                    employee.maxhrs -= shiftLen;
                    shift.staffing.push(employee.eid);
                    newRequirements[employee.position] -= 1;
                }
            }
        } else if (shift.day === 3) { // Wed
            if (employee.maxhrs >= shiftLen && shift.start >= employee.availability[4]
                && shift.end <= employee.availability[5]
                && shift.staffing.indexOf(employee.eid) === -1
                && !(node.children.some(e => e.shift.staffing.toString() === shift.staffing + "," + employee.eid))) {
                if (newRequirements[employee.position] > 0) {
                    employee.maxhrs -= shiftLen;
                    shift.staffing.push(employee.eid);
                    newRequirements[employee.position] -= 1;
                }
            }
        } else if (shift.day === 4) { // Thurs
            if (employee.maxhrs >= shiftLen && shift.start >= employee.availability[6]
                && shift.end <= employee.availability[7]
                && shift.staffing.indexOf(employee.eid) === -1
                && !(node.children.some(e => e.shift.staffing.toString() === shift.staffing + "," + employee.eid))) {
                if (newRequirements[employee.position] > 0) {
                    employee.maxhrs -= shiftLen;
                    shift.staffing.push(employee.eid);
                    newRequirements[employee.position] -= 1;
                }
            }
        } else if (shift.day === 5) { // Fri
            if (employee.maxhrs >= shiftLen && shift.start >= employee.availability[8]
                && shift.end <= employee.availability[9]
                && shift.staffing.indexOf(employee.eid) === -1
                && !(node.children.some(e => e.shift.staffing.toString() === shift.staffing + "," + employee.eid))) {
                if (newRequirements[employee.position] > 0) {
                    employee.maxhrs -= shiftLen;
                    shift.staffing.push(employee.eid);
                    newRequirements[employee.position] -= 1;
                }
            }
        } else if (shift.day === 6) { // Sat
            if (employee.maxhrs >= shiftLen && shift.start >= employee.availability[10]
                && shift.end <= employee.availability[11]
                && shift.staffing.indexOf(employee.eid) === -1
                && !(node.children.some(e => e.shift.staffing.toString() === shift.staffing + "," + employee.eid))) {
                if (newRequirements[employee.position] > 0) {
                    employee.maxhrs -= shiftLen;
                    shift.staffing.push(employee.eid);
                    newRequirements[employee.position] -= 1;
                }
            }
        } else if (shift.day === 7) { // Sun
            if (employee.maxhrs >= shiftLen && shift.start >= employee.availability[12]
                && shift.end <= employee.availability[13]
                && shift.staffing.indexOf(employee.eid) === -1
                && !(node.children.some(e => e.shift.staffing.toString() === shift.staffing + "," + employee.eid))) {
                if (newRequirements[employee.position] > 0) {
                    employee.maxhrs -= shiftLen;
                    shift.staffing.push(employee.eid);
                    newRequirements[employee.position] -= 1;
                }
            }
        }
        if (newRequirements["cook"] === 0 && newRequirements["server"] === 0 && newRequirements["manager"] === 0) { // Shift successfully filled
            return JSON.parse(JSON.stringify(shift));
        }
    }
    return undefined;
}

// Parent node, all employees, shift for these children nodes
function findChildren(node, employees, shifts, shift) {
    // Find a solution with all employees available
    const firstNode = {};
    firstNode.shift = fillShift(employees, JSON.parse(JSON.stringify(shift)), node);
    firstNode.children = [];
    if (firstNode.shift) {
        node.children.push(firstNode);
    }

    // Find a solution for each permutation that excludes 1 employee
    for (let employee of employees) {
        const newNode = {};
        const newEmployees = JSON.parse(JSON.stringify(employees));
        const ind = employees.indexOf(employee);
        if (ind > -1) {
            newEmployees.splice(ind, 1);
        }
        newNode.shift = fillShift(newEmployees, JSON.parse(JSON.stringify(shift)), node);
        newNode.children = [];
        if (newNode.shift) {
            node.children.push(newNode);
        }
    }

    // Recursive call, populate children of each child
    for (let child of node.children) {
        idx = shifts.indexOf(shift);
        if (idx < shifts.length - 1) {
            findChildren(child, employees, shifts, shifts[idx + 1]);
        }
    }
}

function buildSchedule(root, stack, shifts) {
    if (root.shift) {
        stack.push(root.shift);
    }
    if (stack.length == shifts.length) {
        return stack;
    } else if (root.children.length > 0) {
        for (let child of root.children) {
            let newStack = buildSchedule(child, stack, shifts);
            if (typeof newStack != 'undefined') {
                return newStack;
            }
        }
    } else {
        return undefined;
    }
}

module.exports = { Shift, Employee, generateSchedule, fillShift, findChildren, buildSchedule };

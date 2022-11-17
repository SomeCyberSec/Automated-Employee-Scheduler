class Employee {
    constructor(eid, name, position, availability) {
        this.eid = eid;                         // INT
        this.position = position;               // STRING
        this.availability = availability;       // INT
        this.maxHours = 40;                      // INT
    }
};

class Shift {
    constructor(sid, start, end, requirements, day) {
        this.sid = sid;                         // INT
        this.start = start;                     // INT
        this.end = end;                         // INT
        this.requirements = requirements;       // LIST[PAIR(STRING,INT)]
        this.staffing = [];                     // LIST[INT]
        this.day = day;                          // INT
    }
};


module.exports = {
    Employee,
    Shift
};
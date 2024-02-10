class CPOMS {
    constructor() {
        this.users = {'admin': 'password'};
        this.students = {};
        this.incidents = [];
    }

    registerUser(username, password) {
        this.users[username] = password;
    }

    login(username, password) {
        return this.users[username] === password;
    }

    addStudent(name, dob, year) {
        const studentId = Object.keys(this.students).length + 1;
        this.students[studentId] = { name, dob, year };
    }

    deleteStudent(studentId) {
        if (studentId in this.students) {
            delete this.students[studentId];
            return true;
        }
        return false;
    }

    reportIncident(studentId, otherStudents, reason, severity) {
        const incident = { studentId, otherStudents, reason, severity };
        this.incidents.push(incident);
    }

    getStudentIncidents(studentId) {
        const incidents = this.incidents.filter(incident => incident.studentId === studentId);
        for (const incident of this.incidents) {
            if (incident.otherStudents.includes(studentId)) {
                incidents.push(incident);
            }
        }
        return incidents;
    }

    updateStudentData(studentId, newData) {
        if (studentId in this.students) {
            this.students[studentId] = newData;
            return true;
        }
        return false;
    }

    deleteUsername(username) {
        if (username in this.users) {
            delete this.users[username];
            return true;
        }
        return false;
    }
}

class CPOMSGUI {
    constructor() {
        this.cpoms = new CPOMS();
    }

    validateLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (this.cpoms.login(username, password)) {
            this.showMainMenu();
        } else {
            alert('Invalid username or password');
        }
    }

    showMainMenu() {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainMenu').style.display = 'block';
        this.populateStudentsTable();
    }

    submitStudent() {
        const name = document.getElementById('newStudentName').value;
        const dob = document.getElementById('newStudentDob').value;
        const year = document.getElementById('newStudentYear').value;
        if (name && dob && year) {
            this.cpoms.addStudent(name, dob, year);
            alert('New student added successfully.');
            document.getElementById('newStudentName').value = '';
            document.getElementById('newStudentDob').value = '';
            document.getElementById('newStudentYear').value = '';
            this.populateStudentsTable();
        } else {
            alert('Please enter all student details.');
        }
    }

    populateStudentsTable() {
        const studentsTableBody = document.getElementById('studentsTableBody');
        studentsTableBody.innerHTML = '';
        for (const [studentId, studentInfo] of Object.entries(this.cpoms.students)) {
            const row = `
                <tr>
                    <td>${studentInfo.name}</td>
                    <td>${studentInfo.dob}</td>
                    <td>${studentInfo.year}</td>
                    <td><button onclick="cpomsGui.viewIncidents(${studentId})">View Incidents</button></td>
                </tr>
            `;
            studentsTableBody.innerHTML += row;
        }
    }

    searchStudents() {
        const query = document.getElementById('searchStudent').value.toLowerCase();
        const studentsTableBody = document.getElementById('studentsTableBody');
        studentsTableBody.innerHTML = '';
        for (const [studentId, studentInfo] of Object.entries(this.cpoms.students)) {
            if (studentInfo.name.toLowerCase().includes(query)) {
                const row = `
                    <tr>
                        <td>${studentInfo.name}</td>
                        <td>${studentInfo.dob}</td>
                        <td>${studentInfo.year}</td>
                        <td><button onclick="cpomsGui.viewIncidents(${studentId})">View Incidents</button></td>
                    </tr>
                `;
                studentsTableBody.innerHTML += row;
            }
        }
    }

    viewIncidents(studentId) {
        const incidents = this.cpoms.getStudentIncidents(studentId);
        let formatted = '';
        for (const incident of incidents) {
            const studentName = this.cpoms.students[incident.studentId].name;
            formatted += `Student Name: ${studentName}\nReason: ${incident.reason}\nSeverity: ${incident.severity}\n\n`;
        }
        alert(formatted);
    }
}

const cpomsGui = new CPOMSGUI();

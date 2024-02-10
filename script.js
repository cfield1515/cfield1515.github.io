class CPOMS {
    constructor() {
        this.users = {'admin': 'password'};
        this.students = {};
        this.incidents = [];
        this.loggedIncidents = [];
    }

    // Methods for CPOMS functionality...
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
        this.showViewStudentsPage();
    }

    showViewStudentsPage() {
        document.getElementById('header').style.display = 'block';
        document.getElementById('viewStudentsPage').style.display = 'block';
        document.getElementById('addStudentPage').style.display = 'none';
        document.getElementById('logIncidentPage').style.display = 'none';
        document.getElementById('viewIncidentsPage').style.display = 'none';
        this.populateStudentsTable();
    }

    showAddStudentPage() {
        document.getElementById('header').style.display = 'block';
        document.getElementById('addStudentPage').style.display = 'block';
        document.getElementById('viewStudentsPage').style.display = 'none';
        document.getElementById('logIncidentPage').style.display = 'none';
        document.getElementById('viewIncidentsPage').style.display = 'none';
    }

    showLogIncidentPage() {
        document.getElementById('header').style.display = 'block';
        document.getElementById('logIncidentPage').style.display = 'block';
        document.getElementById('viewStudentsPage').style.display = 'none';
        document.getElementById('addStudentPage').style.display = 'none';
        document.getElementById('viewIncidentsPage').style.display = 'none';
    }

    showViewIncidentsPage() {
        document.getElementById('header').style.display = 'block';
        document.getElementById('viewIncidentsPage').style.display = 'block';
        document.getElementById('viewStudentsPage').style.display = 'none';
        document.getElementById('addStudentPage').style.display = 'none';
        document.getElementById('logIncidentPage').style.display = 'none';
        this.populateLoggedIncidentsTable();
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

    viewIncidents(studentId) {
        const incidents = this.cpoms.getStudentIncidents(studentId);
        let formatted = '';
        for (const incident of incidents) {
            const studentName = this.cpoms.students[incident.studentId].name;
            formatted += `Student Name: ${studentName}\nReason: ${incident.reason}\nSeverity: ${incident.severity}\n\n`;
        }
        alert(formatted);
    }

    addStudent() {
        const name = document.getElementById('studentName').value;
        const dob = document.getElementById('studentDOB').value;
        const year = document.getElementById('studentYear').value;
        this.cpoms.addStudent(name, dob, year);
        this.showViewStudentsPage();
    }

    logIncident() {
        const studentId = document.getElementById('incidentStudentId').value;
        const otherStudents = document.getElementById('otherStudents').value.split(',');
        const reason = document.getElementById('incidentReason').value;
        const severity = document.getElementById('incidentSeverity').value;
        this.cpoms.reportIncident(studentId, otherStudents, reason, severity);
        this.populateLoggedIncidentsTable();
    }

    populateLoggedIncidentsTable() {
        const loggedIncidentsTableBody = document.getElementById('loggedIncidentsTableBody');
        loggedIncidentsTableBody.innerHTML = '';
        for (const incident of this.cpoms.loggedIncidents) {
            const row = `
                <tr>
                    <td>${incident.studentId}</td>
                    <td>${incident.otherStudents.join(',')}</td>
                    <td>${incident.reason}</td>
                    <td>${incident.severity}</td>
                    <td><button onclick="cpomsGui.resolveIncident(${incident.id})">Resolve</button></td>
                    <td><button onclick="cpomsGui.editIncident(${incident.id})">Edit</button></td>
                </tr>
            `;
            loggedIncidentsTableBody.innerHTML += row;
        }
    }

    resolveIncident(incidentId) {
        // Implement resolve incident functionality here
    }

    editIncident(incidentId) {
        // Implement edit incident functionality here
    }
}

const cpomsGui = new CPOMSGUI();

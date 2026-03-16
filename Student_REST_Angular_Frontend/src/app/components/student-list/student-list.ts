import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  
  // Dashboard inputs
  searchSchool: string = '';
  searchStandard: string = '';
  searchGender: string = '';
  
  // Variable to hold count/statistic results
  statMessage: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  // --- CRUD METHODS ---
  loadStudents(): void {
    this.statMessage = ''; // Clear stats when loading all
    this.studentService.getAllStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error('Error fetching students', err)
    });
  }

  editStudent(regNo: string | undefined): void {
    if (regNo) this.router.navigate(['/students/edit', regNo]);
  }

  deleteStudent(regNo: string | undefined): void {
    if (regNo && confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(regNo).subscribe({
        next: () => this.loadStudents(),
        error: (err) => console.error('Error deleting student', err)
      });
    }
  }

  // --- CUSTOM ENDPOINT METHODS ---

  filterBySchool(): void {
    if (!this.searchSchool) return;
    this.statMessage = '';
    this.studentService.getStudentsBySchool(this.searchSchool).subscribe(
      data => this.students = data
    );
  }

  getSchoolCount(): void {
    if (!this.searchSchool) return;
    this.studentService.getSchoolCount(this.searchSchool).subscribe(
      count => this.statMessage = `Total students in ${this.searchSchool}: ${count}`
    );
  }

  getStandardCount(): void {
    if (!this.searchStandard) return;
    this.studentService.getStandardCount(this.searchStandard).subscribe(
      count => this.statMessage = `Total students in Standard ${this.searchStandard}: ${count}`
    );
  }

  filterByResult(pass: boolean): void {
    this.statMessage = pass ? 'Showing Passed Students' : 'Showing Failed Students';
    this.studentService.getStudentsByResult(pass).subscribe(
      data => this.students = data
    );
  }

  getStrength(): void {
    if (!this.searchGender || !this.searchStandard) {
      alert('Please enter both Gender and Standard to check strength.');
      return;
    }
    this.studentService.getStrengthByGenderAndStandard(this.searchGender, this.searchStandard).subscribe(
      count => this.statMessage = `Total ${this.searchGender}s in Standard ${this.searchStandard}: ${count}`
    );
  }
}
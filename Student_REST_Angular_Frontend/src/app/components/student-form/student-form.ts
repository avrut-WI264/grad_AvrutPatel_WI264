import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-form',
    standalone: false,
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode: boolean = false;
  currentRegNo: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with basic validation
    this.studentForm = this.fb.group({
      regNo: [''], // Optional depending on if your DB auto-generates it
      rollNo: ['', [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      standard: ['', Validators.required],
      school: ['', Validators.required],
      gender: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    // Check if we are in edit mode by looking at the route parameters
    this.currentRegNo = this.route.snapshot.paramMap.get('id');
    if (this.currentRegNo) {
      this.isEditMode = true;
      this.loadStudentData(this.currentRegNo);
    }
  }

  loadStudentData(regNo: string): void {
    this.studentService.getStudentById(regNo).subscribe({
      next: (student) => {
        // Populate the form with the fetched data
        this.studentForm.patchValue(student);
        // Disable regNo field if it's the primary key to prevent user from changing it
        this.studentForm.get('regNo')?.disable();
      },
      error: (err) => console.error('Error fetching student details', err)
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    // Get the raw value (including disabled fields if necessary)
    const studentData: Student = this.studentForm.getRawValue();

    if (this.isEditMode && this.currentRegNo) {
      // Update existing student (PUT request)
      this.studentService.updateStudent(this.currentRegNo, studentData).subscribe({
        next: () => {
          alert('Student updated successfully!');
          this.router.navigate(['/students']);
        },
        error: (err) => console.error('Error updating student', err)
      });
    } else {
      // Create new student (POST request)
      this.studentService.createStudent(studentData).subscribe({
        next: () => {
          alert('Student created successfully!');
          this.router.navigate(['/students']);
        },
        error: (err) => console.error('Error creating student', err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}
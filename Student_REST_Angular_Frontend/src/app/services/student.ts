import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  // Make sure this matches your Spring Boot port (usually 8080)
  private baseUrl = 'http://localhost:8080/students';

  constructor(private http: HttpClient) { }

  // GET all students
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  // GET specific student by regNo
  getStudentById(regNo: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${regNo}`);
  }

  // POST - Insert record
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student);
  }

  // PUT - Update full record
  updateStudent(regNo: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${regNo}`, student);
  }

  // PATCH - Update specific attributes
  patchStudent(regNo: string, updates: Partial<Student>): Observable<Student> {
    return this.http.patch<Student>(`${this.baseUrl}/${regNo}`, updates);
  }

  // DELETE record
  deleteStudent(regNo: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${regNo}`);
  }

  // GET Student by School name
  getStudentsBySchool(name: string): Observable<Student[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Student[]>(`${this.baseUrl}/school`, { params });
  }

  // GET Total students in that school
  getSchoolCount(name: string): Observable<number> {
    const params = new HttpParams().set('name', name);
    return this.http.get<number>(`${this.baseUrl}/school/count`, { params });
  }

  // GET Total number of students in a specific standard
  getStandardCount(standard: string): Observable<number> {
    const params = new HttpParams().set('class', standard);
    return this.http.get<number>(`${this.baseUrl}/school/standard/count`, { params });
  }

  // GET List students by Pass/Fail
  getStudentsByResult(pass: boolean): Observable<Student[]> {
    const params = new HttpParams().set('pass', pass.toString());
    return this.http.get<Student[]>(`${this.baseUrl}/result`, { params });
  }

  // GET Strength by Gender and Standard
  getStrengthByGenderAndStandard(gender: string, standard: string): Observable<number> {
    const params = new HttpParams()
      .set('gender', gender)
      .set('standard', standard);
    return this.http.get<number>(`${this.baseUrl}/strength`, { params });
  }
}
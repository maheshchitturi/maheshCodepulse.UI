import { Component } from '@angular/core';
import { Attendance } from '../models/attendance.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  
  attendance$? : Observable<Attendance[]>;
  //categories?: Category[]
  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    
    this.attendance$=this.categoryService.getAttendance();
    console.log(this.attendance$);
    // .subscribe({
    //   next :(Response)=>{
    //     this.categories=Response;
         
    //   }
    // })
  }

}

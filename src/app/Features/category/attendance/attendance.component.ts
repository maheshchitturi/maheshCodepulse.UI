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

  attendance$?: Observable<Attendance[]>;
  attendanceList: any = []


  Object = Object
  //categories?: Category[]
  constructor(private categoryService: CategoryService) { }


  ngOnInit(): void {
    let lastPunchTime: Date | null = null;
    let totalDifferenceInMillis = 0;
    let diffMillis = 0;

    this.attendance$ = this.categoryService.getAttendance();
    this.attendance$.subscribe({
      next: (response) => {
        console.log('API Response:', response);  // Log the response data
        this.attendanceList = response
        Object.keys(this.attendanceList).forEach(element => {
          let punch_time = [];
          //console.log(element)
          if (element != 'AKV0271') {
            delete this.attendanceList[element]
          } else {
            //for total time calculation
            for (let item of this.attendanceList[element]) {
              punch_time.push(item.punchTime);

              //punch_time = punch_time + item.punchTime+','
              let currentPunchTime = new Date(item.punchTime);
              if (lastPunchTime !== null) {

                // Calculate the difference in milliseconds
                let timeDifference = currentPunchTime.getTime() - lastPunchTime.getTime();

                // Accumulate the difference (if needed)
                totalDifferenceInMillis += timeDifference;



                //console.log(`Time difference between ${lastPunchTime} and ${currentPunchTime}: ${timeDifference / 1000} seconds`);
              }
              lastPunchTime = currentPunchTime;
              //console.log(punch_time)

            }

            const today = new Date();

            // Compare year, month, and day (ignoring time)
            const isSameDate = today.getFullYear() === lastPunchTime?.getFullYear() &&
              today.getMonth() === lastPunchTime.getMonth() &&
              today.getDate() === lastPunchTime.getDate();
            if (isSameDate) {
              let currentPunchTime = new Date();

              const formattedDate = new Date(currentPunchTime)
                .toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })
                .split(',')[0] // Extracts the date part
                .split('/').reverse().join('-') + ' ' +
                new Date(currentPunchTime).toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' }).split(',')[1];
              //console.log(formattedDate);
              punch_time.push(formattedDate + "  it will calculate upto this time this is current time stamp");
              //console.log(lastPunchTime);
              if (lastPunchTime !== null) {
                // Calculate the difference in milliseconds
                let timeDifference = currentPunchTime.getTime() - lastPunchTime.getTime();

                // Accumulate the difference (if needed)
                totalDifferenceInMillis += timeDifference;



              }


            }

            //to calculate live time for today

            //for break calculation
            // console.log("lenght "+this.attendanceList[element].length)
            for (let i = 1; i < this.attendanceList[element].length - 1; i += 2) {
              let prev_item = this.attendanceList[element][i - 1];
              let item = this.attendanceList[element][i];
              let item2 = this.attendanceList[element][i + 1];





              const prev_time = new Date(prev_item.punchTime);
              const time1 = new Date(item.punchTime);
              const time2 = new Date(item2.punchTime);

              //console.log(next_time+" next_time");


              let prev_diff = time1.getTime() - prev_time.getTime();

              //diffMillis +=dur_diff;
              //console.log(" time starts"+item.punchTime+" time1 ans second time "+item2.punchTime)
              //console.log("i value "+i);

              let dur_diff = time2.getTime() - time1.getTime();
              // if (prev_diff < 60000) {
              //   let next_item = this.attendanceList[element][i + 2];
              //   console.log('hi');
              //   const next_time = new Date(next_item.punchTime);
              //   dur_diff = next_time.getTime() - time2.getTime();
              // }
              // if (dur_diff < 60000) {

              //   prev_diff = dur_diff;

              // }

              diffMillis += dur_diff;


              //console.log(diffMillis)

            }
            //   Convert the difference to hours, minutes, and seconds
            const break_hours = Math.floor(diffMillis / (1000 * 60 * 60));
            const break_minutes = Math.floor((diffMillis % (1000 * 60 * 60)) / (1000 * 60));
            const break_seconds = Math.floor((diffMillis % (1000 * 60)) / 1000);
            let break_duration = `${Math.floor(break_hours)} hours, ${Math.floor(break_minutes % 60)} minutes, ${Math.floor(break_seconds % 60)} seconds`;
            this.attendanceList[element].break_duration = break_duration


            //console.log('All Punch Times: ', punch_time);
            // console.log('Total Time Difference in Milliseconds: ', totalDifferenceInMillis);

            //total work_hours
            let totalSeconds = totalDifferenceInMillis / 1000;
            let totalMinutes = totalSeconds / 60;
            let totalHours = totalMinutes / 60;
            let work_hours = `${Math.floor(totalHours)} hours, ${Math.floor(totalMinutes % 60)} minutes, ${Math.floor(totalSeconds % 60)} seconds`;
            //console.log(`Total Time Difference: ${Math.floor(totalHours)} hours, ${Math.floor(totalMinutes % 60)} minutes, ${Math.floor(totalSeconds % 60)} seconds`);
            this.attendanceList[element].punch_time = punch_time
            this.attendanceList[element].totalworkhours = work_hours
            //console.log(this.attendanceList[element].totalworkhours+' mahesh')
            //actual work hours calculation
            let act_hours = totalDifferenceInMillis - diffMillis;
            let actualHours = Math.floor(act_hours / (1000 * 60 * 60));
            let actualMinutes = Math.floor((act_hours % (1000 * 60 * 60)) / (1000 * 60));
            let actualSeconds = Math.floor((act_hours % (1000 * 60)) / 1000);
            let Actual_workhours = `${Math.floor(actualHours)} hours, ${Math.floor(actualMinutes % 60)} minutes, ${Math.floor(actualSeconds % 60)} seconds`;
            this.attendanceList[element].Actual_workhours = Actual_workhours
          }

        });
        // Here you can assign the response to a local variable or do any other logic
        // this.categories = response;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);  // Log any error
      }
    });
    // .subscribe({
    //   next :(Response)=>{
    //     this.categories=Response;

    //   }
    // })
  }

}
function parseTime(arg0: any) {
  throw new Error('Function not implemented.');
}


import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any
    // {
    //   qId:23,
    //   title:'Basic Java Quiz',
    //   description:'The Java SE is a computing-based platform and used for developing desktop or Window based applications.',
    //   maxMarks:'50',
    //   numberOfQuestion:'20',
    //   active:'',
    //   category:{
    //     title:'Programming'
    //   }
    // },
    // {
    //   qId:23,
    //   title:'Basic Java Quiz',
    //   description:'The Java SE is a computing-based platform and used for developing desktop or Window based applications.',
    //   maxMarks:'50',
    //   numberOfQuestion:'20',
    //   active:'',
    //   category:{
    //     title:''
    //   }
    // },
  

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes)
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Error in loading data !','error')
      }
    );
  }
  //delete quiz
  deleteQuiz(qId:any){
    // alert(qId);
    Swal.fire({
      icon:'info',
      title:"Are you sure ?",
      confirmButtonText:'Delete',
      showCancelButton : true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
            this.quizzes = this.quizzes.filter((quiz:any)=>quiz.qId != qId)
            Swal.fire('Success !!','Quiz Deleted ','success')
          },
          (error)=>{
            console.log(error);
            Swal.fire('Error !!','Error in deleting quiz !','error')
          }
        );
      }
    })
  }
}

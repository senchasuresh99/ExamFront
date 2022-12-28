import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId=0;
  qTitle="";
  questions:any = [];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snak:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    // console.log(this.qId);
    // console.log(this.qTitle);
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data)=>{
        console.log(data)
        this.questions=data;
      },
      (error)=>{
        console.log(error)
      },
    )
  }
  //delete question
  deleteQuestion(qid:any){
    //alert(qid);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to Delete this Question ?'
    }).then((result)=>{
      //alert('testing');
      if(result.isConfirmed){
        //Confirm
        this._question.deleteQuestion(qid).subscribe(
          (data)=>{
            this._snak.open('Question Deleted','',{
              duration:3000,
            });
            this.questions=this.questions.filter((q:any)=>q.quesId !=qid);
          },
          (error)=>{
            this._snak.open('Error in Deleting Question','',{
              duration:3000,
            })
            console.log(error);
          }
        );
      }
    })
  }
}

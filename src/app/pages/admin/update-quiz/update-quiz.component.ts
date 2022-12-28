import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _cat:CategoryService,
    private _snack:MatSnackBar,
    private _router:Router) { }

  qId=0;
  quiz:any=[];
  categories: any;
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    //alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        //console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        alert("error in loading categories");
      }
    );
  }
  //update form submit
  public updateData(){
    //alert('test');
    //validation
    //validation
    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this._snack.open("Title Required !!",'',{
        duration:3000,
      });
      return
  }
  if(this.quiz.description.trim()=='' || this.quiz.description==null){
    this._snack.open("Description Required !!",'',{
      duration:3000,
    });
    return  
  }
  if(this.quiz.maxMarks.trim()=='' || this.quiz.maxMarks==null){
    this._snack.open("Maximum Marks Required !!",'',{
      duration:3000,
    });
    return  
  }
  if(this.quiz.numberOfQuestion.trim()=='' || this.quiz.numberOfQuestion==null){
    this._snack.open("Number Of Question Required !!",'',{
      duration:3000,
    });
    return  
  }
  //
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Success !!','Quiz Updated','success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error !!','Error in Updating Quiz','error');
      },
    )
  }
}

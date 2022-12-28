import { BooleanInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
primary: any;
checked: BooleanInput;
disabled: any;
categories: any;

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active:true,
    category:{
      cid:'',
    },
  };
  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        //categories load 
        this.categories=data;
        //console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Error in loading data form server','error');
      }
    );
  }
  addQuiz(){
    // console.log(this.quizData);
    //validation
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
        this._snack.open("Title Required !!",'',{
          duration:3000,
        });
        return
    }
    if(this.quizData.description.trim()=='' || this.quizData.description==null){
      this._snack.open("Description Required !!",'',{
        duration:3000,
      });
      return  
    }
    if(this.quizData.maxMarks.trim()=='' || this.quizData.maxMarks==null){
      this._snack.open("Maximum Marks Required !!",'',{
        duration:3000,
      });
      return  
    }
    if(this.quizData.numberOfQuestion.trim()=='' || this.quizData.numberOfQuestion==null){
      this._snack.open("Number Of Question Required !!",'',{
        duration:3000,
      });
      return  
    }
    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Succrss','Quiz is added','success')
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestion:'',
          active:true,
          category:{
            cid:'',
          },
        };
      },
      (error)=>{
        Swal.fire('Error','Error while adding Quiz','error')
        console.log(error);
      }
    );
  }
}

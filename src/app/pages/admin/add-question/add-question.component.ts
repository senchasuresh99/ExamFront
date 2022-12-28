import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
//import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  //public Editor = ClassicEditor;
  qid=0;
  qTitle:any=[];
  question={
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };
 // question:any=[];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar,
  ) { }

  ngOnInit(): void {
    //this.qId = this._route.snapshot.params['this'].qId;
    this.qid = parseInt(this._route.snapshot.params['qid']);
    //this.qid = this._route.snapshot.params['qId'];
   alert(this.qid);
    console.log(this.qid);
    this.qTitle = this._route.snapshot.params['title']
    // this.question.quiz['qId']=this.qId;
    // this.question.quiz['qTitle']=this.qTitle;
    // this.question.quiz.qId=this.qId;
      this.question.quiz = this.qTitle;
      this.question.quiz = this.qid;
  }
  
  formSubmit(){
    //console.log('received response');
    //alert("testing");
    //validation
  if(this.question.content.trim()=='' || this.question.content==null){
    this._snack.open("Content Required !!",'',{
      duration:3000,
    });
    return
  }
  if(this.question.option1.trim()=='' || this.question.option1==null){
    this._snack.open("Option Required !!",'',{
      duration:3000,
    });
    return  
  }
  if(this.question.option2.trim()=='' || this.question.option2==null){
    this._snack.open("Option Required !!",'',{
      duration:3000,
    });
    return  
  }
  
  if(this.question.option4.trim()=='' || this.question.option4==null){
    this._snack.open("Option Required !!",'',{
      duration:3000,
    });
    return  
  }
  if(this.question.answer.trim()=='' || this.question.answer==null){
    this._snack.open("Answer Required !!",'',{
      duration:3000,
    });
    return  
  }
  //form submit
   this._question.addQuestion(this.question).subscribe((data:any)=>{
    Swal.fire('Success','Question added','success')
    this.question.content=''
    this.question.option1=''
    this.question.option2=''
    this.question.option3=''
    this.question.option4=''
    this.question.answer=''
  },
  (error)=>{
    Swal.fire('Error','Error in adding Question','error')
  });
  }
}

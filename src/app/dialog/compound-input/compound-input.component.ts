import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompoundService } from 'src/app/compound.service';

@Component({
  selector: 'app-compound-input',
  templateUrl: './compound-input.component.html',
  styleUrls: ['./compound-input.component.css']
})
export class CompoundInputComponent {
  CompoundForm!:FormGroup;
  headLine = "Create Compound";
  button = "Create";
  constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<CompoundInputComponent>,
  private compoundService:CompoundService){

  }
  ngOnInit(){
    this.CompoundForm = this.formBuilder.group({
      CompoundName : ['',Validators.required],
      CompoundDescription : ['',Validators.required],
      strImageSource : ['',Validators.required],
      strImageAttribution : [''],
    });

    if(this.data){
      this.headLine = "Edit Compound";
      this.button = "Update";
      this.CompoundForm.controls['CompoundName'].setValue(this.data.compoundName);
      this.CompoundForm.controls['CompoundDescription'].setValue(this.data.compoundDescription);
      this.CompoundForm.controls['strImageSource'].setValue(this.data.strImageSource);
      this.CompoundForm.controls['strImageAttribution'].setValue(this.data.strImageAttribution);
    }
  }


  compoundModify(){
    if(this.CompoundForm.valid){
        if(this.data){
        this.compoundService.updateCompound(this.data.id,{...this.CompoundForm.value}).subscribe((res) => {
          alert('Updated');
          this.dialogRef.close('updated');
        })
      }else{
        this.compoundService.createCompound({...this.CompoundForm.value}).subscribe((res) => {
          alert('created');
          this.dialogRef.close('created');
        })
        }
    }
  }
}

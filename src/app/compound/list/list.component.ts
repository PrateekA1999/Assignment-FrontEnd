import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CompoundService } from 'src/app/compound.service';
import { CompoundInputComponent } from 'src/app/dialog/compound-input/compound-input.component';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';
import { FileUploadComponent } from 'src/app/dialog/file-upload/file-upload.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  placeHolder = '"Eg. 15"';
  Records = [];
  totalLength = 0;
  sort = [
    { viewValue: 'Default', value: { atr: 'id', order: 'ASC' } },
    { viewValue: 'Id by Descending Order', value: { atr: 'id', order: 'DESC' } },
    { viewValue: 'Name by Ascending Order', value: { atr: 'compoundName', order: 'ASC' } },
    { viewValue: 'Name by Descending Order', value: { atr: 'compoundName', order: 'DESC' } }
  ];
  Atr = [
    { value: 'id', viewValue: 'Id' },
    { value: 'compoundName', viewValue: 'Name' }
  ];
  emailFormControl = new FormControl('');

  selectedSort: any = this.sort[0].value;
  selectedAtr: any = "id";

  pageIndex = 0;
  pageSize = 4;

  constructor(private dialog: MatDialog,
    private route: Router,private compoundService : CompoundService) { 
      this.getAllCompounds();
    }

  ngOnInit() {
    this.emailFormControl.valueChanges.subscribe((v) => {
      this.paginator.firstPage();
      this.getAllCompounds();
    })
  }

  getAllCompounds(){

    let condition:any = {} ;

    let temp = this.selectedAtr;

    !!this.emailFormControl.value ? 
    condition[temp] = this.emailFormControl.value  : condition = null; 

    let obj = {
      'condition' : condition,
      'sort' : this.selectedSort
    }

    console.log(obj);
    
    this.compoundService.getAllCompound(this.pageSize,this.pageIndex,obj).subscribe((res) => {
      this.Records = res.records;
      console.log(this.Records);
      this.totalLength = res.totalItems;
    })
  }

  pageClick(e: PageEvent) {
    if(this.pageSize != e.pageSize){
      this.paginator.pageIndex = 0;
      this.pageIndex = 0;
    }else{
      this.pageIndex = e.pageIndex;
    }
    this.pageSize = e.pageSize;
    this.getAllCompounds();
  }

  changeSort(e: any) {
    if (e.atr != this.selectedSort.atr || e.order != this.selectedSort.order) {
    this.paginator.firstPage();
    this.getAllCompounds();
    }
  }

  changeAtr(e: any) {
    if (e != this.selectedAtr) {
      this.placeHolder = e == "id" ? '"Eg. 15"' : '"Eg. Sodium Chloride"';
      this.emailFormControl.setValue('');
    }
  }

  uploadCompoundCsv() {
    this.dialog.open(FileUploadComponent, {
      height: '200px',
    }).afterClosed().subscribe(val => {
      if (val === 'upload') {
        console.log("uploaded");
        this.getAllCompounds();
      }
    })
  }

  createCompound() {
    this.dialog.open(CompoundInputComponent).afterClosed().subscribe(val => {
      if (val === 'created') {
        console.log("created");
        this.getAllCompounds();
      }
    })
  }

  updateCompound(data: any) {
    this.dialog.open(CompoundInputComponent, {
      data: {
        id : data.id,
        compoundName: data.CompoundName,
        compoundDescription: data.CompoundDescription,
        strImageSource: data.strImageSource,
        strImageAttribution: data.strImageAttribution
      }
    }).afterClosed().subscribe(val => {
      if (val === 'updated') {
        console.log("updated");
        this.getAllCompounds();
      }
    })
  }

  compoundDetails(id:any) {
    this.route.navigateByUrl(`/compound/details/${id}`);
  }

  deleteCompound(id:any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.compoundService.deleteCompound(id).subscribe((res) => {
          alert("Successfully Deleted");
          console.log("Deleted");
          this.getAllCompounds();
        })
      }
    });
  }
}

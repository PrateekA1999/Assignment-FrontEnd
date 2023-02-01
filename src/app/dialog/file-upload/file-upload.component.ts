import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompoundService } from 'src/app/compound.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FileUploadComponent>,private compoundService : CompoundService) {
  }

  ngOnInit(): void {

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        console.log(this.currentFile.name);
          this.compoundService.upload(this.currentFile).subscribe(
          (event: any) => {
              alert("successfully uploaded");
              this.dialogRef.close('upload');
            },
            (err: any) => {
              console.log(err);
              alert("Unsucessful");
              this.dialogRef.close('uploadfail');
              this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }
}

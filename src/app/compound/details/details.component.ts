import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { CompoundService } from 'src/app/compound.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  id : any;
  data:any;

  constructor(private _location : Location,private route:ActivatedRoute,private compoundService: CompoundService){
   this.id = this.route.snapshot.params['id'];
   this.loadDetails();
  }

  loadDetails(){
    this.compoundService.getCompound(this.id).subscribe((res) => {
      this.data = res;
      console.log(this.data);
    })
  }

  backToList(){
    this._location.back();
  }
}
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.css']
})
export class TitleListComponent implements OnInit{
  allTitle: any;

  constructor(private route: ActivatedRoute , private dataService: DataService, private modalService: BsModalService, ) {}

  ngOnInit(): void {
    this.titleList()
  }
  titleList(){
    this.dataService.titleList().subscribe((data: any) => {
      this.allTitle = data.data;
      console.log(this.allTitle);
    });
  }

  

}

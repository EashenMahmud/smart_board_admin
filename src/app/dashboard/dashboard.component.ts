import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public error = null;
  closeModalEvent: any;
  routeTitle!: string;
  sliderList: any;
  button_link: any;
  modalRef?: BsModalRef;
  data: any;
  ind: any;
  files: any;
  imageFile: any;
  titleProduct: any;
  product_image: any;
  productActive: any;
  title: any;
  productUpdateForm!: FormGroup;
  panelUpdateForm!: FormGroup;
  productID: any;
  id: any;
  productTitleId: any;
  panelTitleId: any;
  panelID: any;
  panelTitle: any;
  Panel_image: any;
  panelActive: any;
  panelDescription: any;
  user: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private dataService: DataService, private modalService: BsModalService,) { 
    this.productUpdateForm = this.fb.group({
      id: '',
      title_id: '',
      title: '',
      product_image: [null],
      is_active:'',
      
    });
    this.panelUpdateForm = this.fb.group({
      id: [''],
      title_id: [''],
      title: [''],
      description:[''],
      image:[''],
      is_active:[''],
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openImageWindow(imageUrl: string) {
    window.open(imageUrl, '_blank', 'height=600,width=800');
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.routeTitle = data['title'];
    });
    this.sliderIndexList();
    this.allProduct();
    this.panelContent();
  }

  //INDEX SLIDER

  indexUpdate = {
    id: null,
    image: null,
    title: null,
    content: null,
    button_text: null,
    button_link: null,
    is_active: null,
  }
  sliderIndexList() {
    this.dataService.indexSliderList().subscribe((data: any) => {
      this.sliderList = data.data;
      console.log(this.sliderList);
    });
  }
  edit(ind: {
    id: null,
    image: null,
    title: null,
    content: null,
    button_text: null,
    button_link: null,
    is_active: null,
  }) {
    this.indexUpdate = ind;
  }
  on_Submit() {
    // console.log(this.myform.value);
    this.dataService.indexSliderUpdate(this.indexUpdate).subscribe((res) => {
      this.data = res;
    });
  }

  //Product

  allProduct() {
    this.dataService.product().subscribe((data: any) => {
      this.productTitleId=data.data.id;
      this.productID = data.data.id;
      this.title = data.title;
      this.product_image = data.data.product_image;
      this.productActive = data.data.is_active;
      console.log(this.title);
      this.productUpdateForm.patchValue({
        id: this.productID,
        title_id: this.productTitleId,
        title: this.title,
        product_image: this.product_image,
        is_active: this.productActive ? '1' : '0'
      });
    });
  }
  ProductUpdateSubmit() {
    const formData = new FormData();
    formData.append('id', this.productUpdateForm.value.id);
    formData.append('title_id', this.productUpdateForm.value.title_id);
    formData.append('title', this.productUpdateForm.value.title);
    formData.append('is_active', this.productUpdateForm.value.is_active);

    // if (this.data) {
    //   formData.append('is_active', this.data.is_active);
    // }
    
    // formData.append('is_active', this.data.is_active);
    // Append the image file only if it's selected
    const product_image = this.productUpdateForm.value.product_image;
    if (this.productUpdateForm.value.product_image instanceof Blob) {
      const product_image = this.productUpdateForm.value.product_image;
      formData.append('product_image', product_image, product_image.name);
    }
  
    this.dataService.productUpdate(formData).subscribe((data: any) => {
      // Handle response as needed
      this.data = data.data;
      this.allProduct();
      this.modalService.hide();
    });
  }
  
  
  // onFileChange(event: any) {
  //   this.files = event.target.files[0];
  //   console.log(this.files);
  //   const formData = new FormData();
  //   // formData.append('file', this.files, this.files.name);
  //   this.product_image = formData.append('image', this.files, this.files.name);
  // }
  onFileChange(event: any) {
  this.files = event.target.files[0];
  console.log(this.files);
  // Assign the selected file to the product_image control
  this.productUpdateForm.patchValue({ product_image: this.files });
}

  
  //PANEL
  panelContent(){
    this.dataService.panel().subscribe((data:any)=>{
      this.panelID = data.data.id;
      this.panelTitleId=data.data.title_id;
      this.panelTitle = data.data.title;
      this.panelDescription = data.data.description;
      this.Panel_image = data.data.image;
      this.panelActive = data.data.is_active;
      // console.log(this.panelID);
      this.panelUpdateForm.patchValue({
        id: this.panelID,
        title_id: this.panelTitleId,
        title: this.title,
        description: this.panelDescription,
        image: this.Panel_image,
        is_active: this.panelActive ? '1' : '0'
      });
    })
  }

  panelUpdateSubmit(){

    // const formData = new FormData();
    // formData.append('id', this.productUpdateForm.value.id);
    // formData.append('title_id', this.productUpdateForm.value.title_id);
    // // formData.append('title', this.productUpdateForm.value.title);
    // formData.append('is_active', this.productUpdateForm.value.is_active);
    // formData.append('description', this.productUpdateForm.value.description);

const formData = this.panelUpdateForm.value;
    this.dataService.panelUpdate(formData).subscribe((data: any) => {
      // Handle response as needed
      this.data = data.data;
      console.log(this.data);
      this.panelContent();
      this.modalService.hide();
    });
  }

  
  }


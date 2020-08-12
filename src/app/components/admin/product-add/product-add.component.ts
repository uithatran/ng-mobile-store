import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  public productForm: FormGroup;
  public submitted: boolean;
  public errNotify: string = '';
  public successNotify: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.mainForm();
    // this.f();
  }

  mainForm() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(6)]],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      unitInStock: ['0', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      manufacturer: ['', Validators.required],
      category: ['', Validators.required],
      condition: ['', Validators.required],
      imageFile: ['', Validators.required],
      imageF: ['']
    })
  }

  get f() {
    // console.log(this.productForm.controls);
    return this.productForm.controls;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('imageFile').setValue(file);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return false;
    } else {
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName').value);
      formData.append('unitPrice', this.productForm.get('unitPrice').value);
      formData.append('unitInStock', this.productForm.get('unitInStock').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('manufacturer', this.productForm.get('manufacturer').value);
      formData.append('category', this.productForm.get('category').value);
      formData.append('condition', this.productForm.get('condition').value);
      formData.append('imageFile', this.productForm.get('imageFile').value);
      this.productService.postProduct(formData).subscribe(data => {
        this.submitted = false;
        this.successNotify = 'Create product successfully!';
        this.productForm.reset();
        this.notify();
      });
    }
  }

  onLogout() {
    this.authService.logout();
  }

  notify() {
    let no = document.getElementsByClassName('success-notify');
    setTimeout(() => {
      this.successNotify = '';
    }, 2000)
  }

}

import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../../_core/_services/ingredient.service';
import { IIngredient } from '../../../_core/_models/Ingredient';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { IngredientModalComponent } from './ingredient-modal/ingredient-modal.component';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {
  data: IIngredient[];
  ingredient: IIngredient = {
    id: 0,
    name: '',
    code: '',
    percentage: 0,
    createdDate: ''
  };
  pagination: Pagination;
  page = 1 ;
  constructor(
    public modalService: NgbModal,
    private ingredientService: IngredientService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }
  show: boolean;
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.data = data['ingredients'].result;
      this.pagination = data['ingredients'].pagination;
      console.log(this.pagination)
      console.log(this.pagination.totalItems)
      this.ingredientService.currentIngredient.subscribe(res => {
        if (res === 200) {
           this.getIngredients();
        }
      });
    });
  }
  printBarcode() {
    this.show = true;
  }
  backList() {
    this.show = false;
  }
  getIngredients() {
    // this.spinner.show();
     this.ingredientService.getIngredients(this.pagination.currentPage, this.pagination.itemsPerPage)
       .subscribe((res: PaginatedResult<IIngredient[]>) => {
         this.data = res.result;
         this.pagination = res.pagination;
     //    this.spinner.hide();
       }, error => {
         this.alertify.error(error);
       });
   }
  getAll() {
    this.ingredientService.getAllIngredient().subscribe(res => {
      this.data = res;
      console.log('Get All: ', res);
    });
  }

  delete(ingredient: IIngredient) {
    this.alertify.confirm('Delete Ingredient', 'Are you sure you want to delete this IngredientID "' + ingredient.id + '" ?', () => {
      this.ingredientService.delete(ingredient.id).subscribe(() => {
        this.getIngredients();
        this.alertify.success('Ingredient has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Ingredient');
      });
    });
  }
  onPageChange($event) {
    this.pagination.currentPage = $event;
    this.getIngredients();
  }
  openIngredientModalComponent() {
    const modalRef = this.modalService.open(IngredientModalComponent, { size: 'md' });
    modalRef.componentInstance.ingredient = this.ingredient;
    modalRef.componentInstance.title = 'Add Ingredient';
    modalRef.result.then((result) => {
      console.log('OpenIngredientModalComponent', result );
    }, (reason) => {
    });
  }
  openIngredientEditModalComponent(item) {
    const modalRef = this.modalService.open(IngredientModalComponent, { size: 'md' });
    modalRef.componentInstance.ingredient = item;
    modalRef.componentInstance.title = 'Edit Ingredient';
    modalRef.result.then((result) => {
      console.log('openIngredientEditModalComponent', result );
    }, (reason) => {
    });
  }

}

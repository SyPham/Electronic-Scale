import { Component, OnInit, Input } from '@angular/core';
import { IIngredient } from '../../../../_core/_models/Ingredient';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { IngredientService } from '../../../../_core/_services/ingredient.service';

@Component({
  selector: 'app-ingredient-modal',
  templateUrl: './ingredient-modal.component.html',
  styleUrls: ['./ingredient-modal.component.scss']
})
export class IngredientModalComponent implements OnInit {
  @Input() title: '';
  @Input() ingredient: IIngredient = {
    id: 0,
    name: '',
    percentage: 0,
    code: this.makeid(8),
    createdDate: ''
  };
  showBarCode: boolean;
  constructor(
    public activeModal: NgbActiveModal,
    private alertify: AlertifyService,
    private ingredientService: IngredientService,
  ) { }

  ngOnInit() {
    if (this.ingredient.id === 0) {
      this.showBarCode = false;
      this.genaratorIngredientCode();
    } else {
      this.showBarCode = true;
    }
  }
  create() {
    this.ingredientService.create(this.ingredient).subscribe( () => {
        this.alertify.success('Created successed!');
        this.activeModal.dismiss();
        this.ingredientService.changeIngredient(200);
    },
    (error) => {
      this.alertify.error(error);
      this.genaratorIngredientCode();
    });
  }
  update() {
    this.ingredientService.create(this.ingredient).subscribe( res => {
      if (res) {
        this.alertify.success('Updated successed!');
      }
    });
  }
  save() {
    if (this.ingredient.id === 0) {
      if (this.ingredient.code === '') {
        this.genaratorIngredientCode();
      }
      this.create();
    } else {
      this.update();
    }
  }
  onBlur($event) {
    this.showBarCode = true;
  }
  genaratorIngredientCode() {
    this.ingredient.code = this.makeid(8);
  }
  makeid(length) {
    let result           = '';
    let characters       = '0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
   // return '59129032';
 }
}

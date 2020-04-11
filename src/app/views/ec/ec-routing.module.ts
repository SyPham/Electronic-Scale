import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlueIngredientComponent } from './glue-ingredient/glue-ingredient.component';
import { GlueComponent } from './glue/glue.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { GlueModalComponent} from './glue/glue-modal/glue-modal.component';
import { IngredientModalComponent} from './ingredient/ingredient-modal/ingredient-modal.component';
import { GlueResolver } from '../../_core/_resolvers/glue.resolver';
import { IngredientResolver } from '../../_core/_resolvers/ingredient.resolver';
import { MakeGlueComponent } from './make-glue/make-glue.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ec'
    },
    children: [
      {
        path: 'glue-ingredient',
        children:
          [
            {
              path: '',
              resolve: { glues: GlueResolver },
              component: GlueIngredientComponent,
              data: {
                title: 'Glue Ingredient'
              }
            }
          ]
      },
      {
        path: 'make-glue',
        children:
          [
            {
              path: '',
              component: MakeGlueComponent,
              data: {
                title: 'Make Glue'
              }
            }
          ]
      },
      {
        path: 'glue',
        children:
          [
            {
              path: '',
              component: GlueComponent,
              resolve: { glues: GlueResolver },
              data: {
                title: 'Glues'
              }
            }
          ]
      },
      {
        path: 'ingredient',
        children:
          [
            {
              path: '',
              resolve: { ingredients: IngredientResolver },
              component: IngredientComponent,
              data: {
                title: 'Ingredient'
              }
            }
          ]
      },
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ECRoutingModule { }

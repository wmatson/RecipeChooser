import {Recipe} from "../../entities/recipe";
import {Component,Input} from '@angular/core';

@Component({
  selector: 'recipe-detail',
  template: require('./recipe-detail.template.html'),
  styles: [require('./recipe-detail.css')]
})
export class RecipeDetailComponent {
  @Input() recipe:Recipe;
  private ingredientsVisible = false;
}

import {Recipe} from "../entities/recipe";
import {DataService} from "../services/data-service";
import {Component, OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail';

@Component({
  selector: 'root-component',
  template: require('./root.template.html'),
  providers: [
    HTTP_PROVIDERS, DataService
  ],
  directives: [RecipeDetailComponent]
})
export class RootComponent implements OnInit {
  recipes:Recipe[] = [];

  constructor(private dataService:DataService){}

  ngOnInit() {
    this.dataService.getData().subscribe(recipes => {
      this.recipes = recipes;
    })
  }

  filtered(recipes:Recipe[], nameSearch:string, ingredientSearch:string, excludeIngredientSearch:string)
  {
    if(!nameSearch && !ingredientSearch && !excludeIngredientSearch)
      return recipes;
    let nameRegex = new RegExp(nameSearch || '.', 'i');
    let ingredientRegex = new RegExp(ingredientSearch || '.', 'i');
    let excludeIngredientRegex = new RegExp(excludeIngredientSearch || '$^', 'i');
    return recipes.filter(item => {
      return nameRegex.test(item.name);
    }).filter(item => {
      return item.ingredients.some(category => {
        return category.ingredients.some(ingredient => {
          return ingredientRegex.test(ingredient.name);
        })
      })
    }).filter(item => {
      return !item.ingredients.some(category => {
        return category.ingredients.some(ingredient => {
          return excludeIngredientRegex.test(ingredient.name);
        })
      });
    });
  }
}

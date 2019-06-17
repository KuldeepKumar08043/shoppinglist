import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
recipeSelected = new EventEmitter<Recipe>();
recipeChanged = new Subject<Recipe[]>();
  private  recipes: Recipe[] = [
        new Recipe('A test Recipe', 'This is a simple test', 'https://images.pexels.com/photos/1857942/pexels-photo-1857942.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('A test Recipe', 'This is a simple test', 'https://www.maxpixel.net/static/photo/1x/Food-Kitchen-Meals-Home-Made-Dishes-Recipe-Bio-1175493.jpg', [
            new Ingredient('Burger', 2),
            new Ingredient('Jlebi', 50)
        ]),
        new Recipe('A test Recipe', 'This is a simple test', 'http://www.1zoom.me/big2/641/331263-svetik.jpg', [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('A test Recipe', 'This is a simple test', 'https://images.pexels.com/photos/1857942/pexels-photo-1857942.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', [
            new Ingredient('Burger', 2),
            new Ingredient('Jlebi', 50)
        ])
      ];

      constructor( private slService: ShoppingListService ) {

      }

      getRecipe() {
          return this.recipes.slice();
      }

      getRecipes(index: number) {
        return this.recipes[index];
      }

      addIngredientToShoppingList(ingredient: Ingredient[]){
        this.slService.addIngredients(ingredient);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
}

import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';


@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {  }

    storeRecipes() {
        const recipes = this.recipeService.getRecipe();
        this.http.put('https://ng-cource-recipe-book-674a0.firebaseio.com/recipes.json', 
        recipes
        )
        .subscribe(response => {
            console.log('res = ', response);
        })
    }

    fetchRecipe() {
        return this.http
        .get<Recipe[]>('https://ng-cource-recipe-book-674a0.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return { 
                    ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : []
                 }
            });
        }), 
        tap(recipes => {
            console.log('recipe = ', recipes);
            this.recipeService.setRecipe(recipes);            
        })
        )
    }  
}


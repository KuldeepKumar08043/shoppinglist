import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients: Ingredient[];
private subscription: Subscription;
  constructor( private shoppingListService: ShoppingListService ) { }

  ngOnInit() { 
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      } 
    )
  }

  onEditItem(index: number) {
    this.shoppingListService.startingEdition.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 }

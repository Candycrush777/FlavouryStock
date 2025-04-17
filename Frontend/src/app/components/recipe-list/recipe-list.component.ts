import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../models/recipes';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  @Input() recipes: Recipe[] = [];
  @Output() showDetail = new EventEmitter<Recipe>();

  viewDetail(recipe: Recipe) {
    this.showDetail.emit(recipe);
  }

}

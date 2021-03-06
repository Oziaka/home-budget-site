import {Component} from '@angular/core';
import {Category} from '../models/category.model';
import {CategoryHttpService} from './category.http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  categories: Array<Category> = new Array<Category>();


  constructor(private categoryHttpService: CategoryHttpService,
              private router: Router) {
    this.getCategories();
  }

  removeCategory(categoyrId: bigint) {
    this.categoryHttpService.removeCategory(categoyrId).subscribe(success => {
      this.categories = this.categories.filter(category => category.id !== categoyrId);
    });
  }

  restoreDefaultCategories() {
    this.categoryHttpService.restoreDefaultCategories().subscribe((success: Array<Category>) => {
      this.categories = success;
    }, error => {
    });
  }

  goAddCategory() {
    this.router.navigateByUrl('/category/add');
  }

  private getCategories() {
    this.categoryHttpService.getUserCategories().subscribe(success => {
      this.categories = success;
    }, error => {
    });
  }
}

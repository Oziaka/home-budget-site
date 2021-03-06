import {Component, OnInit} from '@angular/core';
import {Category} from '../../models/category.model';
import {CategoryHttpService} from '../category.http.service';
import {TransactionHttpService} from '../../transaction/transaction.http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-creator',
  templateUrl: './category-creator.component.html'
})
export class CategoryCreatorComponent implements OnInit {

  category: Category = new Category();
  error: any;
  transactionTypes: Array<string> = new Array<string>();
  transactionTypeString: string;


  constructor(private categoryHttpService: CategoryHttpService, private transactionHttpService: TransactionHttpService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.transactionHttpService.getTypes().subscribe((success: Array<string>) => {
      this.transactionTypes = success.map(k => k.substring(0, 1) + k.substring(1, k.length).toLowerCase().replace('_', ' '));
      this.transactionTypeString = this.transactionTypes[0];
    });
  }


  addCategory() {
    this.category.transactionType = this.transactionTypeString.toUpperCase().replace(' ', '_');
    this.categoryHttpService.addCategory(this.category).subscribe(success => {
        this.router.navigateByUrl('/category');
      },
      error => {
        this.error = error.error.errors;
      });
  }

}

import { Product } from './models/product';
import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { Suggestion } from './models/suggestion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'searchApp';
  initialValue = ""

  products: Product[] = []
  suggestions: Suggestion[] = []
  returnNoContent = false

  constructor(private appService: AppService) { }

  search() {
    if(!this.initialValue) {
      return
    }
    this.returnNoContent = false
    this.appService.getData(this.initialValue).subscribe(resp => {
      if(!resp.products.length && !resp.suggestions.length) {
        this.returnNoContent = true
      }
      this.products = resp.products.map(item => this.transformToProduct(item))
      this.suggestions = resp.suggestions
    })
  }

  searchBysuggestion(term: string) {
    this.initialValue = term
    this.search()
  }


  private transformToProduct(obj: any): Product {
    const { _meta, ...plainObj} = obj
    const product: Product = Object.assign({}, plainObj)
    return product
  }
}

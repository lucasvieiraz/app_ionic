import { Component } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  bookName: string = '';
  bookSummary: string = '';
  bookCover: string = '';

  constructor(private bookService: BookService) {}

  getBook() {
    if (this.bookName) {
      this.bookService.searchBook(this.bookName).subscribe((data) => {
        if (data.items && data.items.length > 0) {
          const volumeInfo = data.items[0].volumeInfo;
          this.bookSummary = volumeInfo.description || 'Resumo não disponível.';


          this.bookCover = volumeInfo.imageLinks?.thumbnail || '';
        } else {
          this.bookSummary = 'Nenhum livro encontrado.';
          this.bookCover = '';
        }
      }, (error) => {
        console.error('Erro na requisição:', error);
        this.bookSummary = 'Erro ao buscar o livro. Tente novamente mais tarde.';
        this.bookCover = '';
      });
    }
  }
}

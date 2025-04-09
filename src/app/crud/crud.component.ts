import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';

interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  categoria: string;
}

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [NgFor],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
  produtos: Produto[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos() {
    this.apiService.listarProdutos().subscribe(
      (produtos: Produto[]) => {
        this.produtos = produtos;
      },
      (err: HttpErrorResponse) => {
        console.log('Erro ao listar produtos', err);
      }
    );
  }
}
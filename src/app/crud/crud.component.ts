import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Produto {
	id: number;
	ativo: string;
	nome: string;
	quantidade: number;
	categoria: string;
}

interface Categoria {
	id: number;
	name: string;
	ativo: string;
}

@Component({
	selector: 'app-crud',
	standalone: true,
	imports: [
		NgFor,
		FormsModule
	],
	templateUrl: './crud.component.html',
	styleUrl: './crud.component.css'
})

export class CrudComponent {
	
	produtos: Produto[] = [];
	categorias: Categoria[] = [];
	
	produto = {
		nome: '',
		quantidade: 0,
		categoria: ''
	};
	
	showModal: boolean = false;

	// Método para abrir o modal
	openModal() {
		this.showModal = true;
	}

	// Método para fechar o modal
	closeModal() {
		this.showModal = false;
	}

	constructor(private apiService: ApiService) {}

	ngOnInit() {
		this.listarProdutos();
		this.listarCategorias();
		
		 // Logs temporários para debug
		setTimeout(() => {
			console.log('Produtos:', this.produtos);
			console.log('Categorias:', this.categorias);
		}, 1000);
	}
	
	cadastrarProduto(){
		
		console.log('cadastrarProduto');
		console.log('produto', this.produto);
		
		this.apiService.cadastrarProduto( this.produto ).subscribe(produto => {
			
			this.listarProdutos();
			this.closeModal();
			
		},
		err =>{
			
			console.log('Erro ao cadatrar produto: ', err);
			
		})
		
	}
	
	atualizarProduto(){}
	
	removerProduto(){}
	
	get produtosAtivos() {
		return this.produtos.filter(produto => produto.ativo == '1');
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

	listarCategorias() {
		this.apiService.listarCategorias().subscribe(
			(categorias: Categoria[]) => {
				this.categorias = categorias;
			},
			(err: HttpErrorResponse) => {
				console.log('Erro ao listar categorias', err);
			}
		);
	}

	// Método para obter o nome da categoria pelo ID
	getNomeCategoria(categoriaId: any): string {
		// Se não houver categorias carregadas ainda
		if (!this.categorias || this.categorias.length === 0) {
			return 'Carregando...';
		}

		// Converter para número (caso o ID venha como string)
		const id = Number(categoriaId);
		
		// Encontrar a categoria
		const categoria = this.categorias.find(c => c.id === id);
		
		// Se não encontrar, mostrar o ID original para debug
		if (!categoria) {
			console.warn('Categoria não encontrada para ID:', categoriaId);
			return `[ID: ${categoriaId}]`;
		}
		
		return categoria.name;
	}
}
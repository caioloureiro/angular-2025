import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor( private http: HttpClient ) { }
	
	listarProdutos(): Observable<any>{
		
		return this.http.get("http://localhost/Yii2-api/web/api/produtos");
		
	}
	
	listarCategorias(): Observable<any>{
		
		return this.http.get("http://localhost/Yii2-api/web/api/categorias");
		
	}
	
	cadastrarProduto(produto: any): Observable<any> {
		
		return this.http.post("http://localhost/Yii2-api/web/api/produtos", JSON.stringify(produto), {
			headers: { 'Content-Type': 'application/json' }
		});
		
	}
	
	atualizarProduto(id: number, produto: any): Observable<any> {
		// Corrigindo a concatenação do ID
		return this.http.put(
		`http://localhost/Yii2-api/web/api/produtos/${id}`,
		JSON.stringify(produto),
		{
			headers: { 'Content-Type': 'application/json' }
		}
		);
	}

	removerProduto(id: number): Observable<any> {
		// Envia uma requisição DELETE para o endpoint específico
		return this.http.delete(
		`http://localhost/Yii2-api/web/api/produtos/${id}`
		);
		
		// Se precisasse enviar dados no corpo (opcional):
		// return this.http.delete(
		//	 `http://localhost/Yii2-api/web/api/produtos/${id}`,
		//	 { body: { ativo: '0' } }
		// );
	}

}

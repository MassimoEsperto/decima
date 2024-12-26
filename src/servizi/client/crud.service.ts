import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WS_BASE_URL, WS_EXTENSION } from 'src/environments/env';
import { SERVICE_CRUD } from 'src/environments/costanti';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  private typeServices: string;

  constructor(private http: HttpClient, typeServices: string) {
    this.typeServices = typeServices;
  }

  //Url base dei servizi
  private buildURL(operation: string = ""): string {
    return WS_BASE_URL + this.typeServices + operation + WS_EXTENSION
  }

  // Crea una nuova entità
  create(servizio: string, payload: T): Observable<T> {
    return this.http.post<T>(`${this.buildURL(servizio + SERVICE_CRUD.CREATE)}`, { data: payload });
  }

  // Ottieni tutte le entità
  getAll(servizio: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.buildURL(servizio + SERVICE_CRUD.LIST)}`);
  }

  // Ottieni una entità per ID
  getById(servizio: string, id: number): Observable<T> {
    const params = new HttpParams().set('id', id);
    return this.http.get<T>(`${this.buildURL(servizio + SERVICE_CRUD.DETAILS)}`, { params: params });
  }

  // Ottieni lista filtrata
  getFilter(servizio: string, filters: any[]): Observable<T[]> {

    let params = new HttpParams();

    // Aggiungi ciascun filtro ai parametri della query
    filters.forEach((filter: { campo: string; valore: string | number | boolean; }) => {
      params = params.set(filter.campo, filter.valore);
    });

    return this.http.get<T[]>(`${this.buildURL(servizio + SERVICE_CRUD.FILTER)}`, { params: params });
  }

  // Aggiorna un'entità
  update(servizio: string, payload: T): Observable<T> {
    return this.http.put<T>(`${this.buildURL(servizio + SERVICE_CRUD.UPDATE)}`, { data: payload });
  }

  // Elimina un'entità
  delete(servizio: string, id: number): Observable<void> {
    // Costruisci i parametri di query con l'ID
    const params = new HttpParams().set('id', id);
    return this.http.delete<void>(`${this.buildURL(servizio + SERVICE_CRUD.DELETE)}`, { params: params });
  }
}

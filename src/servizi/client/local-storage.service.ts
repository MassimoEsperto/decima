import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private helper = new JwtHelperService(); // Istanza di JwtHelperService

  constructor() { }


  // Metodo per salvare dati
  setObject(key: string, value: any): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // Metodo per recuperare dati
  getObject<T>(key: string): T | null {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue) as T;
    }
    return null;
  }

  // Salva una stringa nel localStorage
  setString(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  // Recupera una stringa dal localStorage
  getString(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  // Decodifica un token JWT salvato nel localStorage
  getDecodedToken(key: string): any | null {
    const token = sessionStorage.getItem(key);
    if (token) {
      try {
        return this.helper.decodeToken(token); // Decodifica il token
      } catch (error) {
        console.error('Errore nel decodificare il token', error);
        return null;
      }
    }
    return null; // Se non troviamo il token
  }

  // Metodo per rimuovere un dato
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Metodo per svuotare la localStorage
  clear(): void {
    localStorage.clear();
  }

  // Metodo per verificare se esiste un elemento
  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

}

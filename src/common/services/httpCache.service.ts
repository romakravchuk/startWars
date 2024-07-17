import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  private cache = new Map<string, any>();

  get(key: string): any {
    return this.cache.get(key);
  }

  put(key: string, data: any): void {
    this.cache.set(key, data);
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getAll(): Map<string, any> {
    return new Map(this.cache);
  }

  replaceAll(newCache: Map<string, any>): void {
    this.cache = new Map(newCache);
  }
}

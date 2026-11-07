import { Injectable } from '@angular/core';

/** Remembers, for the current browser session, that the visitor accepted the privacy policy and storage notice. */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly key = 'laptopstore_notice';
  private memory = false;

  get accepted(): boolean {
    if (this.memory) return true;
    try { return sessionStorage.getItem(this.key) === '1'; } catch { return false; }
  }

  accept(): void {
    this.memory = true;
    try { sessionStorage.setItem(this.key, '1'); } catch { /* storage blocked: memory only */ }
  }
}

import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  currentLang = signal<'en' | 'ru'>('en');

  toggleLanguage() {
    this.currentLang.update(lang => lang === 'en' ? 'ru' : 'en');
  }

  translate(translations: { en: string; ru: string }): string {
    return translations[this.currentLang()];
  }
}

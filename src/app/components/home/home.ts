import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h1>{{ i18n.currentLang() === 'en' ? 'Welcome to Senior Frontend Course' : 'Добро пожаловать на Senior Frontend курс' }}</h1>
      <p>
        {{ i18n.currentLang() === 'en'
           ? 'Select a topic from the sidebar to begin your journey to seniority.'
           : 'Выберите тему в боковой панели, чтобы начать свой путь к Senior-уровню.' }}
      </p>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>🚀 Senior Level</h3>
          <p>Deep dive into architecture, performance, and advanced patterns.</p>
        </div>
        <div class="stat-card">
          <h3>🌍 Bilingual</h3>
          <p>Full content in both English and Russian.</p>
        </div>
        <div class="stat-card">
          <h3>🛠 Practical</h3>
          <p>Real-world tasks and interview preparation questions.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 3rem;
    }
    .stat-card {
      padding: 1.5rem;
      background: var(--surface-card);
      border-radius: 12px;
      border: 1px solid var(--surface-border);
      text-align: left;
    }
  `]
})
export class HomeComponent {
  i18n = inject(I18nService);
}

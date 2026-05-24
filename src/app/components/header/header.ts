import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n';
import { ProgressService } from '../../services/progress';
import { COURSE_DATA } from '../../course-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="logo">
        <h1>{{ i18n.currentLang() === 'en' ? 'Senior Frontend Roadmap' : 'Senior Frontend Путь' }}</h1>
      </div>

      <div class="header-actions">
        <div class="progress-info">
          <span>{{ i18n.currentLang() === 'en' ? 'Overall Progress' : 'Общий прогресс' }}: {{ progressPercent | number:'1.0-0' }}%</span>
          <div class="progress-bar-mini">
            <div class="progress-fill" [style.width.%]="progressPercent"></div>
          </div>
        </div>

        <button (click)="i18n.toggleLanguage()" class="lang-toggle">
          {{ i18n.currentLang() === 'en' ? 'RU' : 'EN' }}
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: var(--surface-card);
      border-bottom: 1px solid var(--surface-border);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
      color: var(--primary-color);
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .progress-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 150px;
    }
    .progress-bar-mini {
      height: 6px;
      background: var(--surface-ground);
      border-radius: 3px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--primary-color);
      transition: width 0.3s ease;
    }
    .lang-toggle {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: 1px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      cursor: pointer;
      font-weight: bold;
    }
    .lang-toggle:hover {
      background: var(--primary-color);
      color: white;
    }
  `]
})
export class HeaderComponent {
  i18n = inject(I18nService);
  progress = inject(ProgressService);

  get progressPercent() {
    // Flatten topics to get total count
    const countSubtopics = (topics: any[]): number => {
      return topics.reduce((acc, t) => {
        return acc + 1 + (t.subtopics ? countSubtopics(t.subtopics) : 0);
      }, 0);
    };
    const total = countSubtopics(COURSE_DATA);
    return this.progress.getProgress(total);
  }
}

import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topic } from '../../models/topic';
import { I18nService } from '../../services/i18n';
import { ProgressService } from '../../services/progress';
import { QuizComponent } from '../quiz/quiz';

@Component({
  selector: 'app-topic-content',
  standalone: true,
  imports: [CommonModule, QuizComponent],
  template: `
    @if (topic) {
      <div class="content-wrapper">
        <header class="content-header">
          <h2>{{ i18n.translate(topic.title) }}</h2>
          <button (click)="progress.toggleTopic(topic.id)"
                  [class.completed]="progress.isCompleted(topic.id)"
                  class="complete-btn">
            {{ progress.isCompleted(topic.id)
               ? (i18n.currentLang() === 'en' ? 'Completed' : 'Завершено')
               : (i18n.currentLang() === 'en' ? 'Mark as Complete' : 'Отметить как готовое') }}
          </button>
        </header>

        @if (topic.summary) {
          <section class="summary-section">
            <div class="summary-card">
              <h4>{{ i18n.currentLang() === 'en' ? 'Quick Recap' : 'Краткий пересказ' }}</h4>
              <p>{{ i18n.translate(topic.summary) }}</p>
            </div>
          </section>
        }

        <section class="theory">
          <h3>{{ i18n.currentLang() === 'en' ? 'Theory' : 'Теория' }}</h3>
          @if (topic.theory) {
            <div class="theory-content" [innerHTML]="i18n.translate(topic.theory)"></div>
          }
        </section>

        @if (topic.practice) {
          <section class="practice">
            <h3>{{ i18n.currentLang() === 'en' ? 'Practical Task' : 'Практическое задание' }}</h3>
            <div class="practice-box">
              {{ i18n.translate(topic.practice) }}
            </div>
          </section>
        }

        @if (topic.interviewQuestions) {
          <section class="interview">
            <h3>{{ i18n.currentLang() === 'en' ? 'Interview Questions' : 'Вопросы для собеседования' }}</h3>
            <ul>
              @for (q of topic.interviewQuestions; track q.en) {
                <li>{{ i18n.translate(q) }}</li>
              }
            </ul>
          </section>
        }

        @if (topic.quiz) {
          <app-quiz [questions]="topic.quiz"></app-quiz>
        }
      </div>
    }
  `,
  styles: [`
    .content-wrapper { padding: 2rem; max-width: 900px; margin: 0 auto; }
    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--surface-border);
    }
    .complete-btn {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      border: 2px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s;
    }
    .complete-btn.completed { background: #22C55E; border-color: #22C55E; color: white; }

    .summary-section { margin-bottom: 2.5rem; }
    .summary-card {
      background: #f0f9ff;
      border-radius: 12px;
      padding: 1.25rem;
      border: 1px solid #bae6fd;
    }
    .summary-card h4 { margin-top: 0; color: #0369a1; margin-bottom: 0.5rem; }
    .summary-card p { margin: 0; color: #0c4a6e; line-height: 1.5; font-size: 0.95rem; }

    section { margin-bottom: 3rem; }
    h3 { color: var(--primary-color); margin-bottom: 1rem; }
    .theory-content { line-height: 1.6; font-size: 1.1rem; }
    .practice-box {
      padding: 1.5rem;
      background: #f8fafc;
      border-left: 4px solid var(--primary-color);
      border-radius: 4px;
    }
    ul { padding-left: 1.5rem; }
    li { margin-bottom: 0.5rem; }
  `]
})
export class TopicContentComponent {
  @Input() topic: Topic | null = null;
  i18n = inject(I18nService);
  progress = inject(ProgressService);
}

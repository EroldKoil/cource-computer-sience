import { Component, inject, input, signal, computed } from '@angular/core';
import { QuizQuestion } from '../../models/topic';
import { I18nService } from '../../services/i18n';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quiz-container">
      <div class="quiz-header">
        <span class="quiz-badge">{{ i18n.currentLang() === 'en' ? 'QUIZ' : 'ТЕСТ' }}</span>
        <h3>{{ i18n.currentLang() === 'en' ? 'Check your knowledge' : 'Проверьте свои знания' }}</h3>
      </div>

      @for (q of questions(); track $index; let qIdx = $index) {
        <div class="question-block">
          <p class="question-text">
            <span class="q-number">{{ qIdx + 1 }}.</span>
            {{ i18n.translate(q.question) }}
          </p>
          <div class="options">
            @for (opt of (i18n.currentLang() === 'en' ? q.options['en'] : q.options['ru']); track $index; let optIdx = $index) {
              <button
                class="option-btn"
                [class.selected]="selectedAnswers()[qIdx] === optIdx"
                [class.correct]="showResults() && optIdx === q.correctAnswer"
                [class.wrong]="showResults() && selectedAnswers()[qIdx] === optIdx && optIdx !== q.correctAnswer"
                (click)="selectOption(qIdx, optIdx)"
                [disabled]="showResults()">
                <span class="opt-marker">{{ getMarker(optIdx) }}</span>
                <span class="opt-text">{{ opt }}</span>
              </button>
            }
          </div>
        </div>
      }

      <div class="quiz-footer">
        @if (!showResults()) {
          <button class="submit-btn" (click)="submitQuiz()" [disabled]="!allAnswered()">
            {{ i18n.currentLang() === 'en' ? 'Submit Answers' : 'Отправить ответы' }}
          </button>
        } @else {
          <div class="result-container">
            <div class="score-display" [class.perfect]="score() === questions().length">
              <span class="score-value">{{ score() }} / {{ questions().length }}</span>
              <span class="score-label">{{ i18n.currentLang() === 'en' ? 'Correct' : 'Верно' }}</span>
            </div>
            <button class="retry-btn" (click)="resetQuiz()">
              {{ i18n.currentLang() === 'en' ? 'Try Again' : 'Еще раз' }}
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .quiz-container {
      background: var(--surface-card);
      padding: 2rem;
      border-radius: 16px;
      margin-top: 3rem;
      border: 1px solid var(--surface-border);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }
    .quiz-header {
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .quiz-badge {
      background: var(--primary-color);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.05em;
    }
    .quiz-header h3 { margin: 0; font-size: 1.5rem; }

    .question-block { margin-bottom: 2.5rem; }
    .question-text {
      font-weight: 600;
      font-size: 1.15rem;
      margin-bottom: 1.25rem;
      color: #1e293b;
      display: flex;
      gap: 0.75rem;
    }
    .q-number { color: var(--primary-color); }

    .options { display: flex; flex-direction: column; gap: 0.75rem; }
    .option-btn {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      text-align: left;
      border: 1px solid var(--surface-border);
      background: #fff;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover:not(:disabled) {
        border-color: var(--primary-color);
        background: var(--primary-light);
      }

      &.selected {
        border-color: var(--primary-color);
        background: var(--primary-light);
        box-shadow: 0 0 0 1px var(--primary-color);
      }

      &.correct {
        background: #ecfdf5;
        border-color: #10b981;
        color: #065f46;
        .opt-marker { background: #10b981; color: white; border-color: #10b981; }
      }

      &.wrong {
        background: #fef2f2;
        border-color: #ef4444;
        color: #991b1b;
        .opt-marker { background: #ef4444; color: white; border-color: #ef4444; }
      }

      &:disabled { cursor: default; }
    }

    .opt-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: 1px solid var(--surface-border);
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
      flex-shrink: 0;
    }

    .quiz-footer { margin-top: 2rem; border-top: 1px solid var(--surface-border); padding-top: 2rem; }

    .submit-btn {
      width: 100%;
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 10px;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover:not(:disabled) { opacity: 0.9; }
      &:disabled { background: #cbd5e0; cursor: not-allowed; }
    }

    .result-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .score-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem;
      border-radius: 50%;
      width: 120px;
      height: 120px;
      justify-content: center;
      border: 4px solid #e2e8f0;

      &.perfect { border-color: #10b981; color: #10b981; }
    }
    .score-value { font-size: 1.5rem; font-weight: 800; }
    .score-label { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; }

    .retry-btn {
      background: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
      &:hover { background: var(--primary-light); }
    }
  `]
})
export class QuizComponent {
  i18n = inject(I18nService);
  questions = input.required<QuizQuestion[]>();

  selectedAnswers = signal<Record<number, number>>({});
  showResults = signal(false);
  score = signal(0);

  allAnswered() {
    return Object.keys(this.selectedAnswers()).length === this.questions().length;
  }

  selectOption(qIdx: number, optIdx: number) {
    this.selectedAnswers.update(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  submitQuiz() {
    let correct = 0;
    this.questions().forEach((q, idx) => {
      if (this.selectedAnswers()[idx] === q.correctAnswer) correct++;
    });
    this.score.set(correct);
    this.showResults.set(true);
  }

  resetQuiz() {
    this.selectedAnswers.set({});
    this.showResults.set(false);
    this.score.set(0);
  }

  getMarker(idx: number): string {
    return String.fromCharCode(65 + idx); // A, B, C, D...
  }
}

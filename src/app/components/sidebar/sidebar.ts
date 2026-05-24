import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n';
import { ProgressService } from '../../services/progress';
import { Topic } from '../../models/topic';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="sidebar">
      <nav>
        <ul>
          @for (topic of topics; track topic.id) {
            <li>
              <div class="topic-item"
                   [class.active]="selectedTopicId === topic.id"
                   (click)="selectTopic(topic.id)">
                <span class="status-icon" [class.completed]="progress.isCompleted(topic.id)">
                  {{ progress.isCompleted(topic.id) ? '✓' : '○' }}
                </span>
                <span class="topic-title">{{ i18n.translate(topic.title) }}</span>
              </div>

              @if (topic.subtopics) {
                <ul class="subtopics">
                  @for (sub of topic.subtopics; track sub.id) {
                    <li (click)="selectTopic(sub.id)"
                        [class.active]="selectedTopicId === sub.id"
                        class="subtopic-item">
                      <span class="status-icon" [class.completed]="progress.isCompleted(sub.id)">
                        {{ progress.isCompleted(sub.id) ? '✓' : '○' }}
                      </span>
                      <span class="subtopic-title">{{ i18n.translate(sub.title) }}</span>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        </ul>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 300px;
      height: 100%;
      overflow-y: auto;
      background: var(--surface-card);
      border-right: 1px solid var(--surface-border);
      padding: 1rem;
    }
    ul { list-style: none; padding: 0; margin: 0; }
    .topic-item {
      padding: 0.75rem;
      cursor: pointer;
      font-weight: bold;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }
    .subtopics { margin-left: 1.5rem; margin-top: 0.25rem; margin-bottom: 0.75rem; }
    .subtopic-item {
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      font-size: 0.9rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.125rem;
    }
    .topic-item:hover, .subtopic-item:hover { background: var(--surface-hover); }
    .active { background: var(--primary-light) !important; color: var(--primary-color); }
    .status-icon { font-size: 1.1rem; width: 20px; text-align: center; }
    .status-icon.completed { color: #22C55E; }
  `]
})
export class SidebarComponent {
  @Input() topics: Topic[] = [];
  @Input() selectedTopicId?: string;
  @Output() topicSelected = new EventEmitter<string>();

  i18n = inject(I18nService);
  progress = inject(ProgressService);

  selectTopic(id: string) {
    this.topicSelected.emit(id);
  }
}

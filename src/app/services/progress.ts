import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly STORAGE_KEY = 'frontend_course_progress';
  completedTopics = signal<string[]>(this.loadProgress());

  private loadProgress(): string[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  toggleTopic(id: string) {
    this.completedTopics.update(completed => {
      const next = completed.includes(id)
        ? completed.filter(t => t !== id)
        : [...completed, id];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  isCompleted(id: string): boolean {
    return this.completedTopics().includes(id);
  }

  getProgress(total: number): number {
    if (total === 0) return 0;
    return (this.completedTopics().length / total) * 100;
  }
}

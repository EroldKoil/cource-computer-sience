import { Component, signal, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { SidebarComponent } from './components/sidebar/sidebar';
import { TopicContentComponent } from './components/topic-content/topic-content';
import { HomeComponent } from './components/home/home';
import { COURSE_DATA } from './course-data';
import { Topic } from './models/topic';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, TopicContentComponent, HomeComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  topics = COURSE_DATA;
  selectedTopic = signal<Topic | null>(null);

  onTopicSelected(id: string) {
    const topic = this.findTopicById(id);
    if (topic) {
      this.selectedTopic.set(topic);
    }
  }

  private findTopicById(id: string, topics: Topic[] = this.topics): Topic | undefined {
    for (const topic of topics) {
      if (topic.id === id) return topic;
      if (topic.subtopics) {
        const found = this.findTopicById(id, topic.subtopics);
        if (found) return found;
      }
    }
    return undefined;
  }
}

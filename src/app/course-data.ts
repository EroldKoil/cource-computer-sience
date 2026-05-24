import { Topic } from './models/topic';

export const COURSE_DATA: Topic[] = [
  {
    id: 'cs',
    title: { en: 'Computer Science', ru: 'Computer Science' },
    summary: {
      en: 'Mastering data structures like HashMaps, Trees, and Graphs is essential for high-performance frontend applications.',
      ru: 'Освоение структур данных, таких как хеш-таблицы, деревья и графы, необходимо для создания высокопроизводительных фронтенд-приложений.'
    },
    theory: {
      en: `
        <h3>Data Structures for Seniors</h3>
        <p>Understanding the internals of data structures is crucial for performance optimization.</p>
        <ul>
          <li><strong>Hash Maps:</strong> Collision resolution strategies (Chaining vs Open Addressing).</li>
          <li><strong>Trees:</strong> AVL, Red-Black trees, and B-Trees for database indexing.</li>
          <li><strong>Graphs:</strong> Pathfinding algorithms (Dijkstra, A*) and their applications.</li>
        </ul>
      `,
      ru: `
        <h3>Data Structures для опытных разработчиков</h3>
        <p>Понимание внутреннего устройства структур данных критически важно для оптимизации производительности.</p>
        <ul>
          <li><strong>Хеш-таблицы:</strong> Стратегии разрешения коллизий.</li>
          <li><strong>Деревья:</strong> AVL, Красно-черные деревья и B-деревья для индексации БД.</li>
          <li><strong>Графы:</strong> Алгоритмы поиска пути (Дейкстра, A*) и их применение.</li>
        </ul>
      `
    },
    practice: {
      en: 'Implement a LRU Cache with O(1) get and put operations.',
      ru: 'Реализуйте LRU кэш с операциями get и put за O(1).'
    },
    interviewQuestions: [
      { en: 'Explain the difference between a Process and a Thread.', ru: 'Объясните разницу между процессом и потоком.' },
      { en: 'What is "Big O" notation and why is it important?', ru: 'Что такое нотация "Big O" и почему она важна?' }
    ],
    quiz: [
      {
        question: { en: 'What is the time complexity of searching in a balanced Binary Search Tree?', ru: 'Какова временная сложность поиска в сбалансированном двоичном дереве поиска?' },
        options: { en: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], ru: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'] },
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'internet',
    title: { en: 'Internet', ru: 'Интернет' },
    subtopics: [
      {
        id: 'what-is-http',
        parentId: 'internet',
        title: { en: 'What is HTTP?', ru: 'Что такое HTTP?' },
        summary: {
          en: 'HTTP/2 and HTTP/3 bring significant performance gains through multiplexing and QUIC.',
          ru: 'HTTP/2 и HTTP/3 обеспечивают значительный прирост производительности за счет мультиплексирования и QUIC.'
        },
        theory: {
          en: `
            <p>HTTP (Hypertext Transfer Protocol) is the foundation of data exchange on the Web.</p>
            <ul>
              <li><strong>HTTP/1.1:</strong> Persistent connections, pipelining.</li>
              <li><strong>HTTP/2:</strong> Multiplexing, header compression (HPACK), server push.</li>
              <li><strong>HTTP/3:</strong> Based on QUIC (UDP), solves Head-of-line blocking.</li>
            </ul>
          `,
          ru: `
            <p>HTTP (Hypertext Transfer Protocol) — это основа обмена данными в Интернете.</p>
            <ul>
              <li><strong>HTTP/1.1:</strong> Стойкие соединения, конвейеризация.</li>
              <li><strong>HTTP/2:</strong> Мультиплексирование, сжатие заголовков (HPACK), server push.</li>
              <li><strong>HTTP/3:</strong> На основе QUIC (UDP), решает проблему блокировки начала очереди.</li>
            </ul>
          `
        },
        quiz: [
          {
            question: { en: 'Which protocol is used by HTTP/3 as a transport layer?', ru: 'Какой протокол используется HTTP/3 в качестве транспортного уровня?' },
            options: { en: ['TCP', 'UDP (QUIC)', 'SCTP', 'HTTP'], ru: ['TCP', 'UDP (QUIC)', 'SCTP', 'HTTP'] },
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'dns',
        parentId: 'internet',
        title: { en: 'DNS and how it works?', ru: 'DNS и как он работает?' },
        summary: {
          en: 'DNS is the global phonebook of the internet, converting names to IPs.',
          ru: 'DNS — это глобальная телефонная книга интернета, преобразующая имена в IP-адреса.'
        },
        theory: {
          en: '<p>DNS (Domain Name System) translates human-readable domain names to IP addresses.</p>',
          ru: '<p>DNS (Domain Name System) переводит понятные человеку доменные имена в IP-адреса.</p>'
        },
        quiz: [
          {
            question: { en: 'What type of DNS record is used to map a domain to an IPv4 address?', ru: 'Какой тип DNS-записи используется для сопоставления домена с IPv4-адресом?' },
            options: { en: ['AAAA', 'CNAME', 'A', 'MX'], ru: ['AAAA', 'CNAME', 'A', 'MX'] },
            correctAnswer: 2
          }
        ]
      }
    ]
  },
  {
    id: 'html-css',
    title: { en: 'HTML & CSS', ru: 'HTML и CSS' },
    summary: {
      en: 'Semantic HTML and advanced CSS (Grid, Flexbox, Container Queries) are the building blocks of modern web.',
      ru: 'Семантический HTML и продвинутый CSS (Grid, Flexbox, Container Queries) — это основы современного веба.'
    },
    subtopics: [
      {
        id: 'semantic-html',
        parentId: 'html-css',
        title: { en: 'Semantic HTML', ru: 'Семантический HTML' },
        theory: { en: '<p>Use tags according to their meaning to improve SEO and Accessibility.</p>', ru: '<p>Используйте теги в соответствии с их значением для улучшения SEO и доступности.</p>' }
      },
      {
        id: 'advanced-css',
        parentId: 'html-css',
        title: { en: 'Advanced CSS', ru: 'Продвинутый CSS' },
        theory: { en: '<p>Grid, Flexbox, Custom Properties, and Container Queries.</p>', ru: '<p>Grid, Flexbox, Custom Properties и Container Queries.</p>' }
      }
    ]
  },
  {
    id: 'javascript',
    title: { en: 'JavaScript', ru: 'JavaScript' },
    summary: {
      en: 'Deep understanding of JS engine, Event Loop, and Asynchronous patterns is required for Seniors.',
      ru: 'Для Senior-уровня необходимо глубокое понимание движка JS, Event Loop и асинхронных паттернов.'
    },
    subtopics: [
      {
        id: 'js-engine',
        parentId: 'javascript',
        title: { en: 'JS Engine & Event Loop', ru: 'Движок JS и Event Loop' },
        theory: { en: '<p>Call Stack, Task Queue, Microtask Queue, and V8 optimization.</p>', ru: '<p>Call Stack, Task Queue, Microtask Queue и оптимизация V8.</p>' }
      }
    ]
  }
];

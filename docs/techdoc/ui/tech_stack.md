## Стек технологій

?> Усі стороні технології розповсюджуються за ліцензіями типу open source такими як [Apache](https://www.apache.org/licenses/LICENSE-2.0.html) та [MIT](https://mit-license.org/).

### Основа

AirZOOM UI - це *PWA* (*Progressive Web Application*), тобто застосунок написаний на мові програмування *JavaScript*, а саме аз допомогою *React* фреймворка [Next.js](https://nextjs.org/)

### Інтерфейс

За основу інтерфейсу була взята бібліотека веб компонентів [EUI](https://elastic.github.io/eui/#/), яка дозволяє зручно працювати з даними за допомогою таблиць та графіків.

### Отримання даних

Для спілкування з базою даних використовується [GraphQL](https://graphql.org/) та архітектурний проміжний серверний додаток [Hasura](https://hasura.io/). 

AirZOOM UI спілкується із сервером *Hasura* з допомогою [Appolo Client](https://www.apollographql.com/), який в свою чергу має доступ до бази даних [Postgres](https://www.postgresql.org/). 



## Прості налаштування

Практично всі налаштування можна зробити модифікацією індексного файлу у корені документації. Файл доволі маленький і зрозумілий. Нижче приведений його фрагмент, який налаштовано для нашого проєкту:

```html
<!-- ./docs/index.html -->

<head>
  <title>AirZOOM Doc</title>
  <link rel="icon" href="img/favicon.ico">
</head>
<script>
  window.$docsify = {
    name: 'AirZOOM Doc!',
    logo: '/img/logo.svg',
    relativePath: true,
    subMaxLevel: 2,
    loadSidebar: true,
    externalLinkTarget: '_blank'
  }
</script>
```

Отже, тут представлені такі налаштування:

- `<title>AirZOOM Doc</title>` - назва веб-сторінки, що з'являється на вкладці бравзера;
- `<link rel="icon" href="img/favicon.ico">` - шлях до фавікона відносно кореня документації, у нашому випадку це `./docs/img/favicon.ico`;
- `name: 'AirZOOM Doc!'` - ім'я сайту, що з'являється на бічній панелі;
- `logo: '/img/logo.svg'` - шлях до лого;
- `relativePath: true` - у кожному фолдері посилання на внутрішні ресурси можуть бути записані відносно цього фолдера;
- `subMaxLevel: 2` - дає можливість показувати заголовки зі сторінки на бічній панелі під заголовком відповідного файла до глибини 2;
- `loadSidebar: true` - дозволяє використання файлів опису вмісту бічної панелі `_sidebar.md` у кожному фолдері;
- `externalLinkTarget: '_blank'` - зовнішні посилання відкриватимуться у новій вкладці.

У індексному файлі з'являтимуться ще підключення і налаштування інших вбудованих функціональних можливостей і плагінів. Їх вже можна переглянути беспосередньо у [тексті індексного файлу на github репозитарії](https://github.com/protw/azreal/blob/main/docs/index.html) або прямо перебуваючи в бравзері переглянте код сторінки (в бравзері *Chrome* натисніть `Ctrl+U`).

## TODO list

Що хотілось би ще підключити:

- [x] [математичні формули типу katex](https://github.com/upupming/docsify-katex)
- [x] [пошук по сайту](https://docsify.js.org/#/plugins?id=full-text-search)
- [ ] додаткова навігація
  - [x] [previous/next](https://github.com/imyelo/docsify-pagination)
  - [x] [scroll to top](https://www.npmjs.com/package/docsify-scroll-to-top)
  - [ ] navigation bar
- [ ] дві або більше мов (з можливістю перемикатися на відповідну сторінку в іншою мовою)
- [x] [поширення сторінок](https://coroo.github.io/docsify-share/)
- [ ] коментарі типу Disqus

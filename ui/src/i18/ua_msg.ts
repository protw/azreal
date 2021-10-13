import { aggregationLimit } from 'src/components/utils'

export const uiMsg = {
  form: {
    aggType: 'Оберіть тип вибірки',
    fromDate: 'Початкова дата',
    endDate: 'Кінцева дата',
    sensorId: 'Id локації',
    email: 'Email',
    password: 'Пароль',
  },
  common: {
    add: 'Додати',
    edit: 'Редагувати',
    delete: 'Видалити'
  },
  theme: {
    light: 'Світла тема',
    dark: 'Темна тема',
  },
  auth: {
    error: {
      fogotOldPassword: 'Ви ввели неправильний старий пароль',
      common: 'Невірний логін або пароль',
      incorectPassword: 'Невірний пароль'
    },
    oldPassword: 'Старий пароль',
    newPassword: 'Новий пароль',
    changePassword: 'Зміна паролю',
    logIn: 'Вхід',
  },
  breadcrumbs: {
    'Profile': 'Мій аккаунт',
    'Users': 'Користувачі',
    'Edit': 'Редагування',
    'New': 'Створення',
    'Organisations': 'Організації',
    'Service': 'Сервісний журнал',
    'Measurements': 'Вимірювання',
    'Factors': 'Фактори забруднення',
    'Sensors': 'Датчики'
  },
  sensors: {
    info: {
      title: 'Список датчиків',
      desc: 'Карта та таблиця встановлених датчиків'
    },
    path: '/sensors'
  },
  measurements: {
    title: 'Вибірка даних',
    desc: `Щоб отримати дані, потрібно обрати рівень агрегації, початкову та кінцеву дату та ід локації, по якій здійснити пошук. Зверніть увагу, що максимум можна отримати ${aggregationLimit} одиниць даних.`,
    info: {
      title: 'Вимірювання',
      desc: 'Отримайте дані за датчиком у певному проміжку часу'
    },
    path: '/measurements',
    chart: {
      type: {
        linear: 'Лінійний масштаб',
        log: 'Логарифмічний масштаб'
      }
    },
    aggregation: {
      hour: 'Година',
      day: 'День',
      week: 'Тиждень',
      month: 'Місяць',
      year: 'Рік'
    },
    limit: {
      title: 'Ліміт агрегації перевищено',
      desc: `Ви отримали лише ${aggregationLimit} перших вимірів. Щоб отримати більше даних підвищіть рівень агрегації.`
    }
  },
  serviceLog: {
    desc: 'Щоб отримати дані, потрібно обрати початкову та кінцеву дату та ід датчика, по якій здійснити пошук',
    info: {
      title: 'Журнал обслуговування',
      desc: 'Коли? Де? Хто?'
    },
    path: '/service'
  },
  docs: {
    info: {
      title: 'Документація',
      desc: 'Відповіді на питання і не тільки'
    },
    path: '/docs//'
  },
  factors: {
    columns: {
      label: 'Назва фактору',
      unit: 'Одиниці',
      maxValue: 'ГДК',
      amount: 'Кількість датчиків'
    }
  },
  loader: {
    file: 'Виберіть або перетягніть файл',
    photo: 'Виберіть або перетягніть фото',
  }
}
export default uiMsg
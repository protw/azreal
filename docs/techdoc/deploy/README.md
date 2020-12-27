# Рекомендації по розгортанню програмного забезпечення

## Передумови

**Примітка:** розробка та тестування програмного забезпечення проводилась на дистрибутиві *Ubuntu 20.04 LTS*.+

Для розгортання проєкту необхідно дотриматись наступних вимог щодо стороннього програмного та системного забезпечення. Тобто, наступний перелік програм та сервісів із вказаними конкретними (`==`, `>=`) або сумісними (`~=`) версіями повинен бути встановлений.

 - [PostgreSQL](https://www.postgresql.org/) == v12.4
 - [Python](https://www.python.org/) v3.8 та бібліотека `python3-dev`
 - [PIP](https://pypi.org/project/pip/) ~= v20.3.1
 - [Node](https://nodejs.org/uk/) >= v12 LTS
 - [Yarn](https://yarnpkg.com/) >= 1.22
 - [PM2](https://pm2.io/) ~= v4.5.0
 - [Docker](https://www.docker.com/)
 - [Docker-compose](https://docs.docker.com/compose/)

## Caddy server

Для правильної роботи веб інтерфейсу, потрібно налаштувати Firewall для відкритого зʼєднання по протоколу *HTTP*.

В цілях безпеки, рекомендовано використовувати *HTTPS* та виділений домен.

## PostgreSQL

- Рекомендовано змінити пароль користувача `postgres` та ввімкнути авторизацію *MD5* для всіх користувачів.
- Для роботи Hasura необхідно додатково створити користувача `hasurauser`.
- Наповнення бази даних таблицями відбувається методом почергового виклику запитів із файлів: `az_docs.sql`, `az_users.sql`, `az_sensors.sql`, `az_measurements.sql`, `configure_hasura_user.sql`.

## Запуск програмного забезпечення

 - Склонувати репозиторій в бажане місце на диску:

```sh
git clone https://github.com/protw/azreal.git
```

- Перейти в `postgresql` всередині директорії склонованого проєкту

```sh
cd azreal/postgresql
```

- Почергово (як це вказано в розділі **PostgreSQL**) виконати команду  #2 для кожного `.sql` файлу:

	1. `sudo su - postgres` - це авторизує вас від імені користувача системи, що привʼязаний до PostgreSQL.
	2. `psql -U <user> -d <database> -f <filename>.sql`
		Де `<user>` - імʼя користувача, `<database>` - назва бази даних та `<filename>.sql` - назва файлу, що буде виконаний.
  3. `exit` - це дозволить перейти до попереднього користувача в системі.

- Перейти в `deploy` всередині директорії склонованого проєкту. На цьому етапі:

```sh
cd ../deploy
```

- В директорії є файл змінних середовища `example.env`. Необхідно зробити копію з назвою `.env` та наповнити коректними значеннями. Наприклад:

```
HTTP_GATEWAY=azreal.io
CORS_ALLOWED_ORIGIN=https://azreal.io

HASURA_GRAPHQL_DATABASE_URL=postgres://hasurauser:userpassword@localhost:6543/airzoom
HASURA_GRAPHQL_ADMIN_SECRET=Secr3t-phr%se

AIRLY_API_KEY=2yKEEySSHPwSkZu3mURUD7yWKsD2Gqa6

GRAPHQL_ENDPOINT=https://azreal.io/hasura/v1/graphql
MONGO_API_ENDPOINT=https://azreal.io/mongo_api
AUTH_API_ENDPOINT=https://azreal.io/auth

AGGREGATION_LIMIT=100

PG_DATABASE=airzoom
PG_USER=postgres
PG_PASSWORD=SuperStrongAdminPassword
PG_HOST=localhost
PG_PORT=6543

MONGO_HOSTNAME_URI=mongodb://azrealadmin:Str0ngUs3rP%ssword@localhost:27017/airzoomdb

MONGO_DATABASE=airzoomdb
MONGO_USERNAME=azrealadmin
MONGO_PASSWORD=Str0ngUs3rP%ssword

AUTH_API_PORT=5000
MONGO_API_PORT=5001
DOCSIFY_PORT=3001
```

**Примітка:** для правильної роботи `AIRLY_API_KEY` повинен мати дозволену к-ть запитів з розрахунку не менше ніж 48 на 1 датчик за умови, що інтервал роботи Airly fetcher - раз у 30 хв.

- Після наповнення файлу зі змінними середовища, запустити скрипт:

```sh
./deploy.sh
```

- Якщо всі кроки виконано коректно, в командному рядку повинен бути приблизно такий результат:

```sh
PM2 processes status:
┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name             │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 2   │ airly-fetcher    │ default     │ N/A     │ fork    │ 31857    │ 0s     │ 3    │ stopped   │ 100%     │ 17.1mb   │ xxxxxxx  │ disabled │
│ 1   │ auth-api         │ default     │ N/A     │ fork    │ 31739    │ 1s     │ 0    │ online    │ 0%       │ 28.3mb   │ xxxxxxx  │ disabled │
│ 0   │ mongo-api        │ default     │ N/A     │ fork    │ 31701    │ 1s     │ 0    │ online    │ 0%       │ 34.7mb   │ xxxxxxx  │ disabled │
│ 3   │ web-ui           │ default     │ N/A     │ fork    │ 31864    │ 0s     │ 1    │ online    │ 100%     │ 24.8mb   │ xxxxxxx  │ disabled │
└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
Docker containers status:
CONTAINER ID        IMAGE                          COMMAND                  CREATED             STATUS           PORTS           NAMES
xxxxxxxxxxxx        caddy/caddy                    "caddy run --config …"   * seconds ago       Up 8 seconds                     caddy-server
xxxxxxxxxxxx        hasura/graphql-engine:v1.3.3   "graphql-engine serve"   * seconds ago       Up 8 seconds                     azreal-hasura

```

**Примітка:** Docker контейнери налаштовані таким чином, що після перезавантаження системи вони продовжать працювати належним чином. Проте, для коректної роботи PM2 в такій ситуації після завершення попередніх інструкцій потрібно виконати `pm2 startup` та слідувати інструкціям команди.

## Hasura

Після запуску програмного забезпечення, необхідно перейти в консоль управління Hasura та імпортувати метадані Hasura GraphQL.

- В адресному рядку, до ваших адреси чи домену додаємо `/hasura/console`. *Наприклад:* `https://azreal.io/hasura/console`.
- У вікні, що зʼявилося, ввдимо ваш `HASURA_GRAPHQL_ADMIN_SECRET`

![Hasura Console authentication](img/hasura-auth.png)

- Далі, натискаємо на піктограму шестерні по правий край "шапки" сайту.
- У тілі сторінки, що зʼявилася, знаходимо кнопку "Import metadata" та натискаємо її.

![Hasura console settings](img/hasura-settings.png)

- Обираємо файл [hasura_metadata.json](../../../postgresql/hasura_metadata.json), що знаходиться в директорії `postgresql` проєкту.

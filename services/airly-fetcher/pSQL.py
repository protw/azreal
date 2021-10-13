import psycopg2

from config import PG_USER, PG_PORT, PG_HOST, PG_DATABASE, PG_PASSWORD

try:
    connection = psycopg2.connect(dbname=PG_DATABASE, user=PG_USER, password=PG_PASSWORD, host=PG_HOST, port=PG_PORT)
    connection.autocommit = True
    print(f"Connected to {PG_DATABASE}@{PG_HOST}:{PG_PORT} with {PG_USER}")
except (Exception, psycopg2.Error) as conn_err:
    print("Error while connecting to PostgreSQL:", conn_err)


def query_db(query: str):
    data = []
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)

            if 'SELECT' in query:
                data = cursor.fetchall()

            cursor.close()
    except (Exception, psycopg2.Error) as error:
        print("Error on PostgreSQL query: ", error)

    return data

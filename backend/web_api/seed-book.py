import sqlite3
import json

databaseName = "db.sqlite3"

try:
    data = []
    with open('book_catalog.json', 'r') as file:
        data = json.load(file)

    table_name = "appmodule_book"
    query = r"insert into {} (slug, name, 'index') values ".format(table_name)

    for book in data:
        if book != data[-1]:
            query += r"('{0}', '{1}', {2}),".format(book['slug'], book['name'], book['num'])
        else:
            query += r"('{0}', '{1}', {2})".format(book['slug'], book['name'], book['num'])

    sqliteConnection = sqlite3.connect(databaseName)
    print("Successfully Connected to SQLite: " + databaseName)
    cursor = sqliteConnection.cursor()

    select_query = "select * from {}".format(table_name)
    cursor.execute(select_query)
    rows = cursor.fetchall()
    if len(rows) == 0:
        cursor.execute(query)
        sqliteConnection.commit()
        print("{} rows inserted!".format(cursor.rowcount))
    else:
        print("Data has already existed!")
    cursor.close()

except sqlite3.Error as error:
    print(error)
finally:
    if (sqliteConnection):
        sqliteConnection.close()
        print("The SQLite connection is closed")
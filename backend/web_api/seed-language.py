import sqlite3
import json

databaseName = "db.sqlite3"

try:
    content = ""
    with open('langnames.json', 'r') as textFile:
        rawContent = textFile.read()
        content = rawContent.replace(r"'", r"''") # replace single quote to double single quote

    data = json.loads(content)

    table_name = "appmodule_language"
    query = r"insert into {} (slug, original_name, anglicized_name) values ".format(table_name)

    for language in data:
        if language != data[-1]:
            query += r"('{0}', '{1}', '{2}'),".format(language['lc'], language['ln'], language['ang'])
        else:
            query += r"('{0}', '{1}', '{2}')".format(language['lc'], language['ln'], language['ang'])


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
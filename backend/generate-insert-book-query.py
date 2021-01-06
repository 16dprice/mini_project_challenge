import json

print("\n")

data = ""
with open('book_catalog.json', 'r') as file:
    data = json.load(file)

table_name = "appmodule_book"
query = r"insert into {} (slug, name, 'index') values ".format(table_name)

for book in data:
    if book != data[-1]:
        query += r"('{0}', '{1}', {2}),".format(book['slug'], book['name'], book['num'])
    else:
        query += r"('{0}', '{1}', {2})".format(book['slug'], book['name'], book['num'])


queryFile = open('insert-book.txt', 'w', encoding="utf-8")
queryFile.write(query)
queryFile.close()
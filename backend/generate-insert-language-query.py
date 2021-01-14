import json

print("\n")

rawContent = ""
with open('langnames.json', 'r') as textFile:
    rawContent = textFile.read()

with open('langnames.json', 'w') as rawFile:
    formattedQuery = rawContent.replace(r"'", r"''") # replace single quote to double single quote
    rawFile.write(formattedQuery)

data = ""
with open('langnames.json', 'r') as file:
    data = json.load(file)

table_name = "appmodule_language"
query = r"insert into {} (slug, original_name, anglicized_name) values ".format(table_name)

for language in data:
    print(language['ln'])
    if language != data[-1]:
        query += r"('{0}', '{1}', '{2}'),".format(language['lc'], language['ln'], language['ang'])
    else:
        query += r"('{0}', '{1}', '{2}')".format(language['lc'], language['ln'], language['ang'])

queryFile = open('insert-language.txt', 'w', encoding="utf-8")
queryFile.write(query)
queryFile.close()
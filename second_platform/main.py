from flask import Flask, render_template, request
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'grocery-informants.cpgputsuo8r5.us-east-2.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = '69uTaQVVYLvKCLdTEdSb'
app.config['MYSQL_DB'] = 'groceryinformants'
mysql = MySQL(app)


@app.route('/user_data')
def user_data():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM Users ''')
    data = cursor.fetchall()
    cursor.close()
    stats = {}
    total = len(data)
    signed = 0
    for tup in data:
        if tup[1] is not None:
            signed += 1
    stats['percent_signed_in'] = str((signed / total) * 100) + "%"
    stats['total'] = total
    return stats


@app.route('/item_data')
def item_data():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM Items ''')
    data = cursor.fetchall()
    cursor.close()
    stats = {}
    total = len(data)
    items = {}
    stores = {'Kroger' : 0, 'Target' : 0}
    for tup in data:
        if tup[1] not in items:
            items[tup[1]] = 1
        else:
            items[tup[1]] += 1
        stores[tup[3]] += 1
    top_five = sorted(items, key=items.get, reverse=True)[:5]
    top_five_items = {}
    for key in top_five:
        top_five_items[key] = items[key]
    stats["top_five_items"] = top_five_items
    stats["stores"] = stores
    stats["total"] = total
    return stats


@app.route('/search_data')
def search_data():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM Searches ''')
    data = cursor.fetchall()
    cursor.close()
    stats = {}
    total = len(data)
    searches = {}
    for tup in data:
        if tup[2] not in searches:
            searches[tup[2]] = 1
        else:
            searches[tup[2]] += 1
    top_five = sorted(searches, key=searches.get, reverse=True)[:5]
    top_five_searches = {}
    for key in top_five:
        top_five_searches[key] = searches[key]
    stats["top_five_searches"] = top_five_searches
    stats["total"] = total
    return stats

@app.route('/all_data')
def all_data():
    stats = user_data() | item_data() | search_data()
    return stats


app.run(host='localhost', port=8000)
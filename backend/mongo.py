import pymongo
from datetime import datetime

def db():
    myclient = pymongo.MongoClient("mongodb+srv://activistarmor:JQKlJyZg0UDNcl6s@cluster0-mgi12.mongodb.net/content?retryWrites=true&w=majority")
    mydb = myclient["content"]
    c = mydb["aa"]
    return c

def map():
    x  = []
    cur = db().find({}, {'_id': False}).sort([('date', pymongo.ASCENDING)])
    for i in cur:
        x.append(i)
    return x

def upload(url, loc):
    now = datetime.now()
    date = now.strftime("%d/%m/%Y %H:%M:%S")
    mydict = {"url": url, "location": loc, "date": date}
    x = db().insert_one(mydict)
    print('added to database')

def feed():
    x  = []
    cur = db().find({}, {'_id': False}).sort([('date', pymongo.ASCENDING)])
    for i in cur:
        x.append(i)
    return x
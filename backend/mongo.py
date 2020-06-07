import pymongo
from datetime import datetime

myclient = pymongo.MongoClient("mongodb+srv://activistarmor:JQKlJyZg0UDNcl6s@cluster0-mgi12.mongodb.net/content?retryWrites=true&w=majority")
mydb = myclient["aa"]

def map():
    pass

def upload(url, loc):
    now = datetime.now()
    date = now.strftime("%d/%m/%Y %H:%M:%S")
    mydict = {"url": url, "location": loc, "date": date}
    x = mydb.insert_one(mydict)

def feed():
    mydb.find().sort([('date', pymongo.ASCENDING)])
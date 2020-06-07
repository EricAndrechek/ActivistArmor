import praw
import pandas as pd
import contentcleaner

secrets = open("redditkey.txt", "r")

client_id = secrets.readline().strip()
client_secret = secrets.readline().strip()
password = secrets.readline().strip()
secrets.close()

reddit = praw.Reddit(
    client_id=client_id,
    client_secret=client_secret,
    password=password, 
    user_agent='ActivistArmor python scraper', 
    username='ActivistArmor'
)

sub = reddit.subreddit('Bad_Cop_No_Donut')
for submission in sub.stream.submissions():
    file = contentcleaner.Check(submission)
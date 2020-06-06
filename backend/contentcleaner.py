import mimetypes
from urllib.request import urlopen
import subprocess
import requests
from bs4 import BeautifulSoup
import os
import re
from pytube import YouTube


class Check():
    def __init__(self, post):
        self.permalink = "https://reddit.com{}".format(post.permalink)
        self.url = post.url
        if self.valid_site():
            print()
            if 'v.redd.it' in self.url:
                self.reddit_download()
            elif 'youtube' in self.url:
                filen = self.url.split('v=')[1]
                if '&' in filen:
                    filen = filen.split('&')[0]
                self.youtube_download(filen)
            elif 'youtu.be' in self.url:
                self.youtube_download(self.url.rsplit('/', 1)[1])
            elif self.is_downloadable():
                self.download(self.url.rsplit('/', 1)[1])
            else:
                self.wildcard_download()
    
    def wildcard_download(self):
        soup = BeautifulSoup(requests.get(self.url).text, features="lxml")
        for link in soup.find_all('img'):
            self.url = link.get('src')
            if self.valid_site():
                if self.is_downloadable():
                    fname = self.url.rsplit('/', 1)[1]
                    if '?' in fname:
                        fname = fname.split('?')[0]
                    self.download(fname)
    
    def youtube_download(self, filename):
        print('Downloading {}...'.format(self.url))
        yt = YouTube(self.url).streams.first().download(output_path=os.path.join(os.getcwd(), 'content'), filename=filename)
        print('Saved to {}.mp4'.format(filename))

    def reddit_download(self):
        site_url = "https://reddit.tube/parse"
        response = requests.get(site_url, params={
            'url': self.permalink   
        })
        self.url = response.json()['share_url']
        self.download()
    
    def is_downloadable(self):
        h = requests.head(self.url, allow_redirects=True)
        header = h.headers
        content_type = header.get('content-type')
        if content_type:
            if 'text' in content_type.lower():
                return False
            if 'html' in content_type.lower():
                return False
        return True
    
    def download(self, filename=None):
        print("Downloading {}...".format(self.url))
        r = requests.get(self.url)
        try:
            ct = r.headers['content-type'].split('/')[1]
            if filename is None:
                fn = self.url.rsplit('/', 1)[1] + '.' + ct
            else:
                fn = filename
            open(os.path.join(os.path.join(os.getcwd(), 'content'), fn), 'wb+').write(r.content)
            print('Saved to {}'.format(fn))
    
    def valid_site(self):
        try:
            return requests.head(self.url).status_code
        except:
            return False

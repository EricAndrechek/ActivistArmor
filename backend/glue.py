import subprocess
import facefinder
from violence import handleViolence
import digitalocean
import os
import metadata

# glue.py is the glue that holds all the code together

def uf(fn, location, media):
    lat, lon = metadata.coords(fn)
    metadata.wipe(fn)
    if lat is not None and lon is not None:
        lf(fn, (lat, lon), media)
    else:
        lf(fn, file)

def lf(fn, loc=None, media):
    # LocalFile, takes filename to local file, location
    # that has been download from flask server or scraper
    # and checks if it has faces before continuing
    ft = filetype(fn)
    if ft == 1:
        if facefinder.image_face(fn):
            if 'video' in media.content_type:
                if handleViolenceVideo(media, fn):
                    # blur faces that aren't cops
                    url = digitalocean.Storage().upload(fn)
                    # add url and loc to mongoDB
                else:
                    remove(fn)
            elif 'image' in media.content_type:
                content = media.read()
                if handleViolenceImage(content, fn):
                    # blur faces that aren't cops
                    url = digitalocean.Storage().upload(fn)
                    # add url and loc to mongoDB
                else:
                    remove(fn)
            else:
                remove(fn)
        else:
            remove(fn)
    elif ft == 2:
        if facefinder.video_face(fn):
            if handleViolence(fn):
                # blur faces that aren't cops
                url = digitalocean.Storage().upload(fn)
                # and url and loc to mongoDB
            else:
                remove(fn)
        else:
            remove(fn)
    else:
        remove(fn)

def filetype(filename):
    s = subprocess.Popen(['file', '--mime-type', '-b', 'content/{}'.format(filename)], stdout=subprocess.PIPE)
    mime = s.stdout.read().strip().decode("utf-8").split('/')[0]
    if mime == 'video':
        return 0
    elif mime == 'image':
        return 1
    else:
        return None

def remove(filename):
    os.remove('content/{}'.format(filename))
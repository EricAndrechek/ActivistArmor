import subprocess
import facefinder
from violence import handleViolence

# glue.py is the glue that holds all the code together

def lf(fn):
    # LocalFile, takes filename to local file
    # that has been download from flask server or scraper
    # and checks if it has faces before continuing
    ft = filetype(fn)
    if ft == 1:
        if facefinder.image_face(fn):
            handleViolence(media, fn)

def filetype(filename):
    s = subprocess.Popen(['file', '--mime-type', '-b', 'content/{}'.format(filename)], stdout=subprocess.PIPE)
    mime = s.stdout.read().strip().decode("utf-8").split('/')[0]
    if mime == 'video':
        return 0
    elif mime == 'image':
        return 1
    else:
        return None
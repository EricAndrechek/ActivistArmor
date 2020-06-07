import subprocess
import facefinder
import violence
import digitalocean
import os
import metadata
import blur
import mongo

# glue.py is the glue that holds all the code together


def lf(fn, loc=None):
    if loc is None:
        lat, lon = metadata.coords(fn)
        if lat is not None and lon is not None:
            loc = (lat, lon)
    metadata.wipe(fn)

    ft = filetype(fn)
    print(ft)
    if ft == 1:
        print('checking photo')
        if facefinder.image_face(os.path.join(os.path.join(os.getcwd(), 'content'), fn)):
            print('checking violence')
            if violence.handleViolenceImage(os.path.join(os.path.join(os.getcwd(), 'content'), fn)):
                print('violence')
                blur.blur_faces(fn, loc)
            else:
                print('no violence')
                remove(fn)
        else:
            print('no faces found')
            remove(fn)
    elif ft == 0:
        print('checking video')
        if facefinder.video_face(os.path.join(os.path.join(os.getcwd(), 'content'), fn)):
            print('checking violence')
            print('violence')
            url = digitalocean.Storage().upload(fn, loc)
        else:
            print('no face')
            remove(fn)
    else:
        print('why did you run here wtf')
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
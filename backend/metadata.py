import subprocess
import json

def coords(filename):
    """Returns either lat, long or None, None"""
    s = subprocess.Popen(['exiftool', '-G', '-j', 'content/{}'.format(filename)], stdout=subprocess.PIPE)
    s = s.stdout.read().strip()
    s.decode('utf-8').rstrip('\r\n')
    md = json.loads(s)
    lat = None
    long = None
    for key in md[0]:
        if 'latitude' in key.lower():
            lat = md[0][key]
        if 'longitude' in key.lower():
            long = md[0][key]
    if lat is not None and long is not None:
        return msdd(lat), msdd(long)
    else:
        return None, None

def msdd(coord):
    deg = float(coord.split('deg')[0].split()[0])
    min = float(coord.split('deg')[1].split('\'')[0].split()[0])
    sec = float(coord.split('deg')[1].split('\'')[1].split('\"')[0].split()[0])
    dir = str(coord.split('deg')[1].split('\'')[1].split('\"')[1].split()[0])
    dd = deg + (min/60) + (sec/3600)
    return dd, dir

def wipe(filename):
    s = subprocess.Popen(['exiftool', '-all=', 'content/{}'.format(filename), '-overwrite_original'], stdout=subprocess.PIPE)
    s = s.stdout.read().strip()
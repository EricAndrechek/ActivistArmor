import numpy as np
import cv2
from mtcnn import MTCNN
import digitalocean
import os
model = MTCNN()
def blur_faces(fn, loc):
	filename = os.path.join(os.path.join(os.getcwd(), 'content'), fn)
	img = cv2.imread(filename)
	faces = model.detect_faces(img)
	for face in faces:
		bbox = face['box']
		img[bbox[1]:(bbox[1]+bbox[3]), bbox[0]:(bbox[0]+bbox[2])] = cv2.blur(
				img[bbox[1]:bbox[1]+bbox[3], bbox[0]:bbox[0]+bbox[2]],
				(50,50))
	cv2.imwrite(filename, img)
	url = digitalocean.Storage().upload(fn, loc)
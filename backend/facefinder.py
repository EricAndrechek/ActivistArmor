import cv2

def face_present(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor=1.3,
            minNeighbors=3,
            minSize=(30, 30)
    )
    if len(faces) > 0:
        return True
    return False

def image_face(filename):
    image = cv2.imread(filename)
    return face_present(image)

def video_face(filename):
    cap = cv2.VideoCapture(filename)
    fps = cap.get(cv2.CAP_PROP_FPS) 
    frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    duration = frame_count / fps
    time = 0
    cap.set(cv2.CAP_PROP_POS_MSEC, time * 1000)
    success, image = cap.read()
    while success and time <= duration:
        time += 1
        cap.set(cv2.CAP_PROP_POS_MSEC, time * 1000)
        success, image = cap.read()
        try:
            if face_present(image):
                return True
        except cv2.error:
            continue
    return False

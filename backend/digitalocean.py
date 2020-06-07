import os
import boto3
from boto3.s3.transfer import S3Transfer
import subprocess

class Storage():
    def __init__(self):
        secrets = open("do_credits.txt", "r")

        client_id = secrets.readline().strip()
        client_secret = secrets.readline()
        secrets.close()

        self.client = boto3.client('s3',
                        region_name='nyc3',
                        endpoint_url='https://nyc3.digitaloceanspaces.com',
                        aws_access_key_id=client_id,
                        aws_secret_access_key=client_secret)

    def upload(self, filename):
        s = subprocess.Popen(['file', '--mime-type', '-b', 'content/{}'.format(filename)], stdout=subprocess.PIPE)
        mime = s.stdout.read().strip().decode("utf-8")

        self.client.upload_file('content/{}'.format(filename), 'activist-armor', filename, ExtraArgs={
            "ContentType": mime,
            "ContentDisposition": 'inline',
            "ACL": 'public-read'
        })

        return "https://activist-armor.nyc3.cdn.digitaloceanspaces.com/{}".format(filename)

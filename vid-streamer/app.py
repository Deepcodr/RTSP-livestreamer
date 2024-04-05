from flask import Flask, Response
from flask_cors import CORS
import subprocess

app = Flask(__name__)
# cors = CORS(app, resources={r"*": {"origins": "*"}})
CORS(app)

rtsp_url = 'rtsp://zephyr.rtsp.stream/movie?streamKey=0637667e70048d01b722ec440c890884'

def initialize():
    
    print("Flask server has started!")

if __name__ == '__main__':
    # initialize()
    cmd = [
        'ffmpeg',
        '-i', rtsp_url,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-f', 'hls',
        '-hls_time', '4',
        '-hls_list_size', '10',
        '-max_muxing_queue_size' ,'1024',
        # '-hls_wrap', '10',
        # '-hls_flags','delete_segments',
        '-start_number','1',
        'public/stream.m3u8'
    ]

    subprocess.Popen(cmd)
    app.run(debug=False)

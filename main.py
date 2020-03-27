import os

from flask import Flask, send_from_directory
app = Flask(__name__, static_folder='static')


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico')


@app.route('/bundle.js')
def bundle():
    return app.send_static_file('./bundle.js')


@app.route('/')
def root():
    return app.send_static_file('./index.html')


if __name__ == '__main__':
    app.run()
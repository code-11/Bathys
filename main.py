import os
from flask import jsonify
from flask import Flask, send_from_directory
app = Flask(__name__, static_folder='static')

board_x_size = 10
board_y_size = 10
board = {}
for x in range(board_x_size):
    for y in range(board_y_size):
        board[(x, y)] = 0

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico')

@app.route("/board")
def board_func():
    jsoned_board = {}
    for key, val in board.items():
        x, y = key
        new_key = str(x)+","+str(y)
        jsoned_board[new_key] = val
    return jsonify(jsoned_board)

@app.route('/bundle.js')
def bundle():
    return app.send_static_file('./bundle.js')


@app.route('/')
def root():
    return app.send_static_file('./index.html')


if __name__ == '__main__':
    app.run()
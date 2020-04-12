import os
import json
from tile import Tile
from bathysEncoder import BathysEncoder
from sub import Sub
from flask import jsonify, request
from flask import Flask, send_from_directory
app = Flask(__name__, static_folder='static')
app.json_encoder = BathysEncoder

board_x_size = 25
board_y_size = 10

sub = Sub((0, board_y_size-1))
# sub_loc = (0, board_y_size-1)

board = {}
for x in range(board_x_size):
    for y in range(board_y_size):
        board[(x, y)] = Tile()


def moveSubDown():
    global sub
    x, y = sub.loc
    if y < board_y_size-1:
        y += 1
    sub.loc = (x, y)


def moveSubUp():
    global sub
    x, y = sub.loc
    if y > 0:
        y -= 1
    sub.loc = (x, y)


def moveSubLeft():
    global sub
    x, y = sub.loc
    if x > 0:
        x -= 1
    sub.loc = (x, y)


def moveSubRight():
    global sub
    x, y = sub.loc
    if x<board_x_size-1:
        x += 1
    sub.loc = (x, y)


@app.route("/moveSub", methods=['GET','POST'])
def moveSub():
    move_map = {"DOWN": moveSubDown, "UP": moveSubUp,  "LEFT": moveSubLeft, "RIGHT": moveSubRight}
    content = request.json
    direction = content["direction"]
    move_map[direction]()
    x, y = sub.loc
    return jsonify({"x": x, "y": y})


@app.route("/getSubLoc")
def getSubLoc():
    global sub
    x, y = sub.loc
    return jsonify({"x": x, "y": y})


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico')


@app.route("/board")
def board_func():
    jsoned_board = {}
    for key, val in board.items():
        x, y = key
        new_key = str(x)+","+str(y)
        new_val = val
        jsoned_board[new_key] = new_val
    return jsonify(jsoned_board)


@app.route('/bundle.js')
def bundle():
    return app.send_static_file('./bundle.js')


@app.route('/index.css')
def style():
    return app.send_static_file('./index.css')


@app.route('/')
def root():
    return app.send_static_file('./index.html')


if __name__ == '__main__':
    app.run()
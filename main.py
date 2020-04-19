import os
import json
import random
from tile import *
from position import *
from bathysEncoder import BathysEncoder
from sub import Sub
from flask import jsonify, request
from flask import Flask, send_from_directory
app = Flask(__name__, static_folder='static')
app.json_encoder = BathysEncoder

random.seed("bathys")

board_x_size = 25
board_y_size = 10

sub = Sub((0, board_y_size-1))
# sub_loc = (0, board_y_size-1)

board = {}


def gen_positions():
    navigator = Position()
    navigator.uniq = "navigator"
    navigator.name = "Navigator"

    operator = Position()
    operator.uniq = "operator"
    operator.name = "Sonar Operator"
    return [navigator, operator]


positions = gen_positions()
position_to_player = {}
for position in positions:
    position_to_player[position.uniq] = None


def gen_board():
    global board
    # class types of the tiles
    tile_choices = [OpenTile, CoralTile]
    for x in range(board_x_size):
        for y in range(board_y_size):
            # Choose a tile type and instantiate
            board[(x, y)] = random.choice(tile_choices)()


gen_board()

board[sub.loc].explored = True


def reveal_tile(x, y):
    board[(x, y)].explored = True


def common_move_eval(x, y):
    new_loc = (x, y)
    reveal_tile(x, y)
    sub.loc = new_loc


def moveSubDown():
    global sub
    x, y = sub.loc
    if y < board_y_size-1:
        y += 1
    common_move_eval(x, y)


def moveSubUp():
    global sub
    x, y = sub.loc
    if y > 0:
        y -= 1
    common_move_eval(x, y)


def moveSubLeft():
    global sub
    x, y = sub.loc
    if x > 0:
        x -= 1
    common_move_eval(x, y)


def moveSubRight():
    global sub
    x, y = sub.loc
    if x < board_x_size-1:
        x += 1
    common_move_eval(x, y)

@app.route("/requestPosition",methods=['GET','POST'])
def requestPosition():
    content = request.json
    player_id = content["playerId"]
    position_uniq = content["positionUniq"]
    if position_to_player[position_uniq] is None:
        position_to_player[position_uniq] = player_id
        print("Assigning "+player_id+" to "+position_uniq)
        return jsonify(True)
    else:
        return jsonify(False)


@app.route("/moveSub", methods=['GET','POST'])
def moveSub():
    move_map = {"DOWN": moveSubDown, "UP": moveSubUp,  "LEFT": moveSubLeft, "RIGHT": moveSubRight}
    content = request.json
    direction = content["direction"]
    move_map[direction]()
    x, y = sub.loc
    return jsonify({"x": x, "y": y, 'new_tile': board[(x, y)]})


@app.route("/getSubLoc")
def getSubLoc():
    global sub
    x, y = sub.loc
    return jsonify({"x": x, "y": y})


@app.route("/getPositions")
def getPositions():
    global positions
    return jsonify(positions)


@app.route("/getPositionMapping")
def getPositionMapping():
    global position_to_player
    return jsonify(position_to_player)


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
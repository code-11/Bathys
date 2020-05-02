import os
import json
import random
from tile import *
from position import *
from bathysEncoder import BathysEncoder
from sub import Sub
from quart import jsonify, request
from quart import Quart, send_from_directory
from asyncio import Event

app = Quart(__name__, static_folder='static')
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


players=[]

positions = gen_positions()
position_to_player = {}
for position in positions:
    position_to_player[position.uniq] = None


def gen_board():
    global board
    # class types of the tiles
    tile_choices = [OpenTile, CoralTile, RockTile]
    for x in range(board_x_size):
        for y in range(board_y_size):
            # Choose a tile type and instantiate
            board[(x, y)] = random.choice(tile_choices)()


gen_board()

board[sub.loc].explored = True

request_position_events = {}

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


@app.route("/registerPlayer",methods=['GET','POST'])
async def registerPlayer():
    content = await request.json
    player_id = content["playerId"]
    players.append(player_id)
    request_position_events[player_id] = Event()
    return jsonify(True)


@app.route("/requestPosition",methods=['GET','POST'])
async def requestPosition():
    content = await request.json
    player_id = content["playerId"]
    position_uniq = content["positionUniq"]
    if position_to_player[position_uniq] is None:
        position_to_player[position_uniq] = player_id
        print("Assigning "+player_id+" to "+position_uniq)
        for other_player_id in players:
            if other_player_id != player_id:
                request_position_events[other_player_id].set()
                request_position_events[other_player_id].clear()
        return jsonify(True)
    else:
        return jsonify(False)


@app.route("/moveSub", methods=['GET','POST'])
async def moveSub():
    move_map = {"DOWN": moveSubDown, "UP": moveSubUp,  "LEFT": moveSubLeft, "RIGHT": moveSubRight}
    content = await request.json
    direction = content["direction"]
    move_map[direction]()
    x, y = sub.loc
    return jsonify({"x": x, "y": y, 'new_tile': board[(x, y)]})


@app.route("/getSubLoc")
async def getSubLoc():
    global sub
    x, y = sub.loc
    return jsonify({"x": x, "y": y})


@app.route("/getPositions")
async def getPositions():
    global positions
    return jsonify(positions)


@app.route("/getPositionMappingLong",methods=['GET','POST'])
async def getPositionMappingLong():
    global position_to_player
    global request_position_events
    content = await request.json
    player_id = content["playerId"]
    await request_position_events[player_id].wait()
    return jsonify(position_to_player)


@app.route("/getPositionMapping")
async def getPositionMapping():
    global position_to_player
    return jsonify(position_to_player)


@app.route("/favicon.ico")
async def favicon():
    return await send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico')


@app.route("/board")
async def board_func():
    jsoned_board = {}
    for key, val in board.items():
        x, y = key
        new_key = str(x)+","+str(y)
        new_val = val
        jsoned_board[new_key] = new_val
    return jsonify(jsoned_board)


@app.route('/bundle.js')
async def bundle():
    return await app.send_static_file('./bundle.js')


@app.route('/index.css')
async def style():
    return await app.send_static_file('./index.css')


@app.route('/')
async def root():
     return await app.send_static_file('./index.html')


if __name__ == '__main__':
    app.run(host='localhost', port=5000)

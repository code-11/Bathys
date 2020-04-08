import os
from flask import jsonify, request
from flask import Flask, send_from_directory
app = Flask(__name__, static_folder='static')

board_x_size = 25
board_y_size = 10

sub_loc = (0,board_y_size)

board = {}
for x in range(board_x_size):
    for y in range(board_y_size):
        board[(x, y)] = 0

def moveSubDown():
    global sub_loc
    x,y = sub_loc
    y -= 1
    sub_loc = (x,y)

def moveSubUp():
    global sub_loc
    x, y = sub_loc
    y += 1
    sub_loc = (x, y)

def moveSubLeft():
    global sub_loc
    x, y = sub_loc
    x -= 1
    sub_loc = (x, y)

def moveSubRight():
    global sub_loc
    x, y = sub_loc
    x += 1
    sub_loc = (x, y)

@app.route("/moveSub", methods=['GET','POST'])
def moveSub():
    move_map = {"DOWN":moveSubDown, "UP":moveSubUp,  "LEFT":moveSubLeft, "RIGHT":moveSubLeft}
    content = request.json
    direction = content["direction"]
    move_map[direction]()
    x, y = sub_loc
    return jsonify({"x":x,"y":y})

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

@app.route('/index.css')
def style():
    return app.send_static_file('./index.css')

@app.route('/')
def root():
    return app.send_static_file('./index.html')


if __name__ == '__main__':
    app.run()
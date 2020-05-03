import random
from tile import *
from collections.abc import Sequence


class Board(Sequence):
    def __init__(self, size_x, size_y):
        self.size_x = size_x
        self.size_y = size_y
        self.board = {}
        self.gen_board()

    def __len__(self):
        return len(self.board)

    def __getitem__(self, i):
        return self.board[i]

    def bathys_repr(self):
        jsoned_board = {}
        for key, val in self.board.items():
            x, y = key
            new_key = str(x) + "," + str(y)
            new_val = val
            jsoned_board[new_key] = new_val
        return jsoned_board

    def gen_board(self):
        # class types of the tiles
        tile_choices = [OpenTile, CoralTile, RockTile]
        for x in range(self.size_x):
            for y in range(self.size_y):
                # Choose a tile type and instantiate
                self.board[(x, y)] = random.choice(tile_choices)()

    def reveal_tile(self, x=None, y=None, tup=None):
        tup_to_reveal = tup
        if x is not None and y is not None:
            tup_to_reveal = (x, y)
        self.board[tup_to_reveal].explored = True

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

    class GenTreeNode:
        def __init__(self, left=None, right=None, layer=0, channel=0):
            self.left = left
            self.right = right
            self.layer = layer
            self.channel = channel

        def __repr__(self):
            return "<Node "+str(self.layer)+","+str(self.channel)+">"

    class GenTree:
        def __init__(self, board_height, board_width):
            self.desired_layers = board_height/3
            self.desired_channels = board_width/3
            self.channels = 1
            self.root = Board.GenTreeNode()
            self.nodes = [self.root]
            self.gen_tree(self.root)


        def gen_tree(self, parent):
            to_expand = []
            if parent.layer + 1 < self.desired_layers:
                if parent.channel == 0:
                    parent.left = Board.GenTreeNode(layer=parent.layer + 1, channel=parent.channel-1)
                    parent.right = Board.GenTreeNode(layer=parent.layer + 1, channel=parent.channel+1)
                    to_expand.append(parent.left)
                    to_expand.append(parent.right)
                    self.channels += 2
                elif parent.channel < 0:
                    parent.right = Board.GenTreeNode(layer=parent.layer + 1, channel=parent.channel)
                    to_expand.append(parent.right)
                    if self.channels + 2 < self.desired_channels:
                        parent.left = Board.GenTreeNode(layer=parent.layer + 1, channel=parent.channel-2)
                        to_expand.append(parent.left)
                        self.channels += 2
                elif parent.channel > 0:
                    parent.left = Board.GenTreeNode(layer=parent.layer + 1, channel=parent.channel)
                    to_expand.append(parent.left)
                    if self.channels + 2 < self.desired_channels:
                        parent.right = Board.GenTreeNode(layer=parent.layer + 1, channel=parent.channel+2)
                        to_expand.append(parent.right)
                        self.channels += 2

            random.shuffle(to_expand)
            self.nodes.extend(to_expand)

            for node in to_expand:
                self.gen_tree(node)

        def __str__(self):
            print(self.nodes)
            max_level = max(self.nodes, key=lambda node: node.layer).layer
            min_channel = min(self.nodes, key=lambda node: node.channel).channel
            max_channel = max(self.nodes, key=lambda node: node.channel).channel
            full_str=""
            for j in range(max_level + 1):
                layer_str = ""
                for i in range(min_channel, max_channel+1):
                    found_node = False
                    for node in self.nodes:
                        if node.channel == i and node.layer == j:
                            layer_str += "O"
                            found_node = True
                    if not found_node:
                        layer_str += " "
                full_str += layer_str+"\n"
            return full_str


    def reveal_tile(self, x=None, y=None, tup=None):
        tup_to_reveal = tup
        if x is not None and y is not None:
            tup_to_reveal = (x, y)
        self.board[tup_to_reveal].explored = True

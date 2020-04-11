import json


class Tile:
    def __init__(self, color="#1A73E8"):
        self.color = color

    def bathys_repr(self):
        return {
            "color": self.color
        }

import json


class Tile:
    def __init__(self):
        self.color = None
        self.desc = None
        self.uniq = None
        self.explored = False

    def bathys_repr(self):
        return {
            "color": self.color,
            "desc": self.desc,
            "uniq": self.uniq,
            "explored": self.explored,
        }


class OpenTile(Tile):
    def __init__(self):
        super().__init__()
        self.desc = "Open Water"
        self.uniq = "open"
        self.color = "#1A73E8"


class CoralTile(Tile):
    def __init__(self):
        super().__init__()
        self.desc = "Coral Reef"
        self.uniq = "coral"
        self.color = "#F87661"

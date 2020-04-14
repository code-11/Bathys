class Position:
    def __init__(self):
        self.uniq = None
        self.name = None

    def bathys_repr(self):
        return {
            "name": self.name,
            "uniq": self.uniq,
        }
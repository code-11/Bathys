from flask.json import JSONEncoder


class BathysEncoder(JSONEncoder):
    def default(self, obj):
        try:
            return obj.bathys_repr()
        except:
            return super(BathysEncoder, self).default(obj)
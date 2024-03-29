import matplotlib.pyplot as plt
import networkx as nx
G = nx.DiGraph()

G.add_edge('Plasglass', 'Diamond')
G.add_edge('Diamond', 'Hyper crystals')

G.add_edge('Durasteel', 'Heavy Machinery')
G.add_edge('Durasteel', 'Machine bodies')
G.add_edge('CPUs', 'Machine bodies')
G.add_edge('Precision Valves', "Machine bodies")

G.add_edge('Botanicals', 'Super combustion liquid')
G.add_edge('Botanicals', 'Medicine')

nx.draw_planar(G, with_labels=True)
plt.show()
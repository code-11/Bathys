import Level from './space-components/levels/Level';
import LevelX from "./space-components/levels/LevelX";
import LevelOne from "./space-components/levels/LevelOne";

const levelStarters=[
  ()=>{new LevelX();},
  ()=>{new LevelOne();},
]

var url = new URL(window.location.href);
var level = parseInt(url.searchParams.get("level"));

//Now load the level
levelStarters[level]();

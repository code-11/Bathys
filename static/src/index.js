import Level from './space-components/levels/Level';
import LevelX from "./space-components/levels/LevelX";

const levelStarters=[
  ()=>{new LevelX();},
]

var url = new URL(window.location.href);
var level = parseInt(url.searchParams.get("level"));

//Now load the level
levelStarters[level]();

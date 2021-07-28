import Level from './space-components/levels/Level';
import LevelX from "./space-components/levels/LevelX";
import LevelOne from "./space-components/levels/LevelOne";

const levelStarters=[
  ()=>{new LevelX();},
  ()=>{new LevelOne();},
]

var url = new URL(window.location.href);
const levelStr=url.searchParams.get("level");
const level= levelStr=="x" ? 0 : parseInt(levelStr);

//Now load the level
levelStarters[level]();

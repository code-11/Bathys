import Button from "./Button";

export default class FixedSizeButton extends Button{
    constructor(text, text_opt, width, height){
      super(text, text_opt);
      this.fixedWidth=width;
      this.fixedHeight=height;
    }

    determineExtents(){
      const textExtents=super.determineExtents();
      const width = Math.max(textExtents.width,this.fixedWidth);
      const height = Math.max(textExtents.height, this.fixedHeight);
      return {width, height};
    }

}

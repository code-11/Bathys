export default class GuiUtil{
  static textSize(txt, font) {
      const element = document.createElement('canvas');
      const context = element.getContext("2d");
      context.font = font;
      const tsize = {'width':context.measureText(txt).width, 'height':parseInt(context.font)};
      element.remove();
      return tsize;
  }
}

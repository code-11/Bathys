import EXPolygonObj from "../core/EXPolygonObj";
import * as PIXI from 'pixi.js';

export default class Container extends EXPolygonObj{
  constructor(iwidth, iheight){
    super();
    // this._polygon =new PIXI.Polygon([
    //   new PIXI.Point(0,0),
    //   new PIXI.Point(0,height),
    //   new PIXI.Point(width,height),
    //   new PIXI.Point(width,0),
    // ]);
    this._iwidth=iwidth;
    this._iheight=iheight;
    this._widgets=[];
  }

  addElement(x,y,x2,y2,el){
    this._widgets.push({x,y,x2,y2,el});
  }

  determineColumnExtents(){
    this._columnStarts=[0]
    let cumulative_width=0;
    for(let x=0;x<this._iwidth;x+=1){
      const involved_widths=[];
      this._widgets.forEach(widget=>{
        if(widget.x<=x && x<=widget.x2){
          const widget_iwidth=(widget.x2-widget.x)+1;
          //assumes even distribution
          const widget_prorated_width=widget.el._width/widget_iwidth;
          involved_widths.push(widget_prorated_width);
        }
      });
      const column_width=Math.max(...involved_widths);
      cumulative_width+=column_width;
      this._columnStarts.push(cumulative_width);
    }
  }

  determineRowExtents(){
    this._rowStarts=[0]
    let cumulative_height=0;
    for(let y=0;y<this._iheight;y+=1){
      const involved_heights=[];
      this._widgets.forEach(widget=>{
        if(widget.y<=y && y<=widget.y2){
          const widget_iheight=(widget.y2-widget.y)+1;
          //assumes even distribution
          const widget_prorated_height=widget.el._height/widget_iheight;
          involved_heights.push(widget_prorated_height);
        }
      });
      const row_height=Math.max(...involved_heights);
      cumulative_height+=row_height;
      this._rowStarts.push(cumulative_height);
    }
  }

  init(){
    this._widgets.forEach(widget=>{
          widget.el.init();
    });

    this.determineColumnExtents();
    this.determineRowExtents();

    this.lineStyle(this._thickness, 0x0000FF);
    for(let i=1;i<this._columnStarts.length;i+=1){
      const start=this._columnStarts[i-1]+1;
      const end=this._columnStarts[i]-1;
      const height=this._rowStarts[this._rowStarts.length-1];
      const columnPoly=new PIXI.Polygon([
        new PIXI.Point(start,0),
        new PIXI.Point(start,height),
        new PIXI.Point(end,height),
        new PIXI.Point(end,0),
      ]);
      this.drawPolygon(columnPoly);
    }

    this.lineStyle(this._thickness, 0x00FF00);
    for(let i=1;i<this._rowStarts.length;i+=1){
      const start=this._rowStarts[i-1]+1;
      const end=this._rowStarts[i]-1;
      const width=this._columnStarts[this._columnStarts.length-1];
      const rowPoly=new PIXI.Polygon([
        new PIXI.Point(0,start),
        new PIXI.Point(0,end),
        new PIXI.Point(width,end),
        new PIXI.Point(width,start),
      ]);
      this.drawPolygon(rowPoly);
    }

    this._widgets.forEach(widget=>{
      const x=widget.x;
      const y=widget.y;
      widget.el.position.x=this._columnStarts[x];
      widget.el.position.y=this._rowStarts[y];
      this.addChild(widget.el);
    })


    // this.beginFill(this._color);
    this.lineStyle(this._thickness, this._border_color);
    // this.drawFunc();
    // this.endFill();
    this.setHitArea();
  }
}

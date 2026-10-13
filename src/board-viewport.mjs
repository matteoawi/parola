/** Scale the whole table, preserving tile proportions and the point between fingers. */
export function fitTable(width,height,spaceWidth,spaceHeight){return Math.min(1,(spaceWidth-20)/width,(spaceHeight-20)/height);}
export function boundedZoom(value,fit){return Math.min(2.2,Math.max(Math.min(.35,fit),value));}
export class BoardViewport{
 constructor(root){
  this.root=root;this.scale=1;this.auto='readable';this.blockUntil=0;
  root.addEventListener('touchstart',e=>this.start(e),{passive:false});
  document.addEventListener('touchmove',e=>this.move(e),{passive:false});
  for(const type of ['touchend','touchcancel'])document.addEventListener(type,e=>{if(this.gesture&&e.touches.length<2){this.gesture=null;this.blockUntil=performance.now()+500;this.scroll?.classList.remove('pinching');}});
  root.addEventListener('click',e=>{if(e.target.closest('.board-scroll')&&performance.now()<this.blockUntil){e.preventDefault();e.stopImmediatePropagation();}},{capture:true});
  root.addEventListener('wheel',e=>{if((e.ctrlKey||e.metaKey)&&e.target.closest('.board-scroll')&&this.board?.isConnected){e.preventDefault();this.zoom(this.scale*Math.exp(-e.deltaY*.008),{x:e.clientX,y:e.clientY});}},{passive:false});
  this.observer=new ResizeObserver(()=>{if(this.board?.isConnected)this.layout();});
 }
 configure(board,key,width,height){
  const scroll=board.closest('.board-scroll');
  if(this.key!==key){this.key=key;this.auto='readable';this.gesture=null;this.scale=1;}
  if(this.scroll!==scroll){this.observer.disconnect();this.scroll=scroll;this.observer.observe(scroll);}
  this.board=board;this.surface=board.parentElement;this.width=width;this.height=height;this.layout();
 }
 layout(){
  const rect=this.scroll.getBoundingClientRect();
  this.fit=Math.max(.1,fitTable(this.width,this.height,rect.width,rect.height));
  this.scale=this.auto===true?this.fit:this.auto==='readable'?Math.max(this.fit,Math.min(1,(rect.width-20)/(this.width*2/3))):boundedZoom(this.scale,this.fit);
  this.board.style.transform=`scale(${this.scale})`;
  this.surface.style.width=this.width*this.scale+'px';this.surface.style.height=this.height*this.scale+'px';
  this.board.dataset.zoom=this.scale.toFixed(3);this.board.classList.toggle('overview',this.auto===true);
  const group=this.root.querySelector('.board-zoom-controls');
  if(group){group.querySelector('output').textContent=Math.round(this.scale*100)+'%';group.querySelector('[data-action=boardZoom]').setAttribute('aria-pressed',String(this.auto===true));group.querySelector('[data-action=zoomOut]').disabled=this.scale<=Math.min(.35,this.fit)+.001;group.querySelector('[data-action=zoomIn]').disabled=this.scale>=2.199;}
 }
 zoom(value,point){
  if(!this.board?.isConnected)return;
  const viewport=this.scroll.getBoundingClientRect(),anchor=point||{x:viewport.left+viewport.width/2,y:viewport.top+viewport.height/2},before=this.surface.getBoundingClientRect(),x=(anchor.x-before.left)/this.scale,y=(anchor.y-before.top)/this.scale;
  this.auto=false;this.scale=boundedZoom(value,this.fit);this.layout();
  const after=this.surface.getBoundingClientRect();this.scroll.scrollLeft+=after.left+x*this.scale-anchor.x;this.scroll.scrollTop+=after.top+y*this.scale-anchor.y;
 }
 command(action){if(action==='boardZoom'){this.auto=true;this.layout();this.scroll.scrollLeft=this.scroll.scrollTop=0;}else this.zoom(this.scale*(action==='zoomIn'?1.22:1/1.22));}
 start(e){
  if(e.touches.length!==2||!e.target.closest('.board-scroll')||!this.board?.isConnected)return;
  e.preventDefault();this.blockUntil=performance.now()+1000;
  const [a,b]=e.touches;this.gesture={distance:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),scale:this.scale};
  this.scroll.classList.add('pinching');for(const tile of this.board.querySelectorAll('.tile'))for(const animation of tile.getAnimations())animation.cancel();
 }
 move(e){
  if(!this.gesture||e.touches.length!==2||!this.board?.isConnected)return;
  e.preventDefault();const [a,b]=e.touches,distance=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);
  this.zoom(this.gesture.scale*distance/Math.max(1,this.gesture.distance),{x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2});
 }
}

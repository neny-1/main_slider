const container=document.querySelector(".convoy");
var nextbut = document.querySelector('.next');
var prevbut = document.querySelector('.prev');
var children =container.children;
var allBox=container.children;//get all box content inside container

var allBox=container.children;//get all box item inside container
var margin=15; //margin for each box it is const
var containerWidth=container.offsetWidth+margin;//width of container
var items=0; //items in each screen
var jumpSlideWidth=0; //width to jump in next slider
var totalItems=0; //total box or items in all carousel
var currentSlide=1;  //for dots control
var allSlides = 1; // how many slides in each screen
var totalItemsWidth=0;
var itemWidth =0;
let startX;
let endX;
let newX;
let isDown = false;
let scrollLeft;
var time =2000;
var autoPlay ='off'; // put animation = 'off' to stop time slider animation content setup per slide
// item setup per slide
var startAnimation=0; //for start animation position 
var endAnimation=0;   // end animation and start other loop

responsive=[
{breakPoint:{width:0,item:1}}, //if width greater than 0 (1 item will show) 
{breakPoint:{width:600,item:2}}, //if width greater than 600 (2  item will show) 
{breakPoint:{width:1000,item:5}} //if width greater than 1000 (3 item will show) 
]

function mediaquery(){
for(let i=0; i<responsive.length;i++){
if(window.innerWidth>responsive[i].breakPoint.width){
items=responsive[i].breakPoint.item;
}
}
start();
}

function start(){
for(let i=0;i<allBox.length;i++){
// width and margin setup of items
allBox[i].style.width=(containerWidth/items)-margin + "px";
allBox[i].style.marginLeft=margin+ "px";
totalItemsWidth+=containerWidth/items;
totalItems++;
itemWidth=containerWidth/items
}
// carousel-items width set up
container.style.width=totalItemsWidth + "px";
children.item(0).style.marginLeft=0;
// slides controls number set up
allSlides=Math.ceil(totalItems);

}/*___________end start function________________*/

/***call functions***/ 
window.onload=mediaquery();
/*for auto play*/

animation(autoPlay);
hideBtn(autoPlay);


//whan click on next button
nextbut.addEventListener('click',()=>{
nextSlider();
});
//whan click on prev button
prevbut.addEventListener('click',()=>{
prevSlide();
});

/*__ for keyborad drage__*/
function keyborad(){
window.addEventListener('keydown',(e)=>{
if(e.keyCode=="39"){//click right arrow
nextSlider();
}  
if(e.keyCode=="37"){//click left arrow
prevSlide();
}

});

}/*___________________________________end keyborad_______________________________*/

/*__ for pc drage__*/
function PcDrag(){
container.addEventListener('mousedown',(e)=>{
isDown=true;
startX = e.pageX-container.offsetLeft;
});

container.addEventListener('mouseleave',()=>{
isDown=false;
});

container.addEventListener('mouseup',()=>{
isDown=false;
});

container.addEventListener('mousemove',(e)=>{
if (!isDown) return;
e.preventDefault();
newX=e.pageX-container.offsetLeft;
endX=newX-startX;
container.style.cursor='grabbing';
//next slider
if(endX <0 ){
nextSlider();
isDown=false;//do one transform and stop
}
if(endX>0){
prevSlide();
isDown=false;//do one transform and stop
}
})
};/*____________________end pc drag function__________________*/

/***for  Mobile Drag  */
function MobileDrag() {
// for drage
container.addEventListener('touchstart',(e)=>{
isDown=true;
startX =e.touches[0].pageX-container.offsetLeft; //-container.offsetLeft;
});

container.addEventListener('touchend',()=>{
isDown=false;
});

container.addEventListener('touchcansel',()=>{
isDown=false;
});

container.addEventListener('touchmove',(e)=>{
if (!isDown) return;
e.preventDefault();
newX=e.touches[0].pageX-container.offsetLeft;
endX=newX-startX;
container.style.cursor='grabbing';
//next slider
if(endX <0 ){
nextSlider();
isDown=false;//do one transform and stop
}
if(endX>0){
prevSlide();
isDown=false;//do one transform and stop
}
});

}/*_____________________________end MobileDrag function___________________________________*/

function nextSlider(){
//if last slider
if(jumpSlideWidth >= itemWidth*(allSlides-items-1) ){
	nextbut.classList.add('hidebtn');
	hideBtn(autoPlay);
	}
if(jumpSlideWidth >= itemWidth*(allSlides-items) ){
container.style.transform ='none';
container.style.transition = 'transform 0.0001s ease-in-out';
container.style.transform ='translateX(' +-jumpSlideWidth +'px)';
//normal next
}else {
jumpSlideWidth+=itemWidth;
container.style.transition = 'transform 0.8s ease-in-out';
container.style.transform ='translateX(' +-jumpSlideWidth +'px)';
currentSlide++;
prevbut.classList.remove('hidebtn');
hideBtn(autoPlay);
}
}/*____________________________________end nextSlider function____________________________*/

function prevSlide(){
if(jumpSlideWidth <=itemWidth){
	prevbut.classList.add('hidebtn');
	hideBtn(autoPlay);
}
if(jumpSlideWidth <=0){
//if first slider
container.style.transform= 'none';
container.style.transition = 'transform 0.0001s ease-in-out';
// normal prev
}else {
jumpSlideWidth-=itemWidth;
container.style.transition = 'transform 0.8s ease-in-out';
container.style.transform ='translateX(' +-jumpSlideWidth +'px)';
nextbut.classList.remove('hidebtn');
hideBtn(autoPlay); 
}
}/*______________________________end prevSlide function___________________________________*/

//set time to slider whan transition end auto play slider  
function animation(Status){
console.log('Status = '+Status);
if (Status ==='on'){ //whan auto play is on 
setTimeout('nextSlider()',time);

container.addEventListener('transitionend',() =>{
	if(startAnimation<=allSlides-items ){//11-5 = 6 
		setTimeout('nextSlider()',time);
		endAnimation++;
		startAnimation--;
		
	}
	if(endAnimation>=allSlides-items){
		setTimeout('prevSlide()',time);
		startAnimation=allSlides-items+1;//11-5+1=6
		endAnimation++;
	}
	if(endAnimation==(allSlides-items)*2+1){
		startAnimation=allSlides-items;
		endAnimation=-1;
	}
});
}else if(autoPlay==='off'){ //when auto play is of work in normal slider
PcDrag();
MobileDrag();
keyborad();
}
}
/* function to hide buttpns whene auto play is work */
function hideBtn(Status){
	if (Status ==='on'){
		prevbut.classList.add('hidebtn');
		nextbut.classList.add('hidebtn');
	}
}
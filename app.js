const canvas=document.getElementById("jsCanvas");
//canvas는 HTML의 한 요소
//다른점은 context를 가짐
//context는 이 요소 안에서 우리가 픽셀에 접근 할수 있는 방법
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");


const INITIAL_COLOR="#2c2c2c";
const CANVAS_SIZE=700;


canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;
//캔버스는 실제 픽셀 크기를 가진다.
//따라서 픽셀에도 크기를 줘야함..(뭔말인지 잘모르겠네)
//canvas element는 두가지의 크기를 가져야한다. 일단 css에서의 크기,
ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
//위에 두줄을 쓰는 이유는 html에서 보기에는 기본 화면이 하얀색으로 보이지만
//저장할때는 파일에 화면의 default값이 흰색이 아니기때문에 이 두줄을 써주는거임
ctx.strokeStyle="INITIAL_COLOR";//우리가 그릴 선들이 모두 이색을 갖는다고함
ctx.fillStyle="INITIAL_COLOR";
ctx.lineWidth=2.5;//선의 굵기 


let painting=false;//기본적인값 false (마우스를 클릭하지 않았을때의 값)
let filling=false;

function stopPainting(event){
    painting = false;
}
function startPainting(){
   painting=true;
}
function onMouseMove(event){
   const x= event.offsetX;
   const y=event.offsetY;
   //컨버스 내의 x축y축 값만 필요하기 때문에 offsetX,Y값만 필요함
   if(!painting)
   {//path=====> Line ************
      //path만 만들어질 뿐이지 클릭은 안하니 아직 선은 안그어진다
      //클릭하지 않고 마우스를 움직이기만 하면 계속 그 좌표가 기억이 된다
      ctx.beginPath();//경로 생성
      ctx.moveTo(x,y);//선 시작 좌표
   }else{
      ctx.lineTo(x,y);//선 끝 좌표
      //클릭하고(시작하고) lineTo()를 호출하면 점과 점사이에 선이 연결된다.
      ctx.stroke();//선 그리기
      //내가 마우스를 움직이는 내내 발생한다 위에 두개의 함수는*******
   }
}
function onMouseDown(event)
{
   painting=true;//마우스를 클릭했을때 값을 true
}
/*function onMouseUp(event){
   // painting=false;//마우스 클릭한걸 놨을때 false가 되어야함
   //그리기를 멈추게 하는 함수를 만들어서 사용
    stopPainting(); //여기서는 왜 onMouseLeave처럼 하지 않느냐==>나중에 line을 그려야 하기 때문 실제로 그리는게 필요

}*/

/*function onMouseLeave(event){
   // painting=false;//클릭하고 그리다가 컨버스 밖으로 갔을때 그리기를 멈춤(false)
   stopPainting();
   여기는 직접 함수를 쓸 필요가 없다.

}*/
function handleColorClick(event){
   const color=event.target.style.backgroundColor;
   ctx.strokeStyle=color;//13번째에 선언해 놓은 strokeStyle에 오버라이드(덮어씌우기)
   //하여 여기서 부터는 strokeStyle이 이 곳에 있는 색상이 되는거임
   ctx.fillStyle=color;
   //누군가가 color를 클릭하면 stroke스타일과 fillstyle을 컬러값으로 설정
}
function handleRangeChange(event)
{
   const size=event.target.value;
   ctx.lineWidth= size;//override하여 size 조절 마치 색깔 바꿀때 하듯이

}
function handleModeClick()
{// 사용자가 만일 filling 모드이면 브러쉬로 그리는게 아니라 화면을 채우는걸로 하고싶다
   //따라서 filling mode가 시동 됐는지 안됐는지 확인하는 변수가 필요하다
   if(filling==true){
   filling=false;
   mode.innerText="Fill"
   }else{
      filling=true;
      mode.innerText="Paint";
   }

}
function handleCanvasClick()
{
 if(filling)//if문을 사용해 fill을 클릭하면 캔버스를 채운다.
 {
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
 }
    
   
}
function handleCM(event)
{
   event.preventDefault();//우클릭 방지용 함수 저장을 할수 없다 사진을
}
function handleSaveClick()
{
   const image=canvas.toDataURL("image/jpeg");//toDataURL을 사용하여 이미지 저장할수 있게함
   const link=document.createElement("a");
   link.href=image;//url
   link.download="PaintJS👦";//save버튼 누르면 바로 다운 받을수가 있당 ㅈㄴ 어렵네 ;
   link.click();
}
if(canvas)
{
    canvas.addEventListener("mousemove",onMouseMove)
    //마우스 움직일때 동작 취함 (컨버스 안에서만)
    canvas.addEventListener("mousedown",startPainting)//mousedown은 클릭했을때 발생하는 event
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
   
}
Array.from(colors).forEach(color=>color.addEventListener("click",handleColorClick));
//색깔을 배열로 하여 각각 배열마다 실행해주는거
//여기 줄에서 color은 배열안에 각각의 items들을 대표 하는것

if(colors)
{
   Array.from(colors).forEach(color=>
      color.addEventListener("click",handleColorClick));
}

if(range){
   range.addEventListener("input",handleRangeChange)
}
if(mode){
   mode.addEventListener("click",handleModeClick);
}
if(saveBtn)
{
   saveBtn.addEventListener("click",handleSaveClick);
}
   
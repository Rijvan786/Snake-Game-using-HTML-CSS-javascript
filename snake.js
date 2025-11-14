
let board=document.querySelector('.board');

let startButton=document.querySelector('.start_btn')

let Modal =document.querySelector('.Modal')

let startGameModal= document.querySelector('.start_game')

let OverGameModal=document.querySelector('.game_over ')

let restartbutton=document.querySelector('.restart_btn')

let HighScoreElem=document.querySelector("#high-score")

let scoreElem=document.querySelector("#score")

let timeElem=document.querySelector("#time")
console.log(board);
console.log(startButton);
console.log(Modal);
console.log(startGameModal);
console.log(OverGameModal);
console.log(restartbutton);
console.log(HighScoreElem);
console.log(scoreElem);
console.log(timeElem);

let blockHeight=30;
let blockWidth=30;

let highscore=localStorage.getItem("highscore")||0;

let score=0;

let time=`00-00`

HighScoreElem.innerText=highscore
let cols=Math.floor(board.clientWidth /blockWidth)

let rows=Math.floor(board.clientHeight / blockHeight)


let IntervalID=null;
let timerIntervalID=null;

let foody={x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}


let blocks=[]

let sneh=[
    {
        x:1 ,y:3
}
];
let direction="down"




for(let row=0; row<rows; row++){
  
    for (let col=0; col<cols; col++){
        let block=document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
    
        blocks[`${row} - ${col}`]=block
    }

    

}


function render(){


    blocks[`${foody.x} - ${foody.y}`].classList.add("foody")
    
       let head=null;   
    if(direction ==="left"){
        head={x: sneh[ 0 ].x, y:sneh[ 0 ].y - 1 }
    }
    else if(direction==="right"){
        head={x: sneh[ 0 ].x, y:sneh[ 0 ].y + 1}
    }
    else if(direction==="down"){
        head={x: sneh[ 0 ].x+1, y:sneh[ 0 ].y }
    }
    else if(direction==="up"){                 
        head={x: sneh[ 0 ].x-1, y:sneh[ 0 ].y }
    }

    // dashboard logic 
    if(head.x<0 || head.x>=rows || head.y<0 || head.y >=cols){
        //    alert("Game Over!!!!!!!!!!!")
           clearInterval(IntervalID)
           Modal.style.display="flex"  
           startGameModal.style.display="none"
           OverGameModal.style.display="flex"
          
           

           return;

           }
// ***************** food consume logic
   if(head.x==foody.x && head.y==foody.y){
    blocks[`${foody.x} - ${foody.y}`].classList.remove("foody")

    foody={x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}

    blocks[`${foody.x} - ${foody.y}`].classList.add("foody")
   sneh.unshift(head)
   score+=10
   scoreElem.innerText=score
  if(score>highscore){
    highscore=score
    localStorage.setItem("highscore",highscore.toString())
  }
   }
    
    

// console.log( {x: sneh[ 0 ].x, y:sneh[ 0 ].y });

    
 

        sneh.forEach(segment=>{
            blocks[`${segment.x} - ${segment.y}`].classList.remove("filled")
            
        })

    
    
    
    sneh.unshift(head)
    sneh.pop() 
    

    sneh.forEach(sega=>{

     blocks [`${sega.x} - ${sega.y}`].classList.add("filled")
     console.log([`${sega.x} - ${sega.y}`]);

     })
}

//   Start Button

startButton.addEventListener("click",()=>{
    Modal.style.display="none"
    IntervalID=setInterval(()=>{
        render() },300 )
    timerIntervalID=setInterval(()=>{
        let [min,sec]=time.split("-").map(Number)
        
        if(sec===59){
            min+=1
            sec=0
        }else{
            sec+=1
        }
        time=`${min}-${sec}`
        timeElem.innerText=time;
    },1000)

    })  

restartbutton.addEventListener("click",()=> {
    restartGame()
} )
function restartGame(){
    blocks[`${foody.x} - ${foody.y}`].classList.remove("foody")
  sneh.forEach(sega=>{
    blocks[`${sega.x} - ${sega.y}`].classList.remove("filled")
  })  
   
   score=0
   time=`00-00`
   scoreElem.innerText=score;
   timeElem.innerText=time;
   HighScoreElem=innerText=highscore;


  Modal.style.display="none"
  
  direction="down"
  sneh=[{x:1 , y:3}]   
  foody={x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
  IntervalID=setInterval(()=>{render()},300)
  
}








// ArrowUp
// snake.js:140 ArrowDown
// snake.js:140 ArrowRight
// snake.js:140 ArrowLeft



addEventListener("keydown",(event)=>{
     if(event.key==="ArrowUp"){
        direction='up'
     }
     else if (event.key==="ArrowRight"){
        direction="right"
     }
     else if(event.key==="ArrowLeft"){
        direction="left"
     }
     else if(event.key==="ArrowDown"){
        direction="down"
     }
  
        
})  
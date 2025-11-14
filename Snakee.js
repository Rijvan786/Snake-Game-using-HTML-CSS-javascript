
let board=document.querySelector('.board');

let starbutton=document.querySelector('.start_btn')

let Modal=document.querySelector('.Modal')

let startGameModel=document.querySelector('.start_game')

let OverGameMode=document.querySelector('.game_over')

let RestartButton=document.querySelector('.restart_btn')
console.log(Modal);
console.log(startGameModel);
console.log(OverGameMode);
console.log(RestartButton);
let blockHeight=50;
let blockWidth=50;

let cols=Math.floor(board.clientWidth /blockWidth)

let rows=Math.floor(board.clientHeight / blockHeight)


let IntervalID=null;

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
        block.innerText=`${row}-${col}`
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
    if(head.x<0 || head.x>=rows || head.y<0 || head.y >=cols){
        //    alert("Game Over!!!!!!!!!!!")
           clearInterval(IntervalID)
           
           Modal.style.display="flex"
           startGameModel.style.display="none"
           OverGameMode.style.display="flex"
        

           }

   if(head.x==foody.x && head.y==foody.y){
    blocks[`${foody.x} - ${foody.y}`].classList.remove("foody")

    foody={x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}

    blocks[`${foody.x} - ${foody.y}`].classList.add("foody")
   sneh.unshift(head)
   }
    
    

// console.log( {x: sneh[ 0 ].x, y:sneh[ 0 ].y });

    
 

        sneh.forEach(segment=>{
            blocks[`${segment.x} - ${segment.y}`].classList.remove("fill")
            
        })

    
    
    
    sneh.unshift(head)
    sneh.pop() 
    

    sneh.forEach(segment=>{

     blocks [`${segment.x} - ${segment.y}`].classList.add("fill")
     return;
     })
}





        
//     IntervalID=setInterval(() => {
          
     


//         render()
//     }, 300)





// ArrowUp
// snake.js:140 ArrowDown
// snake.js:140 ArrowRight
// snake.js:140 ArrowLeft

starbutton.addEventListener("click",()=>{
    Modal.style.display="none"
    IntervalID= setInterval(()=>{
        render()
    },300 )
})
RestartButton.addEventListener("click",  Restartgame)
function Restartgame(){
 
     blocks[`${foody.x} - ${foody.y}`].classList.remove("fill")
     
     sneh.forEach(segment =>{
         blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
     })

     Modal.style.display= "none"
     direction="down"
     sneh=[{x:1,   y:3}]

     foody={x:Math.floor(Math.random() * rows), y :Math.floor(Math.random() *cols)}
    IntervalID=setInterval(()=>{
      
    },300)
}

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
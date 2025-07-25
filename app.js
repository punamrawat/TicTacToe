let boxes = document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0=true;  //playerX, player0
let count = 0; //to track draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame =() =>{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turn0){
         box.innerText="0";
         box.style.color = "#70e000";
         turn0=false;
        }else
        {
            box.innerText="X";
            turn0=true;
             box.style.color = "#f21b3f"
        }
        box.disabled=true;
        count++;

        let isWinner= checkWinner();

        if (count===9 && !isWinner){
            gameDraw();
        }    
    });
});

const gameDraw=() =>{
    msg.innerText=`Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

const disableboxes=() =>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const shoWinner = (winner) => {
   msg.innerText=`Congratulations, Winner is ${winner}`;
   msgContainer.classList.remove("hide");
   disableboxes();
};

const checkWinner= () =>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                shoWinner(pos1Val);
                return true;
            }
        }
    }
}; 

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
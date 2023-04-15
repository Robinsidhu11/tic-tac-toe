// 1 means X          0 means O
let next_icon_to_be_inserted=1
let symbols_inserted_count=0
let overlay=document.querySelector('[data-overlay]')
let current_status=document.querySelector('[data-current_status]')
let new_game_btn=document.querySelector('[data-new_game]')
let all_boxes=document.getElementsByClassName("box")
Object.keys(all_boxes).forEach(ele => {
    all_boxes[ele].addEventListener("click", ()=>{
        add_symbol_in_container(all_boxes[ele])
    });
});
// pattern of win
let array_of_wins=[[1,2,3],[1,5,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7],[4,5,6],[7,8,9]];
// to find if someone won or not
function findIfSomeoneWins(){
    array_of_wins.forEach((ele)=>{
        let test_box1=document.querySelector(`[data-box${ele[0]}]`)
        let test_box2=document.querySelector(`[data-box${ele[1]}]`)
        let test_box3=document.querySelector(`[data-box${ele[2]}]`)
        if(test_box1.textContent=="" || test_box2.textContent=="" || test_box3.textContent==""){
            // no chance to get a winner from this pattern
        }
        else{
            if((test_box1.textContent==test_box2.textContent) && (test_box1.textContent==test_box3.textContent)){
                // winner found, show winner, new game btn, remove event listners from all boxes
                current_status.textContent=`Winner Player - ${test_box1.textContent}`
                new_game_btn.classList.add("active")
                overlay.classList.add("active")
                test_box1.classList.add("win")
                test_box2.classList.add("win")
                test_box3.classList.add("win")
                return true
            }
            else{
                // not matched. keep searching for other patterns
            }
        }
    })
}


// to add respective symbol x or o
function add_symbol_in_container(clicked_box){
    if(clicked_box.textContent!=""){
        return
    }
    if(next_icon_to_be_inserted==1){
        clicked_box.textContent="X"
        next_icon_to_be_inserted=0
        current_status.textContent="Current Player - O"
        let ans=findIfSomeoneWins();
        symbols_inserted_count=symbols_inserted_count+1
        if(ans!=true){
            if(symbols_inserted_count==9){
                // game clash
                current_status.textContent="GAME CLASH"
                new_game_btn.classList.add("active")

            }
        }
    }
    else{
        clicked_box.textContent="O"
        next_icon_to_be_inserted=1
        current_status.textContent="Current Player - X"
        let ans=findIfSomeoneWins();
        symbols_inserted_count=symbols_inserted_count+1
        if(ans!=true){
            if(symbols_inserted_count==9){
                // game clash
                current_status.textContent="GAME CLASH"
                new_game_btn.classList.add("active")
            }
        }
        
    }
    
}
function setToDefault(){
    next_icon_to_be_inserted=1
    symbols_inserted_count=0
    new_game_btn.classList.remove("active")
    current_status.textContent="Current Player - X"
    Object.keys(all_boxes).forEach(ele => {
        all_boxes[ele].textContent=""
        all_boxes[ele].classList.remove("win")
    });
    overlay.classList.remove("active")
}
new_game_btn.addEventListener('click',()=>{
    setToDefault()
})
$('#computer').click(function (evt) {
    adversary = "computer";
    showNext("#adversary","#choise");
});

$('#friend').click(function (evt) {
    adversary = "friend";
    showNext("#adversary","#choise");
});

$('#x').click(function (evt) {
    choise = "x";
    adversaryC = "o";
    showNext("#choise","#playgame");
});

$('#o').click(function (evt) {
    choise = "o";
    adversaryC = "x";
    showNext("#choise","#playgame");
});

$('.box').click(function (evt) {
    
    function verify(winner){
         if(winner!='no yet'){
            showNext('#playgame','#endgame');
            if(winner==choise){
                document.getElementById("winner").innerHTML = "You win :D";  
            }else if(winner==adversaryC){
                document.getElementById("winner").innerHTML = "You lose :(";  
            }                
            else{
                document.getElementById("winner").innerHTML = "A tie :(";
            }
                
        }
    }
    
    
   
    if(this.innerHTML == '&nbsp;' ){
        
        index = parseInt($(this).attr('id'))-1;
        
        if(turn=='user'){
            this.innerHTML = choise;
            array[index] = choise;
            turn = "adversary";
            if(adversary == "computer"){
                verify(findWinner(0));
                if(array.indexOf(undefined)>-1){
                    computerplay();
                    turn = "user";

                }
            }else{
                document.getElementById("turn").innerHTML = "Player two";
            }
           
        }
        else{
            this.innerHTML = adversaryC;
            array[index] = adversaryC;
            turn = "user";
            document.getElementById("turn").innerHTML = "Player one";
        }
        
        verify(findWinner(0));
       

        
       

    }
});

$('#reset').click(function (evt) {
    reset();
    showNext("#endgame","#adversary");
});

function reset(){
    adversary = "";
    choise = "";
    adversaryC = "";
    turn = "user";
    array = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
    round = 0;
    
    for(i=1;i<10;i++){
        document.getElementById(i).innerHTML = '&nbsp;';
    }
    
}

function showNext(previous,next){
    $(previous).fadeOut('slow',function(){
         $(next).fadeIn();
    });
    
}

function findWinner(option){
    var find = 0;
    var letter = choise;
    
    //horizontal
    for(i=0;i<7;i+=3){
        if(option==0){
            letter = array[i];
            if(letter){
                if(array[i+1] == letter && array[i+2] == letter){
                    return letter;
                }
            }
        }
        else if(option==1){
            if(array[i]==letter){
                if(array[i+1] == letter ){
                    if(array[i+2])
                        break;
                    else
                        return i+2;
                }
                else if(array[i+2] == letter ){
                    if(array[i+1])
                        break;
                    else
                        return i+1;
                }
            }
            else if(array[i]==undefined && array[i+1] == letter && array[i+2] == letter){
                    return i;
            }
        }
    
    }
    
    //vertical
    for(i=0;i<3;i++){
        if(option==0){
            letter = array[i];
            if(letter){
                if(array[i+3] == letter && array[i+6] == letter){
                    return letter;
                }
            }
        }
        else if(option==1){
            if(array[i]==letter){
                if(array[i+3] == letter){
                     if(array[i+6])
                        break;
                    else
                        return i+6;
                }
                else  if(array[i+6] == letter){
                     if(array[i+3])
                        break;
                    else
                        return i+3;
                }
            }
            else if(array[i]==undefined && array[i+3] == letter && array[i+6] == letter ){
                    return i;
            }
        }
        
    } 
    
    //diagonal
    for(i=0;i<3;i=i+2){
         
        if(i==0)
                index = 4;
            else
                index = 2;
        
        if(option==0){
            letter = array[i];
            if(letter){
                if(array[i+index] == letter && array[i+index*2] == letter){
                    return letter
                }
            }
            
        }else if(option==1){
            if(array[i]==letter){
                if(array[i+index] == letter ){
                    if(array[i+index*2])
                        break;
                    else
                        return i+index*2;
                }
                else if(array[i+index*2] == letter ){
                    if(array[i+index])
                        break;
                    else
                        return i+index;
                }
            }
            else if(array[i]==undefined && array[i+index] == letter &&  array[i+index*2] == letter ){
                return i;
            }
        }
    }

    if(option==0){
        if(array.indexOf(undefined) >= 0)
            return 'no yet';
        else
            return 'no';
    }else{
        return -1;
    }
    
}

function computerplay(){
    
    aleatory = [0,1,2,3,5,6,7,8];
    
    if(round==0){
        //try win
        if(array[4]==undefined){
            array[4] = adversaryC;
            pos = 4;
        }else{
            pos = parseInt((Math.random() * (8 - 0) + 0));
            console.log(pos);
            pos = aleatory[pos];
            array[pos]=adversaryC;
        }
        round++;
        document.getElementById(pos+1).innerHTML = adversaryC;
        console.log("entrei");
        pos = -1;
    }else{
        pos = findWinner(1);
        //blocked
        if(pos>-1){
            array[pos] = adversaryC;
            document.getElementById(pos+1).innerHTML = adversaryC;
        }else{
            pos = array.indexOf(undefined);
            array[pos] = adversaryC;
            document.getElementById(pos+1).innerHTML = adversaryC;
        }
    }
    
}

reset();
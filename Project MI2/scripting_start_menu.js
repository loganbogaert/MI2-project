//********************<vars>************************
// array maken
var plaatsen = [""];
// var maken
var aantal = 1;
// var maken
var nodes = "";
// var maken
var actuelePlaats = "";
//********************<function>********************
function hireDiv()
{
    // call jquery method
    $(".startSpelMenu").animate({top: "50%"},800);
    // call jquery method
    $(".startSpelMenu").css('transform', 'translate(-50%,-50%)');
    // call jquery method
    $(".startSpelMenu").addClass("rotate");
    // call jquery method
    $(".divHide").addClass("show"); 
    // load dam
    loadDam();
}
//********************<function>********************
function addArray(rij,kolom)
{
    // in array toevoegen
    plaatsen.push(rij.toString()+";"+kolom.toString());
    // aantal verhogen
    aantal++;
}
//********************<function>********************
function loadPion(dame,rij,kolom)
{
   // div opstellen
   nodes+= "<div class='" + dame + "' id = '" + aantal +"'" +"onclick='press(" + aantal + ")'" + "></div>";
   // function
   addArray(rij,kolom);   
}
//********************<function>********************
function hideDiv()
{
    // player 1
    var player1 = document.getElementById("player1").value;
    // player 2
    var player2 = document.getElementById("player2").value;
    // kijken of player 1 en 2 niet leeg zijn
    if(player1 != "" && player2 !="")
    {
        // player 1 op scherm zetten
        document.getElementById("playerone").innerHTML = player1;
        // player 2 op scherm zetten
        document.getElementById("playertwo").innerHTML = player2;
        // call jquery method
        $(".player1").animate({opacity: "1"},800);
        // call jquery method
        $(".player2").animate({opacity: "1"},800);
        // call jquery method
        $(".startSpelMenu").removeClass("rotate");
        // call jquery method
        $(".divHide").removeClass("show");
        // call jquery method
        $(".divHide").addClass("hide");
        // call jquery method
        $(".startSpelMenu").animate({top: "0%"},800);
        // call jquery method
        $(".startSpelMenu").addClass("rotatetwo");  
        // call jquery method
        $(".damBord").fadeTo(800, 1); 
    }
    else
    {
        // content van title veranderen
        document.getElementById("player1").placeholder = "Name player 1";
        // content van title veranderen
        document.getElementById("player2").placeholder = "Name player 2";
        // call jquery method
        $("#player1").removeClass("player");
        // call jquery method
        $("#player2").removeClass("player");
        // call jquery method
        $("#player1").addClass("red");
        // call jquery method
        $("#player2").addClass("red");
    }
}
//********************<function>********************
function loadDam()
{
    // bool op true zetten
    var bool = false;
    // locale var 
    var rij = 8;
    // locale var 
    var kolom = 8;
    // for lus voor de rijen te tekenen
    for(i=0;i<rij;i++)
    {
        // for lus voor de kollomen te tekenen
        for(b=0;b<kolom;b++)
        {
            // div opstellen
            nodes+= "<div class='";
            // kijken of het zwart of wit moet zijn
            if(bool){nodes+="blackCase ";} else {nodes+="whiteCase ";}
            // clear classe toevoegen
            if(b==0 && i !=0) {nodes+="clear";}
            // div opstellen
            nodes+= "'";
            // event toevoegen
            if(bool) {nodes+= "Onclick='movePion(" + i +"," + b + ")'";}
            // div opstellen
            nodes+= "id = '"+ i +";" + b +"'";
            // div opstellen
            nodes+= ">";
            // bool veranderen
            bool = !bool;
            // als rij tussen 0 en 3 zit
            if(i>=0 && i<3)
            {
                // rij 0 en 2
                if((i==0 && b!=0 || i==2 && b!=0 ) && b % 2 != 0 ) 
                {
                    // function
                    loadPion("dameNoir",i,b);
                }
                // rij 1
                if(i==1 && b!=7 && b % 2 == 0)
                {
                   // function
                   loadPion("dameNoir",i,b);
                }  
            }
            // als rij tussen 5 en 8 zit
            if(i>=5 && i<8)
            {
               // rij 5 en 7
               if((i==5 && b!=7 || i==7 &&  b!=7) && b % 2 ==0)
               {
                   // function
                   loadPion("dameBlanche",i,b);
               }
               // rij 6 
               if(i==6 && b!=0 && b % 2 != 0 )
               {
                   // function
                   loadPion("dameBlanche",i,b);
               }
            }
            // div opstellen
            nodes+="</div>";
         }
        // bool wisselen als het een even getal is, anders klopt het dambord niet
        if(b % 2 == 0) {bool = !bool;}  
    }
    // op schermen
    document.getElementById("dam").innerHTML = nodes;
}
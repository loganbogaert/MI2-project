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
function hideDiv()
{
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
//********************<function>********************
function loadDam()
{
    // bool op true zetten
    var bool = false;
    // locale var 
    var rij = 8;
    // locale var 
    var kolom = 8;
    // locale var
    var nodes = "";
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
            // bool veranderen
            bool = !bool;
            // clear classe toevoegen
            if(b==0 && i !=0) {nodes+="clear";}
            // div opstellen
            nodes+= "'>";
            // als rij tussen 0 en 3 zit
            if(i>=0 && i<3)
            {
                // rij 0 en 2
                if((i==0 && b!=0 || i==2 && b!=0 ) && b % 2 != 0 ) 
                {
                    // div opstellen
                    nodes+= "<div class='dameNoir'></div>";
                }
                // rij 1
                if(i==1 && b!=7 && b % 2 == 0)
                {
                    // div opstellen
                    nodes+= "<div class='dameNoir'></div>";
                }  
            }
            // als rij tussen 5 en 8 zit
            if(i>=5 && i<8)
            {
               // rij 5 en 7
               if((i==5 && b!=7 || i==7 &&  b!=7) && b % 2 ==0)
               {
                   // div opstellen
                   nodes+= "<div class='dameBlanche'></div>";
               }
               // rij 6 
               if(i==6 && b!=0 && b % 2 != 0 )
               {
                   // div opstellen
                   nodes+= "<div class='dameBlanche'></div>";
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
    

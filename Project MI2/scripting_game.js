//********************<vars>************************
var player1AanDeBeurt = false;
var vorigeId = "";
var id = "";
var arrayMogelijkePlaatsen = [];
var padTotPion = [];
var specialePionnen = [];
var plaats = "";
var basic  = "";
var isbegonnen = false;
var klokId;
var ind;
var kolomEnRij;
var nummer = 0;
var plaatsIdPion;
var telMaarOp = true;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var aantalKeerGeklikt = 0;
var timerNogNietGestart = false;
//********************<function>********************
function press(id)
{
    if(aantalKeerGeklikt == 0)
    {
        // parse int
        this.id = parseInt(id);
        // zien wie aan de beurt is 
        if(player1AanDeBeurt == false && id>=13 && id<25){ colorPion(id);}
        // zien wie aan de beurt is 
        if(player1AanDeBeurt == true && id>=1 && id <13) { colorPion(id);}
    }
}
//********************<function>********************
function colorPion(id)
{
    // vorige id zijn classe verwijderen
    if(vorigeId!=""){ $("#"+vorigeId.toString()).removeClass("shadow");}
    // call jquery method
    $("#"+id.toString()).addClass("shadow");
    // huidige id afgeven
    vorigeId = id;
    // plaats van pion halen
    var plaatsPion = plaatsen[vorigeId];
    // in stukjes verdelen
    var array = plaatsPion.split(";");
    // functie oproepen
    check(array,player1AanDeBeurt,plaatsPion);
}
//********************<function>********************
function movePion(kolom, rij)
{
    if(aantalKeerGeklikt == 0)
    {
        // plaats maken
        kolomEnRij = kolom.toString() + ";" + rij.toString();
        // plaats van Id nemen
        var plaatsId = plaatsen[vorigeId]; plaatsIdPion = plaatsen[vorigeId];
        // bool maken
        var hoortErbij = false; var kanBewegen = false;
        //*************<kijken of het gaat om een pion of plaats>*************
        for(i=0;i<plaatsen.length;i++) { if(plaatsen[i]==kolomEnRij) {hoortErbij=true;break;}}
        // check bool
        if(!hoortErbij)
        {
            // door array lopen
            for(i=0;i<arrayMogelijkePlaatsen.length;i++) {if(kolomEnRij==arrayMogelijkePlaatsen[i]) {kanBewegen=true;break;}}
            // wanneer men de pion toelaat om te bewegen
            if(kanBewegen)
            {
                // aantal keren klikken + 1
                aantalKeerGeklikt++;
                // in array steken
                var array1 = plaatsId.split(";"); var array2 = kolomEnRij.split(";");
                // bool maken
                var timerNietNodig = true; telMaarOp = true;
                // top instellen
                var top = parseFloat($("#"+vorigeId).css('top').replace(/[^-\d\.]/g, ''));
                // left instellen
                var left = parseFloat($("#"+vorigeId).css('left').replace(/[^-\d\.]/g, ''));
                // wanneer men de pion voor de eerste keer beweegt
                if(!isbegonnen){ isbegonnen = !isbegonnen; basic = top * 2; basic = parseFloat(basic);}
                // zien hoeveel stappen men moet nemen
                if(padTotPion.length==0){ move(array1,array2,top,left,kolomEnRij);}
                // als het pad bestaat
                else
                {
                    // door array lopen
                    for(i=0;i<padTotPion.length;i++)
                    {
                        // multidimensionale array
                        for(b=0;b<padTotPion[i].length;b++){if(padTotPion[i][b] == kolomEnRij){timerNietNodig=false;ind=i;break;}}
                    }
                    // als er een pad bestaat, maar niet bestemt is voor onze pion
                    if(timerNietNodig) { move(array1,array2,top,left,kolomEnRij);}
                    // wanneer er wel een timer moet worden aangemaakt
                    else
                    {
                        // eerst de methode roepen, anders moet men 800 millesconden wachten
                        repeat();
                        // start timer  
                        if(!timerNogNietGestart){klokId = setInterval(repeat,800); timerNogNietGestart = true;}
                    }
                 }
              }
           }
    }
}
//********************<function>********************
function repeat()
{
    // arrays maken
    var array1 = plaatsIdPion.split(";");var array2 = padTotPion[ind][nummer].split(";");
    // top instellen
    var top = parseFloat($("#"+vorigeId).css('top').replace(/[^-\d\.]/g, ''));
    // left instellen
    var left = parseFloat($("#"+vorigeId).css('left').replace(/[^-\d\.]/g, ''));
    // wanneer de pion naar boven moet
    if(array1[0] > array2[0]){ top = top - basic;}
    // wanneer de pion naar beneden moet
    if(array1[0] < array2[0]){ top = top + basic;}
    // wanneer de pion naar rechts moet
    if(array1[1] < array2[1]){left = left + basic;}
    // wanneer de pion naar links moet
    if(array1[1] > array2[1]){left = left - basic;}
    // toevoegen aan speciale Id's
    if(array2[0]==0 && player1AanDeBeurt == false)
    {
        // in array pushen
        specialePionnen.push(vorigeId); 
        // border kleur aanpassen
        document.getElementById(vorigeId).style.borderColor ="#80ff80";
    }
    // toevoegen aan speciale Id's
    if(array2[0]==7 && player1AanDeBeurt == true)
    {
        // in array pushen
        specialePionnen.push(vorigeId); 
        // border kleur aanpassen
        document.getElementById(vorigeId).style.borderColor ="#80ff80";
    }
    // use function
    veranderKleur("#BA7A3A");
    // gele schadow weg doen
    $("#"+vorigeId).removeClass("shadow");
    // pion bewegen
    $("#"+vorigeId).animate({top: top, left : left});
    // wanneer de pion weg moet
    if(plaatsen.indexOf(padTotPion[ind][nummer]) > -1)
    {
        // pion onzichtbaar maken
        $("#"+plaatsen.indexOf(padTotPion[ind][nummer])).fadeOut();
        // als het player één was, score toevoegen aan speler 1
        if(player1AanDeBeurt){scorePlayer1++;}
        // zo niet, aan speler 2
        else{scorePlayer2++;}
        // als het spel af is 
        if(scorePlayer1 ==  12 || scorePlayer2 == 12)
        {
            // var maken
            var name = "";
            // naam in stoppen
            if(scorePlayer1 == 12){ name = player1;}
            // naam in stoppen
            if(scorePlayer2 == 12){name = player2;}
            // op scherm zetten
            document.getElementById("title2").innerHTML = name + " won !";
            // achter div zetten
            document.getElementById("dam").style.zIndex = "-1";
            // in het midden van het scherm zetten
            $(".eindSpelMenu").css("display","block");
            // in het midden van het scherm zetten
            $(".eindSpelMenu").animate({bottom: "50%"},800); 
            // call jquery method
            $(".divHide").removeClass("hide");
            // call jquery method
            $(".divHide").addClass("show");
            // rotate
            $(".eindSpelMenu").addClass("rotatethree");
        }
    }
    // plaats aanpassen van pion die weg is 
    plaatsen[plaatsen.indexOf(padTotPion[ind][nummer])] = "";
    // plaats van id aanpassen
    plaatsIdPion = padTotPion[ind][nummer];
    // plaats updaten
    plaatsen[vorigeId] = plaatsIdPion;
    // timer stoppen als de array erdoor is 
    if(padTotPion[ind][nummer] == kolomEnRij)
    {
        // stoppen met timer
        clearInterval(klokId); nummer = 0;
        // nu mag men weer klikken
        setTimeout(function(){aantalKeerGeklikt = 0; timerNogNietGestart = false; }, 400); 
        // change bool
        telMaarOp = false;
    }
    // optellen met 1
    if(telMaarOp){nummer++;}
}
//********************<function>********************
function move(array1,array2,top,left,kolomEnRij)
{
    // wanneer de pion naar boven moet
    if(array1[0] > array2[0]){ top = top - basic;}
    // wanneer de pion naar beneden moet
    if(array1[0] < array2[0]){ top = top + basic;}
    // wanneer de pion naar rechts moet
    if(array1[1] < array2[1]){left = left + basic;}
    // wanneer de pion naar links moet
    if(array1[1] > array2[1]){left = left - basic;}
    // use function
    veranderKleur("#BA7A3A");
    // gele schadow weg doen
    $("#"+vorigeId).removeClass("shadow");
    // pion bewegen
    $("#"+vorigeId).animate({top: top, left : left});
    // plaats updaten
    plaatsen[vorigeId] = kolomEnRij;
    // toevoegen aan speciale Id's
    if(array2[0]==0 && player1AanDeBeurt == false)
    {
        // in array pushen
        specialePionnen.push(vorigeId); 
        // border kleur aanpassen
        document.getElementById(vorigeId).style.borderColor ="#80ff80";
    }
    // toevoegen aan speciale Id's
    if(array2[0]==7 && player1AanDeBeurt == true)
    {
        // in array pushen
        specialePionnen.push(vorigeId); 
        // border kleur aanpassen
        document.getElementById(vorigeId).style.borderColor ="#80ff80";
    }
    // nu mag men weer klikken en mag de volgende speler spelen
    setTimeout(function(){ aantalKeerGeklikt = 0; player1AanDeBeurt = !player1AanDeBeurt;}, 400);
}
//********************<function>********************
function veranderKleur(kleur)
{
    //*********<kleuren terug normaal zetten>*********
    for(i=0;i<arrayMogelijkePlaatsen.length;i++)
    { 
        // id nemen
        var id = document.getElementById(arrayMogelijkePlaatsen[i]);
        // als id bestaat moet de kleur veranderd worden
        if(id!=null){ document.getElementById(arrayMogelijkePlaatsen[i]).style.backgroundColor = kleur;}
    }
}
//********************<function>********************
function check(array,player,plaatsPion)
{
    // use function
    veranderKleur("#BA7A3A");
    // array leeg maken
    arrayMogelijkePlaatsen = []; padTotPion = [];
    // eerste getal nemen
    var getal1 = parseInt(array[0]);
    // tweede getal nemen
    var getal2 = parseInt(array[1]);
    // bool maken
    var bool4 = false;
    // bool maken
    var naarLinks;
    // bool maken
    var bool5 = true;
    // door array lopen
    for(i=0;i<specialePionnen.length;i++){if(vorigeId==specialePionnen[i]) {bool5=false;break;}}
    // wanneer het over een normaal pion gaat
    if(bool5){seePlaces(player,getal1,getal2);}
    // wanneer het over een speciaal pion gaat
    else{seePlaces(true,getal1,getal2); seePlaces(false,getal1,getal2);}
    // kijken of onze waarde er tussen ligt
    for(i=0;i<arrayMogelijkePlaatsen.length;i++){if(plaats == arrayMogelijkePlaatsen[i]) {bool4 = true; break;}}
    // use function
    veranderKleur("#cc0000");
}
//********************<function>********************
function seePlaces(player,getal1,getal2)
{
    // var maken
    var dom;
    // ++ of --
    if(player){getal2++; getal1++;} else{getal2--; getal1--;}
    // object pakken van specifieke ID
    dom = document.getElementById(getal1.toString()+";"+ getal2.toString());
    // in array pushen
    if(dom!=null){arrayMogelijkePlaatsen.push(getal1+";"+getal2);}
    // plus twee
    if(player){getal2 = getal2-2;} else {getal2 = getal2+2;}
    // object pakken van specifieke ID
    dom = document.getElementById(getal1.toString()+";"+ getal2.toString());
    // in array pushen
    if(dom!=null) { arrayMogelijkePlaatsen.push(getal1+";"+getal2);}
    // array maken
    var aanwezigePionnen = [];
    // array maken
    var ids = [];
    //*********<als er pionnen zijn moeten ze weg>*********
    for(i=0;i<arrayMogelijkePlaatsen.length;i++)
    {
        // index als id nemen
        var index = plaatsen.indexOf(arrayMogelijkePlaatsen[i]);
        // wanneer player 2 aan de beurt is 
        if(index > -1)
        {
            // wanneer er een pion van de tegenstander zich op de plaats bevindt 
            if(!player1AanDeBeurt){if(index >=1 && index <13){aanwezigePionnen.push(arrayMogelijkePlaatsen[i]);} }
            // wanneer er een pion van de tegenstander zich op de plaats bevindt 
            if(player1AanDeBeurt){if(index >=13 && index <25){aanwezigePionnen.push(arrayMogelijkePlaatsen[i]);} }
            // plaats leeg maken
            arrayMogelijkePlaatsen[i] = "";
        }
    }
    // filteren 
    arrayMogelijkePlaatsen = arrayMogelijkePlaatsen.filter(function test(value) { return value !=""});
    // plaats van id vinden
    var kolomEnRij = plaatsen[vorigeId];
    // in stukjes kappen
    var kolomArray = kolomEnRij.split(";");
    // door array lopen
    for(i=0;i<aanwezigePionnen.length;i++)
    {
        // pion in stukjes kappen
        var pionArray = aanwezigePionnen[i].split(";");
        // array maken
        var pionArray2 = [];
        // bools maken
        var gaatnaarboven; var gaatnaarlinks; var gaDoor = false; var isGestart = false; var bool = true;
        // vars maken 
        var kolomGetal=0; var rijGetal=0;
        // array maken 
        var pad = [];
        // wanneer de pion naar boven moet
        if(kolomArray[0] > pionArray[0]){ gaatnaarboven = true;}
        // wanneer de pion naar beneden moet
        if(kolomArray[0] < pionArray[0]){ gaatnaarboven = false;}
        // wanneer de pion naar rechts moet
        if(kolomArray[1] < pionArray[1]){gaatnaarlinks = false;}
        // wanneer de pion naar links moet
        if(kolomArray[1] > pionArray[1]){gaatnaarlinks = true;}
        // zien of er plaatsen beschikbaar zijn
        while(!gaDoor)
        {
            // vars waarden geven bij de start
            if(!isGestart)
            {
                // eerste plaats van array geven
                kolomGetal = pionArray[0];
                // tweede plaats van array geven
                rijGetal = pionArray[1];
                // change bool
                isGestart = true;
            }
            else
            {
                // als men naar boven en naar en naar rechs gaat 
                if(gaatnaarboven == true && gaatnaarlinks == false)
                {
                    // als men niet buiten het bord is
                    if(rijGetal!=7)
                    {
                        // kolom min 1
                        kolomGetal = parseInt(kolomGetal) - 1;
                        // rij plus 1
                        rijGetal = parseInt(rijGetal) + 1;
                    }
                    // richting aanpassen
                    else{gaatnaarlinks = true;}
                }
                // als men naar boven en naar en naar links gaat 
                if(gaatnaarboven == true && gaatnaarlinks == true)
                {
                    // als men niet buiten het bord is
                    if(rijGetal!=0)
                    {
                        // kolom min 1
                        kolomGetal = parseInt(kolomGetal) - 1;
                        // rij min 1
                        rijGetal = parseInt(rijGetal) - 1;
                    }
                    // zo wel 
                    else
                    {
                        // richting aanpassen
                        gaatnaarlinks = false;
                        // kolom min 1
                        kolomGetal = parseInt(kolomGetal) - 1;
                        // rij plus 1
                        rijGetal = parseInt(rijGetal) + 1;
                    }
                }
                // als men naar beneden en naar en naar links gaat 
                if(gaatnaarboven == false && gaatnaarlinks == true)
                {
                     // als men niet buiten het bord is
                    if(rijGetal!=0)
                    {
                        // kolom plus 1
                        kolomGetal = parseInt(kolomGetal) + 1;
                        // rij min 1
                        rijGetal = parseInt(rijGetal) - 1;
                    }
                    // zo wel, richting aanpassen
                    else{gaatnaarlinks = false;}
                }
                // als men naar beneden en naar en naar rechs gaat 
                if(gaatnaarboven == false && gaatnaarlinks == false)
                {
                    // als men niet buiten het bord is
                    if(rijGetal!=7)
                    {
                        // kolom plus 1
                        kolomGetal = parseInt(kolomGetal) + 1;
                        // rij plus 1
                        rijGetal = parseInt(rijGetal) + 1;
                    }
                    // zowel
                    else
                    {
                        // richting aanpassen
                        gaatnaarlinks = true;
                        // kolom plus 1
                        kolomGetal = parseInt(kolomGetal) + 1;
                        // rij min 1
                        rijGetal = parseInt(rijGetal) - 1;
                    }
                }
            }
            // index maken van de plaats
            var index = plaatsen.indexOf(kolomGetal.toString()+";"+ rijGetal.toString());
            // code wordt een keer op de twee uitvoerd 
            if(bool)
            {
                // als er geen pion staat
                if(index== -1){ gaDoor = true;}
                // als er wel een pion staat, maar van de speler zijn eige team
                else
                {
                    // stop code 
                    if(index >=1 && index  <13 && player1AanDeBeurt == true){ gaDoor = true;} 
                    // stop code 
                    if(index >=13 && index <25 && player1AanDeBeurt == false){ gaDoor = true;} 
                }
                // change bool
                bool = false;
            }
            // code wordt een keer op de twee uitvoerd 
            else
            {
                // object pakken van specifieke ID
                var dom = document.getElementById(kolomGetal.toString()+";"+ rijGetal.toString());
                // als die niet bestaat stoppen we de while lus 
                if(dom == null){ gaDoor = true;}
                // zo niet gaan we verder
                else
                { 
                    // als er geen pion staat op het veld, toevoegen in pad
                    if(index== -1){pad.push(kolomGetal.toString()+";"+ rijGetal.toString());}
                    // zo niet stoppen we de while lus
                    else{ gaDoor = true;}
                    // bool veranderen om volgende keer andere code uit te voeren
                    bool = true;
                } 
            }
            // pad toevoegen
            pionArray2.push(kolomGetal.toString()+";"+ rijGetal.toString());
        }
        // pad toevoegen
        padTotPion.push(pionArray2);
        // als men een pad heeft voegt men de laatste plaats in de array
        if(pad.length!=0){ arrayMogelijkePlaatsen.push(pad[pad.length-1]);}
    }
} 
//********************<function>********************
function restart()
{
    // in het midden van het scherm zetten
    $(".eindSpelMenu").animate({bottom: "120%"},800); 
    // rotate
    $(".eindSpelMenu").removeClass("rotatethree");
    // rotate
    $(".eindSpelMenu").addClass("rotatefour");
    // call jquery method
    $(".divHide").removeClass("show");
    // call jquery method
    $(".divHide").addClass("hide");
    // refresh game
    setTimeout(function(){ location.reload(); }, 1000);
}
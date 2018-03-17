//********************<vars>************************
var player1AanDeBeurt = false;
var vorigeId = "";
var id = "";
var arrayMogelijkePlaatsen = [];
var specialePionnen = [];
var plaats = "";
var basic  = "";
var isbegonnen = false;
//********************<function>********************
function press(id)
{
    // parse int
    this.id = parseInt(id);
    // zien wie aan de beurt is 
    if(player1AanDeBeurt == false && id>=13 && id<25)
    {
        // function
        colorPion(id);
    }
    if(player1AanDeBeurt == true && id>=1 && id <13)
    {
        // function
        colorPion(id);
    }
}
//********************<function>********************
function colorPion(id)
{
    // vorige id zijn classe verwijderen
    if(vorigeId!="")
    {
        // call jquery method
        $("#"+vorigeId.toString()).removeClass("shadow");
    }
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
    // plaats maken
    var kolomEnRij = kolom.toString() + ";" + rij.toString();
    // plaats van Id nemen
    var plaatsId = plaatsen[vorigeId];
    // bool maken
    var hoortErbij = false; var kanBewegen = false;
    //*************<kijken of het gaat om een pion of plaats>*************
    for(i=0;i<plaatsen.length;i++)
    {
        // kijken of het overeen komt
        if(plaatsen[i]==kolomEnRij) {hoortErbij=true;break;}
    }
    // check bool
    if(!hoortErbij)
    { 
        // door array lopen
        for(i=0;i<arrayMogelijkePlaatsen.length;i++)
        {
            // ieder appart checken
            if(kolomEnRij==arrayMogelijkePlaatsen[i]) {kanBewegen=true;break;}
        }
        
        // wanneer men de pion toelaat om te bewegen
        if(kanBewegen)
        {
            // in array steken
            var array1 = plaatsId.split(";"); var array2 = kolomEnRij.split(";");
            // top instellen
            var top = parseFloat($("#"+vorigeId).css('top').replace(/[^-\d\.]/g, ''));
            // left instellen
            var left = parseFloat($("#"+vorigeId).css('left').replace(/[^-\d\.]/g, ''));
            // wanneer men de pion voor de eerste keer beweegt
            if(!isbegonnen)
            {
                // change bool
                isbegonnen = !isbegonnen;
                // basic var maken
                basic = top * 2;
                // naar float omzetten
                basic = parseFloat(basic);
            }
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
            plaatsen[vorigeId] = kolomEnRij;
            
            // andere speler aan de beurt
            player1AanDeBeurt = !player1AanDeBeurt;
            
        }
    }
} 
function veranderKleur(kleur)
{
    //*********<kleuren terug normaal zetten>*********
    for(i=0;i<arrayMogelijkePlaatsen.length;i++)
    { 
        // id nemen
        var id = document.getElementById(arrayMogelijkePlaatsen[i]);
        // als id bestaat moet de kleur veranderd worden
        if(id!=null)
        { 
           // kleur aanpassen
           document.getElementById(arrayMogelijkePlaatsen[i]).style.backgroundColor = kleur;   
        }
    }
}
//********************<function>********************
function check(array,player,plaatsPion)
{
    // use function
    veranderKleur("#BA7A3A");
    // array leeg maken
    arrayMogelijkePlaatsen = [];
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
    for(i=0;i<specialePionnen.length;i++)
    {
        if(vorigeId==specialePionnen[i]) {bool5==false;break;}
    }
    // wanneer het over een normaal pion gaat
    if(bool5){seePlaces(player,getal1,getal2);}
    // wanneer het over een speciaal pion gaat
    else
    {
        
    }
    // kijken of onze waarde er tussen ligt
    for(i=0;i<arrayMogelijkePlaatsen.length;i++)
    {
        // break code wanneer men een waarde heeft gevonden
        if(plaats == arrayMogelijkePlaatsen[i]) 
        {   
            // bool op true
            bool4 = true;
            // stop code
            break;
        }
    }
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
        if(player1AanDeBeurt== false && index > -1)
        {
            // wanneer er een pion van de tegenstander zich op de plaats bevindt 
            if(index >=0 && index <13){aanwezigePionnen.push(arrayMogelijkePlaatsen[i]);}
            // plaats leeg maken
            arrayMogelijkePlaatsen[i] = "";
        }
        // wanneer player 1 aan de beurt is 
        if(player1AanDeBeurt== true && index > -1)
        {
            // wanneer er een pion van de tegenstander zich op de plaats bevindt 
            if(index >=12 && index <25){aanwezigePionnen.push(arrayMogelijkePlaatsen[i]);}
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
                    // kolom min 1
                    kolomGetal = parseInt(kolomGetal) - 1;
                    // rij plus 1
                    rijGetal = parseInt(rijGetal) + 1;
                }
                // als men naar boven en naar en naar links gaat 
                if(gaatnaarboven == true && gaatnaarlinks == true)
                {
                    // kolom min 1
                    kolomGetal = parseInt(kolomGetal) - 1;
                    // rij min 1
                    rijGetal = parseInt(rijGetal) - 1;
                }
                // als men naar beneden en naar en naar links gaat 
                if(gaatnaarboven == false && gaatnaarlinks == true)
                {
                    // kolom plus 1
                    kolomGetal = parseInt(kolomGetal) + 1;
                    // rij min 1
                    rijGetal = parseInt(rijGetal) - 1;
                }
                // als men naar beneden en naar en naar rechs gaat 
                if(gaatnaarboven == false && gaatnaarlinks == false)
                {
                    // kolom plus 1
                    kolomGetal = parseInt(kolomGetal) + 1;
                    // rij plus 1
                    rijGetal = parseInt(rijGetal) + 1;
                }
            }
            // index maken van de plaats
            var index = plaatsen.indexOf(kolomGetal.toString()+";"+ rijGetal.toString());
            // code wordt een keer op de twee uitvoerd 
            if(bool)
            {
                // als er geen pion op dat veld staat
                if(index== -1){gaDoor = true; }
                // bool veranderen om volgende keer andere code uit te voeren
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
                    if(index== -1){ pad.push(kolomGetal.toString()+";"+ rijGetal.toString());}
                    // zo niet stoppen we de while lus
                    else{ gaDoor = true;}
                    // bool veranderen om volgende keer andere code uit te voeren
                    bool = true;
                } 
            }
        }
        // als men een pad heeft voegt men de laatste plaats in de array
        if(pad.length!=0){ arrayMogelijkePlaatsen.push(pad[pad.length-1]);}    
    }
} 
//********************<vars>************************
var player1AanDeBeurt = false;
var vorigeId = "";
var id = "";
var arrayMogelijkePlaatsen = [];
var specialePionnen = [];
var plaats = "";
var basicLeft = "";
var basic  = "";
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
            // top nemen 
            var top = document.getElementById(vorigeId).style.top;
            // var maken
            var left = "";
            // in array steken
            var array1 = plaatsId.split(";"); var array2 = kolomEnRij.split(";");
            // wanneer men de pion voor de eerste keer beweegt
            if(top == "")
            {
                // top nemen van css
                top  = parseFloat($(".dameBlanche").css('top').replace(/[^-\d\.]/g, ''));
                // basic var maken
                basic = top * 2;
                // naar float omzette,
                basic = parseFloat(basic);
                // left een waarde geven
                left = parseFloat(top);
            }
            // wanneer de pion naar boven moet
            if(array1[0] > array2[0]){ top = top - basic;}
            // wanneer de pion naar beneden moet
            if(array1[0] < array2[0]){ top = top + basic;}
            // wanneer de pion naar rechts moet
            if(array1[1] < array2[1]){ left = left + basic;}
            // wanneer de pion naar links moet
            if(array1[1] > array2[1]){ left = left - basic;}
            // andere speler aan de beurt
            player1AanDeBeurt = !player1AanDeBeurt;
            // use function
            veranderKleur("#BA7A3A");
            // gele schadow weg doen
            $("#"+vorigeId).removeClass("shadow");
            // pion bewegen
            $("#"+vorigeId).animate({top: top, left : left});
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
    // array maken
    var mogelijkeIds = [];
    // kijken of er pionnen staan op het veld
    for(i=0;i<plaatsen.length;i++)
    {
        // elke pion vergelijken
        for(b=0;b<arrayMogelijkePlaatsen.length;b++)
        {
            if(plaatsen[i]==arrayMogelijkePlaatsen[b]) {mogelijkeIds.push(i);}
        }
    }
    //******************<als player 1 aan de beurt is>******************
    if(player1AanDeBeurt)
    {
        // door de array gaan
        for(d=0;d<mogelijkeIds.length;d++)
        {
            // als er een pion op de mogelijke plaats is
            if(mogelijkeIds[d]>=1 && mogelijkeIds[d] <13)
            {
                // element uit array nemen
                var data = plaatsen[mogelijkeIds[d]];
                // index ervan nemen
                var index = arrayMogelijkePlaatsen.indexOf(data);
                // uit de array gooien
                arrayMogelijkePlaatsen.splice(index,1);
            }
        }
    }
    //******************<als player 2 aan de beurt is>******************
    else
    {
        // door de array gaan
        for(d=0;d<mogelijkeIds.length;d++)
        {
            // als er een pion op de mogelijke plaats is
            if(mogelijkeIds[d]>=13 && mogelijkeIds[d] <25)
            {
                // element uit array nemen
                var data = plaatsen[mogelijkeIds[d]];
                // index ervan nemen
                var index = arrayMogelijkePlaatsen.indexOf(data);
                // uit de array gooien
                arrayMogelijkePlaatsen.splice(index,1);
            }
        }
    }
    // use function
    veranderKleur("#cc0000");
}
//********************<function>********************
function seePlaces(player,getal1,getal2)
{
    // ++ of --
    if(player){getal2++; getal1++;} else{getal2--; getal1--;}
    // in array pushen
    arrayMogelijkePlaatsen.push(getal1+";"+getal2);
    // plus twee
    if(player){getal2 = getal2-2;} else {getal2 = getal2+2;}
    // in array pushen
    arrayMogelijkePlaatsen.push(getal1+";"+getal2);
}
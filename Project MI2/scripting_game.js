//********************<vars>************************
var player1AanDeBeurt = false;
var vorigeId = "";
var id = "";
//********************<function>********************
function press(id)
{
    // parse int
    id = parseInt(id);
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
}
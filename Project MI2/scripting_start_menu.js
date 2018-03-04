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
}
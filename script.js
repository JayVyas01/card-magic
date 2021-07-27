var page = 1

var selected = [0,0,0,0];
var images;
var fifth_card;
/*$(document).ready(function(){
     get_images();
    console.log(images);
    render_page(images, page); 
    set_button_function(images,page);
});


function get_images(){
    var image_files;
    var url = "/getimages";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() { 
        if (request.readyState == 4 && request.status == 200)
        {
            image_files = JSON.parse(request.responseText)["image_files"];
            render_page(image_files,page);
        }    
    }
    request.open("GET", url, true); // true for asynchronous 
    request.send(null);
}*/

function magic()
{
    var string = ''; 
    var url = "/getselected";
    var selected_images = httpGet(url);
    selected_images = JSON.parse(selected_images)["selected_images"];
    string = '<h1>ABRA KADABRA</h1>';
    string += '<div class="row"  id = "row">';
    for(var k = 0; k < selected_images.length; ++k)  
        string+= '<div class="col-2 col-sm-2"><div class="card"><img src="img/'+ selected_images[k]+ '"class="card-img-top" alt="..." ></div></div>' 
    string+= '<div class="col-2 col-sm-2"></div>' 
    string += '<div class="col-2 col-sm-2"><div class="card"><img src="backside.png" class="card-img-top" alt="" id = "fifth_card"><div class="card-body"><div class="d-grid gap-2"><button class="btn btn-primary" type="button" id = "reveal">Reveal</button></div></div></div></div>'
    string += '</div>'
    $(".images").html(string)
}

function render_page(images, page){
    if (page >= 5){
         magic();
    }
    else{
        var total = images.length;
        var rows = (total/6 - total/6 % 1)
        var string = '';
        var k = 0;
        string+= '<h1>Select Card Number : '+ page +' </h1>';
        for(var i = 0; i < rows; ++i){
            string += '<div class="row"  id = "row">';
            for(var j =0 ; j < 6; ++j){
                string += '<div class="col-2 col-sm-2"><div class="card"><img src="img/'+ images[k]+ '"class="card-img-top" alt="..." id = "image_'+k+'"><div class="card-body"><div class="d-grid gap-2"><button class="btn btn-primary" type="button" id = "button_'+ k +'">Select</button></div></div></div></div>';
                k += 1;
            }
            string += '</div>';
        }
        if (k < total){
            string += '<div class="row"  id = "row">';
            while(k<total)
            {
                string += '<div class="col-2 col-sm-2"><div class="card"><img src="img/'+ images[k]+ '"class="card-img-top" alt="..."id = "image_'+k+'"><div class="card-body"><div class="d-grid gap-2"><button class="btn btn-primary" type="button"  id = "button_'+ k +'">Select</button></div></div></div></div>';
                k += 1;
            }
            string += '</div> <div id = "rendered"></div>';
        }
        $(".images").html(string);
    }
}
 
//console.log($(document).isready())*/


/*function hook()
{
    for(var i = 0; i< 52-page; ++i)
    {
        var button_id = 'button_'+ i;
        console.log(typeof(button_id));
        document.getElementById(button_id).addEventListener(onclick, select_image());
    }
}


//$(".rendered").ready(hook());

set_button_function();

function set_button_function()
{
    var image_files;
    var url = "/getimages";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() { 
        if (request.readyState == 4 && request.status == 200)
        {
            image_files = JSON.parse(request.responseText)["image_files"];
            hook(image_files);
        }    
    }
    request.open("GET", url, true); // true for asynchronous 
    request.send(null);

}


function hook(image_files){
    for(var i = 0; i< image_files.length; ++i)
    {
        document.getElementById('button_'+ i).addEventListener("click", select_image);
    }
}

function select_image()
{
    var id = this.id
    id = id.split("_")[1]
    var delete_id_url = "/delete/"+id;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() { 
        if (request.readyState == 4 && request.status == 200)
        {
            image_files = JSON.parse(request.responseText)["image_files"];
            console.log(image_files)
        }    
    }
    request.open("DELETE", delete_id_url, true); // true for asynchronous 
    request.send(null);
    
}*/

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

images = httpGet("/getimages");
images = JSON.parse(images)["image_files"]

render_page(images, 1);


function putimages(images){
    for(var i = 0; i< images.length; ++i){
        var id  = "image_"+i
        document.getElementById(id).src = "img/"+ images[i];
    }
}
//putimages(images);

function hook(images){
    for(var i = 0; i< images.length; ++i)
    {
        document.getElementById('button_'+ i).addEventListener("click", select_image);
    }
}

hook(images);

function select_image(){
    var id = this.id
    id = id.split("_")[1]
    console.log(images[Number(id)])
    url = "/delete/"+id;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", url, false ); // false for synchronous request
    xmlHttp.send( null );
    var responce =  xmlHttp.responseText
    images = JSON.parse(responce)["image_files"];
    page += 1
    render_page(images, page);
    if (page<5)
    {
        putimages(images);
        hook(images);
    }
    if (page == 5)
    {
        press_reveal();
    }
}

function reveal_card() {
    fifth_card = httpGet("/reveal")
    fifth_card = JSON.parse(fifth_card)["fifth_card"]
    document.getElementById("fifth_card").src = 'img/'+ fifth_card;
}

function press_reveal()
{
    document.getElementById("reveal").addEventListener("click", reveal_card)
}



/*function(){
selected[page-1] = images[i];
images.splice(i,1);
page += 1;
render_page(images, page);
console.log(button_id);
}*/
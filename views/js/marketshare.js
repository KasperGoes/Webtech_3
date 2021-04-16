/*     
    Role && functionality: 
    In this javascript file we make the marketshare page interactive. 
    We do this by creating a button that shows a video when you click it
*/

//we create a variable for the video-content and the button by
var content = document.getElementById('play-video')
var button = document.getElementById('button')

/*
    When the user clicks on the button, we first check if the video is already
    open. if it is we change the classname of the video. This corresponds to a css
    method which shrinks the file. If the video is not open, we de the same but
    opposite.
*/
button.onclick = function(){
    if(content.className == "open"){
        //schrink the video
        content.className = "";
        button.innerHTML = "Watch Video"
    }    else{
        //expand the video
        content.className = "open";
        button.innerHTML = 'Have Fun!';
    }
};

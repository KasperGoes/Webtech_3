/*     
    Role && functionality: 
    In this javascript file we make every html page interactive by
    giving the user the option to style different parts of the page in whatever 
    way they want. 
*/

var menu1 = document.getElementById('element-select')
var elementarray = []
elementarray.push(document.getElementsByTagName('body'));
elementarray.push(document.getElementsByTagName('header'));
elementarray.push(document.getElementsByTagName('footer'));
elementarray.push(document.getElementsByTagName('article'));
elementarray.push(document.getElementsByTagName('section'));

// Make select-element-menu and fill it with options
for (var i = 0; i<elementarray.length; i++){
    if (elementarray[i].length > 1) {
        for (var j = 0; j<elementarray[i].length; j++){
            var newoption = document.createElement('option');
            newoption.value = elementarray[i][j].tagName + j;
            var textoption = document.createTextNode(elementarray[i][j].tagName + j);
            newoption.appendChild(textoption);
            if (newoption.text != "SECTION0")
                {menu1.appendChild(newoption);}
        }}
    else{
            var newoption = document.createElement('option');
            newoption.value = elementarray[i][0].tagName;
            var textoption = document.createTextNode(elementarray[i][0].tagName);
            newoption.appendChild(textoption);
            menu1.appendChild(newoption);
    }
}



var menu2 = document.getElementById('style-select');
var color1 = document.createElement('option');
color1.value = 'blue';
coloroption1 = document.createTextNode('blue');
color1.appendChild(coloroption1);
menu2.appendChild(color1);

var color2 = document.createElement('option');
color2.value = 'red';
coloroption2 = document.createTextNode('red');
color2.appendChild(coloroption2);
menu2.appendChild(color2);

var color3 = document.createElement('option');
color3.value = 'green';
coloroption3 = document.createTextNode('green');
color3.appendChild(coloroption3);
menu2.appendChild(color3);

var color4 = document.createElement('option');
color4.value = 'yellow';
coloroption4 = document.createTextNode('yellow');
color4.appendChild(coloroption4);
menu2.appendChild(color4);

var color5 = document.createElement('option');
color5.value = 'black';
coloroption5 = document.createTextNode('black');
color5.appendChild(coloroption5);
menu2.appendChild(color5);

var menu3 = document.getElementById('size-select');
var size1 = document.createElement('option');
size1.value = 'xx-small';
sizeoption1 = document.createTextNode('xx-small');
size1.appendChild(sizeoption1);
menu3.appendChild(size1);

var size2 = document.createElement('option');
size2.value = 'small';
sizeoption2 = document.createTextNode('small');
size2.appendChild(sizeoption2);
menu3.appendChild(size2);

var size3 = document.createElement('option');
size3.value = 'medium';
sizeoption3 = document.createTextNode('medium');
size3.appendChild(sizeoption3);
menu3.appendChild(size3);

var size4 = document.createElement('option');
size4.value = 'large';
sizeoption4 = document.createTextNode('large');
size4.appendChild(sizeoption4);
menu3.appendChild(size4);

var size5 = document.createElement('option');
size5.value = 'xx-large';
sizeoption5 = document.createTextNode('xx-large');
size5.appendChild(sizeoption5);
menu3.appendChild(size5);

var gobutton = document.getElementById('changestyle');
gobutton.addEventListener('click',gobuttonchrome);

// Add class to selected element
function gobuttonchrome(){
    var element = document.getElementById('element-select').value;
    if (isNaN(parseInt(element.slice(-1)))){
        var editelement = document.getElementsByTagName(element);
        editelement[0].classList.add(document.getElementById('style-select').value);
        editelement[0].classList.add(document.getElementById('size-select').value);
    }
    else{
        var editelement = document.getElementsByTagName(element.substring(0, element.length-1));
        var newel = editelement[parseInt(element.slice(-1))]
        newel.classList.add(document.getElementById('style-select').value);
        newel.classList.add(document.getElementById('size-select').value);
    }

}

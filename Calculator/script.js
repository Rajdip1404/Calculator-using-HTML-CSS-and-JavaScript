let input = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
let string = "";
let lastOutput = "";

input.addEventListener('focus', function() {
    setCursorToEnd(input);
  });
  
setCursorToEnd(input);

//let arr = Array.from(buttons);
buttons.forEach(function(btn){
    btn.addEventListener('click', function(e){
        if(e.target.className == "number" || e.target.className == "bracket"){
            console.log(e.target);
            string = string + e.target.innerHTML;
            input.value = string;
        }
        else if(e.target.className == "pi"){
            string = string + 3.14159265359;
            input.value = string;
        }
        else if(e.target.className == "operator"){
            if(string != ""){
                string = string + " " + e.target.innerHTML + " ";
                input.value = string;
            }
            else if(lastOutput != ""){
                string = lastOutput + " " + e.target.innerHTML + " ";
                input.value = string;
            }
        }
        else if(e.target.id == "power"){
            string = string + "^";
            input.value = string;   
        }
        else if(e.target.className == "AC"){
            string = "";
            lastOutput = "";
            input.value = string;   
        }
        else if(e.target.className == "DEL"){
            if(string.charAt(string.length-1) === " ") {
                string = string.substring(0, string.length-3);
            }
            else {
                string = string.substring(0, string.length-1);
            }
            input.value = string;   
        }
        else if(e.target.className == "answer"){
            string = lastOutput;
            input.value = string;   
            string = "";
        }

        else if(e.target.className == "equal"){
            evaluateExpression();
        }
    })
})


function evaluateExpression(){
    try {
      string = string.replace("%", "/100");
      if (string.indexOf("^") != -1) {
        //string = string.eval(string)
        temp = string.substring(0, string.indexOf("^"));
        number = eval(temp);
        power = string.substring(string.indexOf("^") + 1, string.length);
        string = Math.pow(number, power);
      }
      input.value = eval(string);
      lastOutput = eval(string);
      string = "";
    } catch (error) {
      string = "Invalid Expression";
      input.value = string;
      string = "";
    }
}

function setCursorToEnd(input) {
    // Set cursor position to the end
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }

// let key = document.querySelector()
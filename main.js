console.log("JS here");
let responseText = document.getElementById('responseText');
responseText.style.background = "rgb(37, 36, 36)";
// responseText.style.background = "black";
responseText.style.color = "white";

//Functio to convert a string into a div containing that string
function stringToDiv(string) {
    let div = document.createElement('div');
    div.innerHTML += string;
    return div.firstElementChild;
}

//hiding the parameter box initially
const parametersBox = document.getElementById('parametersBox');
const requestJsonBox = document.getElementById('requestJsonBox');
parametersBox.style.display = "none";

const paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    parametersBox.style.display = "block";
    requestJsonBox.style.display = "none";
})

const jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "block";
})

// initialling addedParamCount
let addedParamCount = 0;
const addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let str = `<div class="form-row row my-3">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary col-md-1 deleteParam" style="width: 3rem; margin-left: 1rem;"><b>-</b></button>
                </div>`;
    let newDiv = stringToDiv(str);
    params.appendChild(newDiv);
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

let submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {

    // e.preventDefault();
    let url = document.getElementById('url').value;
    let responseText = document.getElementById('responseText');
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    if (url == "") {
        responseText.classList.add('text-center');
        responseText.value = "Enter URL first";
    }
    else {
        responseText.value = "";
        responseText.value = "Please wait a sec..";
        responseText.classList.remove('text-center');
        let data = {};
        if (contentType == 'params') {
            for (let i = 0; i < addedParamCount + 1; i++) {
                if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                    let key = document.getElementById('parameterKey' + (i + 1)).value;
                    let value = document.getElementById('parameterValue' + (i + 1)).value;
                    data[key] = value;
                }
            }
            data = JSON.stringify(data);
        }
        else {
            data = document.getElementById('requestJsonText').value;
        }
        if (requestType == "GET") {
            fetch(url, {
                method: 'GET'
            })
                .then(response => response.text())
                .then(text => {
                    responseText.value = text;
                })
        }
        else {
            fetch(url, {
                method: 'GET',
                body: data,
                headers: {
                    "Content-type": "application/json;charset=UTF-8"
                }
            })
                .then(response => response.text())
                .then(text => {
                    responseText.value = text;
                }).catch(e => {
                    console.log(e);
                })
        }
    }
})
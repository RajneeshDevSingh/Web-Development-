

// initially  box hide
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = "none";

let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click" , ()=>
{
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById('parametersBox').style.display ="block";

})

let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", ()=>
{
    document.getElementById('parametersBox').style.display ="none";
    document.getElementById('requestJsonBox').style.display ="block";
})


// for + button 

let addedParamCount = 0;
let addParam = document.getElementById("addParam");
addParam.addEventListener("click" , ()=>
{
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                    </div>`;
    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // - delete
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // TODO: add a confirmation box to confirm parameter deletion
            e.target.parentElement.remove();
        })
    }
            addedParamCount++;

 })

 // get ele from string 
 function getElementFromString(string)
 {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
 }



 // If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name ='requestType']:checked").value;
    let contentType = document.querySelector("input[name ='contentType']:checked").value;


    if (contentType == 'params') {
        data = {};
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

    console.log(url)
    console.log(requestType)
    console.log(contentType)
    console.table(data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }

    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });

    }



})

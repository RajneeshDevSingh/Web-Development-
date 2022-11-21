let addBtn = document.querySelector(".add-btn");

let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector('.main-cont');
let toolBoxColors = document.querySelectorAll('.color'); // filter 


let colors = ["lightpink", "lightgreen","lightblue",  "black"];
let modalPriorityColor = colors[colors.length-1];

let allPriorityColors = document.querySelectorAll(".priority-color");
let textAreaCont = document.querySelector('.textarea-cont');
let removeBtn = document.querySelector('.remove-btn')
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";
let removeFlag = false;

let ticketsArr = []  // which will store all the tickets as objects



// get all tickets from local Storage

if(localStorage.getItem('tickets')){
  ticketsArr = JSON.parse(localStorage.getItem('tickets'))
  ticketsArr.forEach(function(ticket){
    createTicket(ticket.ticketColor , ticket.ticketTask , ticket.ticketID)
  })
}


// for Filtering the ticket with respect to color

for(let i = 0; i<toolBoxColors.length;i++)
{
  toolBoxColors[i].addEventListener('click',function(event)
  {
      let currentToolBoxColor = toolBoxColors[i].classList[0]
     // console.log(currentToolBoxColor); 
     let filteredTickets = ticketsArr.filter(function (ticketObj) {
      return currentToolBoxColor === ticketObj.ticketColor;
    });

    // remove  previous tickets 
    let allTickets = document.querySelectorAll(".ticket-cont"); // in ticket modal , for all ticket Container

    for (let i = 0; i < allTickets.length; i++) {
      allTickets[i].remove();
    }

     // filtered tickets  ID
     filteredTickets.forEach(function (filteredObj) {
      createTicket(
        filteredObj.ticketColor,
        filteredObj.ticketTask,
        filteredObj.ticketID
      );
    });
  }
  )




  toolBoxColors[i].addEventListener('dblclick', function(e)
  {
    let allTickets = document.querySelectorAll(".ticket-cont");
    for(let i = 0; i < allTickets.length; i++) {
      allTickets[i].remove();
    }
    ticketsArr.forEach(function(ticketObj)
    {
      createTicket(ticketObj.ticketColor , ticketObj.ticketTask , ticketObj.ticketID)
     
    })

  })

}

let addFlag = false
addBtn.addEventListener("click", function (event) {
    //Display the Modal
  
    // addFlag , true - Modal Display
    //addFlag , false - Modal Hide
  
    addFlag = !addFlag;
  
    if (addFlag == true) {
      modalCont.style.display = "flex";
    } else {
      modalCont.style.display = "none";
    }
  });



  //changing Prority Colors in Creating task
  allPriorityColors.forEach(function (colorElem) {
    colorElem.addEventListener("click", function (e) 
    {
      allPriorityColors.forEach(function (priorityColorElem) {
        priorityColorElem.classList.remove("active");
      });
      colorElem.classList.add("active");
  
      modalPriorityColor = colorElem.classList[0];   // for task to ticket color 

    });
  });




// genetrating a ticket 

modalCont.addEventListener("keypress" , function(event)
{
    let key = event.key
    if(key == 'Enter')
    {                                                       //, shortid() removed  here line 98
        createTicket(modalPriorityColor, textAreaCont.value ); // this function will generate the ticket
        modalCont.style.display = 'none';
        addFlag = false;   // for single click only 
        textAreaCont.value = ' '; // for next time empty textfield will open
    }
})

function createTicket(ticketColor , ticketTask , ticketID)
{
  let id = ticketID || shortid()   // 
    let ticketCont = document.createElement('div');

    ticketCont.setAttribute('class' , 'ticket-cont' )

    ticketCont.innerHTML= `<div class="ticket-color ${ticketColor} "></div>
    <div class="ticket-id">#${id}</div>
    <div class="task-area "> ${ticketTask} </div>
    <div class="ticket-lock">
    <i class="fa-solid fa-lock"></i></div>
    `;
    mainCont.appendChild(ticketCont);
    handleRemove(ticketCont , id);
    handleLock(ticketCont , id);
    handleColor(ticketCont , id);
    if(!ticketID)
      {
        ticketsArr.push({ticketColor , ticketTask , ticketID : id});
        localStorage.setItem('tickets' , JSON.stringify(ticketsArr))
      }
    
}


removeBtn.addEventListener('click' , function()
{
    removeFlag = !removeFlag;
    if(removeFlag == true)
        {
            
            removeBtn.style.color = 'red';
        }
        else
        {
            removeBtn.style.color = 'white';
        }
})

// get ticket id for local storage removal
function getTicketIdx(id)
{
  let ticketIdx  = ticketsArr.findIndex(function(ticketObj)
  {
    return ticketObj.ticketID === id;
  })

  return ticketIdx;
}


// remove ticket handle  
function handleRemove(ticket , id)
{
    ticket.addEventListener('click' , function()
    {
        // if(removeFlag == true)
        // {
        //     ticket.remove();
        // }

        if(!removeFlag) return
        let idx = getTicketIdx(id)
        // local storage removal ticket
        ticketsArr.splice(idx , 1)                //   if i want to remove item from array randmely ; splice();
        let strTicketArray = JSON.stringify(ticketsArr);
        localStorage.setItem('tickets' , strTicketArray);
        
        ticket.remove();
    })
}

//// Lock and unlock Tickets
function handleLock(ticket , id ) {
  let ticketLockElem = ticket.querySelector(".ticket-lock");

  let ticketLock = ticketLockElem.children[0];

  let ticketTaskArea = ticket.querySelector('.task-area')

  ticketLock.addEventListener("click", function (e) {
    let ticketIdx = getTicketIdx(id)

    if (ticketLock.classList.contains(lockClass)) {
      ticketLock.classList.remove(lockClass);
      ticketLock.classList.add(unlockClass);
      ticketTaskArea.setAttribute('contenteditable' , 'true')

    } else {
      ticketLock.classList.remove(unlockClass);
      ticketLock.classList.add(lockClass);
      ticketTaskArea.setAttribute('contenteditable' , 'false')
    }

    ticketsArr[ticketIdx].ticketTask = ticketTaskArea.innerText;
    localStorage.setItem('tickets' , JSON.stringify(ticketsArr));


  });
}


function handleColor(ticket , id)
{
  let ticketColorband = ticket.querySelector('.ticket-color');
  ticketColorband.addEventListener('click' , function(event)
  {
    let ticketIdx = getTicketIdx(id);
    let currentTicketColor = ticketColorband.classList[1];
    let currentTicketColoridx = colors.findIndex(function(color) //  like higher order function 
    {
      return currentTicketColor === color;

    })

    currentTicketColoridx++;
    let newTicketColorIdx  = currentTicketColoridx % colors.length;  
    let newTicketColor = colors[newTicketColorIdx];

    ticketColorband.classList.remove(currentTicketColor);
    ticketColorband.classList.add(newTicketColor);

    // modify with new color ; 
    ticketsArr[ticketIdx].ticketColor = newTicketColor
    localStorage.setItem('tickets' , JSON.stringify(ticketsArr));
  })
}




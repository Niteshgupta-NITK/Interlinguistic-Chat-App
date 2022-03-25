

const socket = io();

//Elements
const $messageForm = document.querySelector("#msg-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendlocationButton = document.querySelector("#send-location");
const $messeges = document.querySelector("#messages");

//templates

const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;
//Options
const { username , room } =Qs.parse(location.search,{ignoreQueryPrefix:true});

// autoscrolling function
const autoscroll =()=>{
    const $newMessage =$messeges.lastElementChild;
    const newMessageStyles= getComputedStyle($newMessage);
    const newMessageMargin= parseInt(newMessageStyles.marginBottom);
    const newMessageHeight =$newMessage.offsetHeight+ newMessageMargin;


   const visibleHeight=$messeges.offsetHeight;
   const containerHeight= $messeges.scrollHeight;

   const scrollOffset= $messeges.scrollTop+ visibleHeight;
   if(containerHeight-newMessageHeight<=scrollOffset){
      $messeges.scrollTop= $messeges.scrollHeight;
   }
}



socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username:message.username,
    message:message.text,
    createdAt: moment(message.createdAt).format('h:mm a')
  });
  $messeges.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("locationmessage", (url) => {
  console.log(url);
  const html=Mustache.render(locationTemplate,{
    username:url.username,
    url:url.text,
    createdAt: moment(url.createdAt).format('h:mm a')
  });
  $messeges.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on('roomData',({users,room})=>{
 const html= Mustache.render(sidebarTemplate,{
   room,
   users
 });
 document.querySelector('#sidebar').innerHTML=html;
})



document.querySelector("#msg-form").addEventListener("submit", (e) => {
  e.preventDefault();
  $messageFormButton.setAttribute("disabled", "disabled");
  const msg = e.target.elements.message.value;
  socket.emit("SendMessage", msg, (err) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (err) return console.log("error");
    console.log("Delievered");
  });
});

$sendlocationButton.addEventListener("click", (e) => {
  $sendlocationButton.setAttribute("disabled", "disabled");
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        $sendlocationButton.removeAttribute("disabled");
        console.log("Location Shared!");
      }
    );
  });
});



socket.emit('join',{username,room},(error)=>{
   if(error){
     alert(error);
     location.href='/' 
   }
});
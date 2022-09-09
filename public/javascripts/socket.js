$(function(){
    //socket io
   // let socket = new io(":3200");
    const socket = io(":3200",{
        transports: ['websocket']
      });
    socket.on('connect', () => {
        console.log("socket connection established");
        socket.emit('send-message', "Hello World");
    });
    socket.on('message', (message)=>{
        let date =new Date(),
         item = $('article .chat-content').first().clone();
         item.removeClass('d-none');
        item.find('p').text(message);
        item.find('span.time-left').text(date.getHours()+':'+date.getMinutes());
        item.appendTo(".chat-main");
    });
    $("#send").on('click',function(){
        let msg=$("#msg").val();
        socket.emit('message',msg);
    });
    
    //socket end
});
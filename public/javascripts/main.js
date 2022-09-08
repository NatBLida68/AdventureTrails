console.log("main.js is loaded");

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
        alert(message);
    });
    socket.emit('hello','wooww !');
    
    //socket end

    $("td.user").find(".btn-del").on("click",function(){
     let id=$(this).attr('oid');
     sendData("/me/delete/user",{id:id}); //delete
    });

    $("td.user").find(".btn-update").on("click",function(){    
        let id=$(this).attr('oid'),
        tr =$(this).closest('tr');
        userName=tr.find("td.name").text(),
        email=tr.find("td.email").text();
        let myModel = $('#myModal');
       myModel.modal('show');
       myModel.find("input#id").val(id);
       myModel.find("input#username").val(userName);
       myModel.find("input#email").val(email);
       //show model with data in input
       bindEvents();
       });

       $('#registerForm').on('click',function(){
        
        passwd = $("input#passwd").val(),
        userName = $("input#username").val(),
        email = $("input#email").val();
        _csrf =$("input#_csrf").val();
        let data = {passwd:passwd,userName:userName,email:email,_csrf:_csrf};
            sendData("/me/register",data); //update
        });

    function sendData(url,data)
    {
        $.ajax({
            type: "POST",
            url: url,
            data:data,
            dataType: 'json',
            success: function(){
                modelSuccess();
            },
            error: function(){
               alert('something went wrong');
            }
            });
    }

    function bindEvents() //model related functions
    {
        $("#close").on('click',function(){
            $('#myModal').modal('hide');
        });
        $("#save").on('click',function(){
            let myModel = $('#myModal'),
       id = myModel.find("input#id").val(),
       userName = myModel.find("input#username").val(),
       email = myModel.find("input#email").val();
       let data = {id:id,userName:userName,email:email};
           sendData("/me/update/user",data); //update
        })

    }
   
    function modelSuccess()
    {
        let myModel = $('#myModal');
                myModel.modal("show");
                myModel.find(".modal-body").html("success");
                myModel.find("button#save").addClass("d-none");
                myModel.find("button#close").on('click',function(){
                  //  window.location.reload();
                });
    }

//file upload
$('input[type=file]').on('change',function(e) {
    $in = $(this);
    $in.next().html($in.val());
});

$('#file-upload').on('click',function() {
    var fileName = $("#fileUpload").val();
    if (fileName) {
        alert(fileName + " can be uploaded.");
        $("#fileuploadForm").trigger('submit');
    }
    else {
        alert("Please select a file to upload");
    }
});

   });
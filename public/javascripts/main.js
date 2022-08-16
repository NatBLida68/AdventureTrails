console.log("main.js is loaded");

$(function(){

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
       });

       $('#modelTrigger').on('click',function(){
        alert("btn click")
        $('#myModal').modal('show')
        });

    function sendData(url,data)
    {
        $.ajax({
            type: "POST",
            url: url,
            data:data,
            dataType: 'json',
            success: function(){
                console.log('success');
                window.location.reload();
            },
            error: function(){
               alert('something went wrong');
            }
            });
    }
   
   });
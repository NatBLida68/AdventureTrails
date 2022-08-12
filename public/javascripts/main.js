console.log("main.js is loaded");

$(function(){

    $("td.user").find(".btn-del").on("click",function(){
     let id=$(this).attr('oid');
     sendData("/me/delete/user",{id:id})
    });

    $("td.user").find(".btn-update").on("click",function(){
        let id=$(this).attr('oid');
        sendData("/me/update/user",{id:id})
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
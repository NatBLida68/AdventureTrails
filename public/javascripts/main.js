console.log("main.js is loaded");
$(function(){

    $("td.user").find(".btn-del").on("click",function(){
     let id=$(this).attr('id');
     $.ajax({
        type: "POST",
        url: "/me/delete/user",
        data:{id:id},
        dataType: 'json',
        success: function(){
            console.log('success');
            window.location.reload();
        },
        error: function(){
           alert('something went wrong');
        }
        });
    })
   
   });
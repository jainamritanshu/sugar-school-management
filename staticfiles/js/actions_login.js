jQuery(document).ready(function ($) {
  $("#forgotPasswordForm").hide();

  //login submit
  $("#loginForm").submit(function (event) {
    event.preventDefault();
    var data ={};
    $("#loginForm").serializeArray().map(function (ele) {
      data[ele.name]=ele.value;
    });
    $.ajax({
      type:"POST",
      url: "/user/login/",
      data:data,
      // dataType:"json"
    }).done(function(response){
      if(response.error_heading)
        $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong>"+response.error_heading+"</strong></div>");
      else{
        if(data['type'] == 'student')
          window.location.href = '/user/student_dashboard';
        else
          window.location.href = '/user/school_dashboard';
      }
    }).fail(function (xhr, status, error){
      $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong>Oh Snap ! Some error occured <br> Try Again</strong></div>");
    });
  });



  //forgot password
  $("#forgotPasswordForm").submit(function(event){
    event.preventDefault();
    var data={};
    $("#forgotPasswordForm").serializeArray().map(function(ele){
      data[ele.name]=ele.value;
    });
    $.ajax({
      type:'POST',
      url:'/forgotpassword',
      data:JSON.stringify(data),
      dataType:'json'
    }).done(function (response) {
      $(".submitError").html("<div class='alert alert-dismissible alert-info'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong>A new password has been sent to your email</div>");

    }).fail(function (xhr,status,error) {
      $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong>Oops! We encountered an error. <br>Try Again</strong></div>");

    })
  });

  $(document).on('click','#resetPassword',function(event) {
    $("legend.text-info").html("Reset Password");
    $("#loginForm").slideUp();
    $("#forgotPasswordForm").slideDown();
    $(".footer h5").html("<span id='returnBack' style='cursor:pointer'><i class='material-icons' style='font-size:14px'>arrow_back</i> Back</span> ");
  });

  $(document).on('click','#returnBack',function () {
    $("legend.text-info").html("Login");
    $(".submitError").empty();
    $("#forgotPasswordForm").slideUp();
    $("#loginForm").slideDown();
    $(".footer h5").html("Forgot Password ? <span class='text-info' id='resetPassword' style='cursor:pointer'> Click to reset</span>");
  });
});

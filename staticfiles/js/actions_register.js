jQuery(document).ready(function ($) {
  $.material.init();

  var cities=[
    "Delhi",
    "Patna",
    "Jodhpur",
    "Rourkela",
    "Raipur",
    "Jaipur",
    "Kota",
    "Visakhapatnam",
    "Vijaynagram",
    "Sikar",
    "Kolkata",
    "Jhunjhunu",
    "Korba",
    "Muzaffarpur",
    "Varanasi",
    "Bhagalpur",
  ];

  var states=[
    'Delhi',
    'Rajasthan',
    'Haryana',
    'Bihar',
    'Bengal',
    'Uttar Pradesh',
    'Orrisa',
    'Andhra Pradesh',
    'Chhatissgarh'
  ];

  (function(){
    console.log('hi');
    var cityEle="";
    //write call to get cities from backend
    cities.map(function(ele) {
      cityEle += "<option value="+ele+">"+ele+"</option>";
    });
    $("#st_city_sc select,select[name=sc_city]").html(cityEle);
  })();



   (function(){
    console.log('hi');
    var stateEle="";
    //write call to get cities from backend
    states.map(function(ele) {
      stateEle += "<option value="+ele+">"+ele+"</option>";
    });
    $("select[name=sc_state]").html(stateEle);
  })();


  $(document).ready(function() {
    // $(".select").dropdown({"optionClass": "withripple"});
    var res = $(document).find('input');
    console.log(res);
    $("input:not([name=bday])").attr("required", true);
  });

  var schoolsList=[
    'abc',
    'xyz',
    'cdf',
  ]


  //getting schools list based on city selected
  var newele="";
  $(document).on('click','#st_city_sc li.withripple.selected',function (e) {
    var cityName=e.target.innerHTML;
    var data={
      city: cityName
    }
    if(cityName){
      $.ajax({
        type:'POST',
        url:'/user/sc_list/',
        data:data
      }).done(function (response) {
        schoolsList=JSON.parse(response)
        newele=""
        schoolsList.map(function (e) {
          ele=e.fields.sc_name;
          newele += "<option value='"+ele+"' class='selected'>"+ele+"</option>";
        });
        $('#schoolList select').html(newele);
        $('#schoolList').load();
      }).fail(function (xhr, status, error) {
        $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase'>x</button> <strong>Oops!</strong> Could not fetch schools. Select the city again</div>");
        // schoolsList.map(function (ele) {
        //   newele += "<option value="+ele+" class='selected'>"+ele+"</option>";
        // });
        // $('#schoolList select').html(newele);
        // $('#schoolList').load();
      })
  }
  });

  //submit Registration form
  $("#registerForm,#registerSubmit").submit(function (event) {
    event.preventDefault();
    $('#registerSubmit').attr("disabled","disabled");
    var data={};
    var pass,confpass;

    $("#registerForm").serializeArray().map(function (ele) {
      if(ele.name=="st_pass")
      pass=ele.value;
      if(ele.name=="st_conf")
      confpass=ele.value;
      data[ele.name]=ele.value;
    });
    console.log(pass,confpass);
    if(pass!=confpass){
      $('#registerSubmit').removeAttr("disabled");
      $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase'  data-dismiss='alert'>x</button> <strong>Oops!</strong> Password Didnt Match</div>");
    }
    else{
      console.log(JSON.stringify(data));
      $.ajax({
        type:'POST',
        url:'/user/student_register/',
        data:data,
      }).done(function (response) {
        $('#registerSubmit').removeAttr("disabled");
        if(response.error_heading)
          $(".submitError").html("<div class='alert alert-dismissible alert-danger' style='padding: 25px; text-align: center;'><button type='button' class='close' style='text-transform:lowercase'>x</button> <strong>"+response.error_heading+"</strong> </div>");
        else if(response.message){
          $(".submitError").html("<div class='alert alert-dismissible alert-success' style='padding: 25px; text-align: center;'><button type='button' class='close' style='text-transform:lowercase'>x</button> <strong>"+response.message+"</strong> </div>");
          // window.location.reload()
        }

        //response
      }).fail(function (xhr, status, error) {
        $('#registerSubmit').removeAttr("disabled");
        $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase'>x</button> <strong>Oh Snap !Registration Failed</strong> </div>");
      });
    }
});

 //submit Registration form
  $("#schoolRegisterForm,#schoolRegisterSubmit").submit(function (event) {
    event.preventDefault();
    $('#schoolRegisterSubmit').attr("disabled","disabled");
    var data={};
    var pass,confpass;

    $("#schoolRegisterForm").serializeArray().map(function (ele) {
      if(ele.name=="sc_pass")
      pass=ele.value;
      if(ele.name=="sc_conf")
      confpass=ele.value;
      data[ele.name]=ele.value;
    });
    console.log(pass,confpass);
    if(pass!=confpass){
      $('#schoolRegisterSubmit').removeAttr("disabled");
      $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase'  data-dismiss='alert'>x</button> <strong>Oops!</strong> Password Didnt Match</div>");
    }
    else{
      console.log(JSON.stringify(data));
      $.ajax({
        type:'POST',
        url:'/user/school_register/',
        data:data,
      }).done(function (response) {
        $('#schoolRegisterSubmit').removeAttr("disabled");
        if(response.error_heading)
          $(".submitError").html("<div class='alert alert-dismissible alert-danger' style='padding: 25px; text-align: center;'><button type='button' class='close' style='text-transform:lowercase'>x</button> <strong>"+response.error_heading+"</strong> </div>");
        else if(response.message){
          $(".submitError").html("<div class='alert alert-dismissible alert-success' style='padding: 25px; text-align: center;'><button type='button' class='close' style='text-transform:lowercase'>x</button> <strong>"+response.message+"</strong> </div>");
          // window.location.reload()
        }

        //response
      }).fail(function (xhr, status, error) {
        $('#schoolRegisterSubmit').removeAttr("disabled");
        $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase'>x</button> <strong>Oh Snap !Registration Failed</strong> </div>");
      });
    }
});


});

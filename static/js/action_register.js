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

  (function(){
    console.log('hi');
    var cityEle="";
    //write call to get cities from backend
    cities.map(function(ele) {
      cityEle += "<option value="+ele+">"+ele+"</option>";
    });
    $("#city select").html(cityEle);
  })();


  $(document).ready(function() {
    $(".select").dropdown({"optionClass": "withripple"});
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
  $(document).on('click','#city li.withripple.selected',function (e) {
    var cityName=e.target.innerHTML;
    if(cityName){
      $.ajax({
        type:'GET',
        url:'/getschools',
        data:cityName
      }).done(function (response) {
        // schoolsList.map(function (ele) {
        //   newele += "<option value="+ele+" class='selected'>"+ele+"</option>";
        // });
        // $('#schoolList select').html(newele);
        // $('#schoolList').load();
      }).fail(function (xhr, status, error) {
        // $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase'>x</button> <strong>Oops!</strong> Could not fetch schools. Select the city again</div>");
        schoolsList.map(function (ele) {
          newele += "<option value="+ele+" class='selected'>"+ele+"</option>";
        });
        $('#schoolList select').html(newele);
        $('#schoolList').load();
      })
  }
  });

  //submit Registration form
  $("#registerForm").submit(function (event) {
    event.preventDefault();
    $('#registerSubmit').attr("disabled","disabled");
    var data={};
    var pass,confpass;

    $("#registerForm").serializeArray().map(function (ele) {
      if(ele.name=="password")
      pass=ele.value;
      if(ele.name=="confpassword")
      confpass=ele.value;
      data[ele.name]=ele.value;
    });
    if(pass!=confpass){
      $('#registerSubmit').removeAttr("disabled");
      $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase'  data-dismiss='alert'>x</button> <strong>Oops!</strong> Password Didnt Match</div>");
    }
    else{
      console.log(JSON.stringify(data));
      $.ajax({
        type:'POST',
        url:'/register',
        data:JSON.stringify(data),
        dataType:'json'
      }).done(function (response) {
        //response
      }).fail(function (xhr, status, error) {
        $('#registerSubmit').removeAttr("disabled");
        $(".submitError").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase'>x</button> <strong>Oh Snap !</strong> Registration Failed</div>");
      });
    }
  })

});

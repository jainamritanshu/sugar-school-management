jQuery(document).ready(function($){

  var detailFields={
    name:'Name',
    address:'Address',
    city:'City',
    state:'State',
    email_id:'Email',
    phone_no:'Contact',
    princi_name:'Principal',
    auth_name:'Concerned Authority'
  };
  //detailValue

  var paymentFields=[
    'Students Registered',
    'Students (Payment not recieved)',
    'Amount per student',
    'Other Charges',
    'Total Amount',
    'Amount Paid',
    'Amount Due'
  ];

  var statusFields=[
    'School Registered',
    'Enrollment sheet Uploaded',
    'Enrollment sheet Acknowledged',
    'Payment Accepted',
    'Roll numbers Generated',
    'Examination Conducted'
  ];

  var user={};

  var baseEle="";
  //get initial data
  function getInitialData() {
    loader();
    $.ajax({
      type:'GET',
      url:'/user/sc_details/'
    }).done(function(response){
      unloader();
      // user=JSON.parse(response);
      console.log(response);
      baseEle=""
      user=response
      for(key in detailFields){
        if($.inArray(key,['name','address','email_id','phone_no','princi_name', 'state'])!=-1){
          baseEle +="<div class='row detail'><div class='col-xs-2 col-xs-offset-1 col-md-offset-3'> <h5><strong style='text-transform: capitalize;'>"+detailFields[key]+"</strong></h5> </div> <div class='col-xs-8 col-xs-offset-1 col-md-6'> <h5 id="+key+">"+user[key]+"</h5> </div></div>";
        }
      }
      $('.mainBox').html(baseEle);

    }).fail(function(xhr,status,error){
      unloader();

      $(".mainBox").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong >Oops! Could not fetch data <br>Try Again</strong></div>");
      // getInitialData();
    });
  }

  function getPaymentSummary() {
    loader();
    $.ajax({
      type:'GET',
      url:'/paymentSummary',
    }).done(function (response) {
      unloader();
      baseEle="";
      paymentFields=JSON.parse(response);
      paymentFields.map(function (ele) {
        baseEle += "<div class='row'> <div class='col-xs-8 col-xs-offset-1 '> <h5>"+ele.name+"</h5> </div> <div class='col-xs-2 col-xs-offset-1'> <h5 id='testNo'><strong>"+ele.value+"</strong></h5> </div> </div>";

      });
      $('.sideBox').html(baseEle);
    }).fail(function (xhr,status,error) {
      unloader();
      $(".sideBox").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong >Oops! Could not fetch data <br>Try Again</strong></div>");
      //getPaymentSummary();
    })
  }

  getInitialData();
  getPaymentSummary();




  var rollNosAvail = true;
  //rollNosSheet

  var resultAvail = true;
  //resultSheet

  $('ul li:not(#home)').click(function() {
    $('.head').slideUp();
    // $('.main').removeClass('col-md-5');
    // $('.main').addClass('col-md-10');
    $('.mainBox').empty();
    // $('.main').fadeIn();
    // loader();
    // setTimeout($('.mainBox').empty(),2000);
  });

  $('#home').click(function(){
    // $('.main').removeClass('col-md-10');
    // $('.main').addClass('col-md-5');
    $('.head').slideDown();
    $('.mainBox').empty();
    $('.main .page-header h4').html('Basic Info <span style="float:right"><i class="material-icons edit">mode_edit</i></span>');
    getInitialData();

  });


  $('#details').click(function(){
    $('.main .page-header h4').html('Info<span style="float:right"><i class="material-icons edit">mode_edit</i></span>');
    if(Object.getOwnPropertyNames(user).length==0){
      loader();
      $.ajax({
        type:'GET',
        url:'/user/sc_details/'
      }).done(function(response){
        unloader();
        user=JSON.parse(response);
      }).fail(function(xhr,status,error){
        unloader();
        $(".mainBox").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong >Oops! Could not fetch data <br>Try Again</strong></div>");
        //send again();
      });
    }
    baseEle="";
    for(key in detailFields){
      baseEle+="<div class='row detail'><div class='col-xs-2 col-xs-offset-1 col-md-offset-3'> <h5><strong style='text-transform:capitalize'>"+detailFields[key]+"</strong></h5> </div> <div class='col-xs-8 col-xs-offset-1 col-md-6'> <h5 id="+key+">"+user[key]+"</h5> </div></div>";
    }
    $('.mainBox').html(baseEle);
  });

  $('#enroll').click(function(){
    $('.main .page-header h4').html('Enrollment Sheet');
    $('.mainBox').append("<div class='row center-block' style='margin-top:1em'> <div class='col-xs-8 col-xs-offset-1 col-md-5 col-md-offset-0 text-center' > <a href='#' class='btn btn-sup btn-raised btn-sm' id='downloadEnrollSheet'> <i class='material-icons'>file_download</i> <span>DOWNLOAD</span> </a> </div> <div class='col-xs-8 col-xs-offset-2 col-md-5 col-md-offset-1 text-center'><h6 class='text-danger'>*Fill the rows exactly in the format shown below. Do not modify the columns headers</h6></div> </div>");
    $('.mainBox').append("<div class='row center-block' style='margin-top:1em'> <div class='col-xs-8 col-xs-offset-1 col-md-5 col-md-offset-0 text-center' > <input type='file' id='inputEnrollSheet' style='display:none' accept='.xls,.xlsx' /> <a href='#' class='btn btn-sup btn-raised btn-sm' id='uploadEnrollSheet'> <i class='material-icons'>file_upload</i> <span>UPLOAD</span> </a> </div> <div class='col-xs-8 col-xs-offset-2 col-md-5 col-md-offset-1 text-center'><h6 class='text-danger'>*You can have multiple uploads before the deadline</h6></div> </div>");
    $('.mainBox').append("<div class='row center-block text-center' style='margin:6vh 0'><div class='col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3 text-center'><div class='page-header'></div><h3>Sample</h3></div><div class='col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 text-center' style='margin-top:3vh'><img src='../img/table3.png' class='img-responsive'/></div></div>");
  });

  $('#payment').click(function(){
    $('.main .page-header h4').html('Payment');
    //call to get amount
    amount = 2500;
    var pay="<a href='https://www.instamojo.com/walter/sugar/' rel='im-checkout' data-behaviour='remote' data-style='flat' data-text='Checkout' data-token='35e9373a1fc1f62dfc9948bde7018bfe'></a> <script src='https://d2xwmjc4uy2hr5.cloudfront.net/im-embed/im-embed.min.js'></script>";
    $('.mainBox').append("<div class='row center-block' style='margin-top:1em;'><div class='col-xs-10 col-md-5 col-xs-offset-1 text-center'><div class='col-xs-7'><h5>Amount to be paid:</h5></div><div class='col-xs-4 col-xs-offset-1'> <h5>Rs "+amount+"</h5></div></div>  <div class='col-xs-8 col-md-3 col-xs-offset-2 text-center' >"+pay+"</div> </div>");
    $('.mainBox').append("<div class='row' style='margin-top:1em;'><div class='col-xs-12 text-left'><h6 class='text-info viewSummary' style='cursor:pointer'>*Click to view summary</h6></div></div>");
  });

  $('#status').click(function(){
    loader();
    $('.main .page-header h4').html('Status');
    $.ajax({
      type:'GET',
      url:'/getstatus'
    }).done(function (response) {
      unloader();
      var response = JSON.stringify([true,false,false,false,false,false]);
      var statusValue=JSON.parse(response);
      baseEle="";
      for(i=0;i<statusFields.length;i++){
        value = statusValue[i] ? "check" : "close" ;
        type = statusValue[i]? "success":"danger";
        baseEle+="<div class='row detail'><div class='col-xs-5 col-xs-offset-1 col-md-4 col-md-offset-2'> <h5><strong>"+statusFields[i]+"</strong></h5> </div> <div class='col-xs-2 col-xs-offset-1 col-md-3 col-md-offset-1 text-center'> <h5 id="+statusFields[i].toLowerCase().replace(" ","_")+"><i class='material-icons text-"+type+"' style='font-weight:bold'>"+value+"</i></h5> </div></div>";
      }
      $('.mainBox').html(baseEle);
    }).fail(function (xhr,status,error) {
      unloader();
      $(".mainBox").html("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong >Oops! Could not fetch data <br>Try Again</strong></div>");
    });
  });

  $('#downloads').click(function(){
    $('.main .page-header h4').html('Downloads');
    if(rollNosAvail)
    content="<a href='#' class='btn btn-sup btn-raised btn-sm' id='downloadRollNos'> <i class='material-icons'>file_download</i> <span>DOWNLOAD</span> </a>";
    else
    content="<div class='alert alert-danger' style='color:white;margin-bottom:15px'><button type='button' class='close' >×</button>Please be patient till we finish the procedures </div>";
    $('.mainBox').append("<div class='row center-block' style='margin-top:1em;display: flex;justify-content: center;align-items: center;'><div class='col-xs-8 col-md-5 col-md-offset-1 text-center'><h5>Download the Roll Numbers sheet</h5></div>  <div class='col-xs-8 col-md-5 col-md-offset-0 text-center' > "+content+" </div> </div>");
  });

  $('#results').click(function(){
    $('.main .page-header h4').html('Results');
    if(resultAvail)
    content="<a href='#' class='btn btn-sup btn-raised btn-sm' id='downloadResults'> <i class='material-icons'>file_download</i> <span>DOWNLOAD</span> </a>";
    else
    content="<div class='alert alert-danger' style='color:white;margin-bottom:15px'><button type='button' class='close' >×</button>Please be patient our experts are still mining through best of our resourses </div>";
    $('.mainBox').append("<div class='row center-block' style='margin-top:1em;display: flex;justify-content: center;align-items: center;'><div class='col-xs-8 col-md-5 col-md-offset-1 text-center'><h5>Download Results</h5></div>  <div class='col-xs-8 col-md-5 col-md-offset-0 text-center' > "+content+" </div> </div>");
  });


  $(document).on('click','.edit',function(){
    $('.side,.head').fadeOut();
    $('.main').removeClass('col-md-5');
    $('.main').addClass('col-md-10');
    $('.mainBox').empty();
    $('.main .page-header h4').html('Edit Details');
    //call to get previous details
    $('.mainBox').append("<div class='row'> <div class='col-md-8 col-md-offset-2'> <form role='form' class='form-horizontal'> <fieldset> <div class='form-group'> <label class='control-label col-md-2' for='address'>Address</label> <div class='col-md-10'> <textarea  class='form-control' id='address' row='4' required /> </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='email'> Email</label> <div class='col-md-10'> <input type='email' class='form-control' id='email' required> </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='contact'> Contact</label> <div class='col-md-10'> <input type='text' class='form-control' id='contact' required> </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='concerned_authority' >Concerned Authority</label> <div class='col-md-10'> <input type='text' class='form-control' id='concerned_authority'required > </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='password'> Password</label> <div class='col-md-10'> <input type='password' class='form-control' id='password' required> </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='confpassword'> Confirm Password</label> <div class='col-md-10'> <input type='password' class='form-control' id='confpassword' required> </div> </div> <div class='form-group'> <div class='col-md-8 col-md-offset-2 text-center'> <button type='submit' class='btn btn-info btn-raised'>Save Changes</button> </div> </div> </fieldset> </form> </div> </div>");
    $.material.init();
  });

  $(document).on('click','.viewSummary',function () {
    $('.side').slideDown();
    console.log('hi');
  });

  $(document).on('click','#downloadEnrollSheet',function(e){
    e.preventDefault();
    $.ajax({
      type:'GET',
      url:'/downloadEnrollSheet',
      contentType:false,
      processData:false
    }).done(function (response) {
      window.location=window.location.origin+response;
    }).fail(function (response) {
      response="file.png";
      window.location=window.location.origin;
    })
  });

  $(document).on('click','#uploadEnrollSheet',function (e) {
    e.preventDefault();
    $('#inputEnrollSheet').trigger('click');
  });

  //upload enrollment sheet
  $(document).on('change','#inputEnrollSheet',function (e) {
    loader();
    user={
      name:"partho",
      email:"psarthi16@gmail.com"
    };
    var file=e.target.files[0];
    var formData = new FormData();
    formData.append('email',user.email);
    formData.append('enrollSheet',file);
    //using ajax
    console.log(formData.get('email'),formData.get('enrollSheet'));
    $.ajax({
      type:'POST',
      url:'/uploadEnrollSheet',
      contentType: false,
      processData: false,
      data:formData,
    }).done(function (response) {
      unloader();
      $(".mainBox").prepend("<div class='alert alert-dismissible alert-success'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong >Successfully Uploaded Enrollment sheet</strong></div>");
    }).fail(function (response) {
      console.log(data);
      unloader();
      $(".mainBox").prepend("<div class='alert alert-dismissible alert-danger'><button type='button' class='close' style='text-transform:lowercase' data-dismiss='alert'>x</button> <strong >Oops! Could not upload enrollment sheet<br>Try Again</strong></div>");
    });

    //using xhr
    // var uri='/uploadEnrollSheet';
    // var xhr=new XMLHttpRequest();
    // xhr.open('POST',uri,true);
    // xhr.onreadystatechange =  function(){
    //   if(xhr.readyState == 4 && xhr.status == 200){
    //     //handle response
    //     console.log(xhr.response);
    //   }
    // };
    // var data={
    //   "user" : user,
    //   "enrollSheet" : file
    // };
    // console.log(data,JSON.stringify(data));
    // xhr.send(formData);
  });

  function loader() {
    spinner="<div class='spinnerWrap col-xs-10 col-xs-offset-1'><svg class='spinner' width='50px' height='50px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'><circle class='circle' fill='none' stroke-width='4' stroke-linecap='round' cx='33' cy='33' r='30'></circle></svg></div>";
    $('.mainBox').prepend(spinner);
  };

  function unloader(){
    $('.spinnerWrap').hide();
  }
});

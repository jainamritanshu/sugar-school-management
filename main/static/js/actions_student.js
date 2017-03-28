jQuery(document).ready(function($){
  $(".dropdown").hover(
    function() {
      $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
      $(this).toggleClass('open');
      $('b', this).toggleClass("caret caret-up");
    },
    function() {
      $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
      $(this).toggleClass('open');
      $('b', this).toggleClass("caret caret-up");
    }
  );

  var profileFields=['Name','Roll','Date of Birth','City','School','Email'];
  var detailFields=['name','roll','dob','city','school','email_id'];
  var userDetails = {};
  $('ul li:not(#home)').click(function(){
    $('.side,.head').slideUp();
    $('.main').removeClass('col-md-5');
    $('.main').addClass('col-md-10');
    $('.mainBox').empty();
    $('.main .page-header h4').remove();
    if(!$('.main .page-header h3').length)
    $('.main .page-header').append("<h3></h3>");
  });


function loadUserData() {
      $.ajax({
      method:'GET',
      url:'/user/student_dashboard/profile/'
    }).done(function(response){
        userDetails = response;
        $('.head h3').html("Hello , "+userDetails['name']);
        $('.mainBox').empty();
        $('.main .page-header h3').remove();
        if(!$('.main .page-header h4').length)
        $('.main .page-header').append("<h4></h4>");
        $('.main .page-header h4').html('Basic Info <span style="float:right"><i class="material-icons edit">mode_edit</i></span>');
        for(i=0;i<profileFields.length;i++){
          if($.inArray(profileFields[i],['Birthday','Class'])!=-1)
          continue;
          var baseEle="<div class='row detail'><div class='col-xs-2 col-xs-offset-1'> <h5><strong>"+profileFields[i]+"</strong></h5> </div> <div class='col-xs-8 col-xs-offset-1 '> <h5 id="+profileFields[i].toLowerCase().replace(" ","_")+">"+userDetails[detailFields[i]]+"</h5> </div></div>";
          $('.mainBox').append(baseEle);
        }
    }); 
  }

loadUserData();

  $(document).on('click','#home',function(){
    $('.main').removeClass('col-md-10');
    $('.main').addClass('col-md-5');
    $('.side,.head').slideDown();
    //call
    loadUserData();
  });

  $(document).on('click','#profile',function(){
    $.ajax({
      method:'GET',
      url:'/user/student_dashboard/profile/'
    }).done(function(response){
        userDetails = response;
    $('.main .page-header h3').html('Info<span style="float:right"><i class="material-icons edit">mode_edit</i></span>');
    for(i=0;i<profileFields.length;i++){
      var baseEle="<div class='row detail'><div class='col-xs-2 col-xs-offset-1 col-md-offset-3'> <h5><strong>"+profileFields[i]+"</strong></h5> </div> <div class='col-xs-8 col-xs-offset-1 col-md-6'> <h5 id="+profileFields[i].toLowerCase().replace(" ","_")+">"+userDetails[detailFields[i]]+"</h5> </div></div>";
      $('.mainBox').append(baseEle);
    }
    });
  });

  $(document).on('click','#samplePractice',function(){
    $('.main .page-header h3').html('Sample Papers');
    var form="<form class='form-inline' role='form'> <div class='form-group'> <label class='control-label col-md-2' for='class'>Class</label><div class='col-md-10'>  <select id='class' class='select form-control' required> <option value='5'>5</option> <option value='6'>6</option> <option value='7'>7</option> <option value='8'>8</option> <option value='9'>9</option> <option value='10'>10</option> <option value='11'>11</option> <option value='12'>12</option> </select> </div> </div> <button type='submit' class='btn btn-info btn-raised' id='samplePracticeSubmit'>Submit</button> </form>";
    $('.mainBox').append("<div class='row'><div class='col-md-8 col-xs-10 col-md-offset-2 text-center '>"+form+"</div></div>");
    $.material.init();
    $(".select").dropdown({"optionClass": "withripple"});
  });


  $(document).on('click','#PTATest',function() {
    $('.main .page-header h3').html('Personality Test');
    var Instructions=[
      'The online test can be submitted only once.',
      'The result will be displayed on successful submission.',
      'Detailed analysis and the solutions will be available once the test has been submitted successfully',
      'The test cannot be stop in between'
    ];
    $('.mainBox').append("<div class='row'><div class='col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 ' style='font-style:italic'><h5 class='text-danger'> Instructions:</h5><ul class='instructList'></ul></div></div>");
    Instructions.map(function(ele){
      $('.instructList').append("<li><h6 style='margin:2px 0'>"+ele+"</h6></li>");
    });
      $('.mainBox').append("<div class='row' style='margin-top:1em'><div class='col-xs-10 col-xs-offset-1 text-center'> <button type='submit' class='btn btn-info btn-raised' id='startTest'>Start</button></div></div>");
  });

  $(document).on('click','#samplePracticeSubmit',function(){
    $('.results').remove();
    if(!$('.samplePracticeResults').length)
    $('.mainBox').append("<div class='row samplePracticeResults'><div class='col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1'><div class='page-header'><h4>Results <span class='badge' style='color: white; background-color:#03A9F4;margin-left:9px'>0</span></h4></div></div></div>");
    var classNo=$('select#class option:selected').val();
    //call to get results and initiate loader
    var results=[
      {
        "name":"Sample Paper 1_"+classNo,
        "url":"../resources/pset1_"+classNo+".pdf"
      },
      {
        "name":"Sample Paper 2_"+classNo,
        "url":"../resources/pset2_"+classNo+".pdf"
      }
    ];
    $('.samplePracticeResults span').html(results.length);
    var elementContainer="";
    results.map(function(ele){
      elementContainer += "<div class='col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1' style='margin-top:1em;display: flex;align-items: center;'><div class='col-xs-8 col-md-5'><h5>"+ele.name+"</h5></div>  <div class='col-xs-8 col-md-5 col-md-offset-2 text-right' > <a href="+ele.url+" class='btn btn-sup btn-raised btn-sm'> <i class='material-icons'>file_download</i> <span>DOWNLOAD</span> </a></div> </div>";
    });
    $('.mainBox').append("<div class='row results'><div class='container-fluid'>"+elementContainer+"</div></div>");
  });



  $(document).on('click','.edit',function(){
    $('.side,.head').fadeOut();
    $('.main').removeClass('col-md-5');
    $('.main').addClass('col-md-10');
    $('.mainBox').empty();
    $('.main .page-header h3').html('Edit Details');
    //call to get previous details
    $('.mainBox').append("<div class='row'> <div class='col-md-8 col-md-offset-2'> <form role='form' class='form-horizontal'> <fieldset> <div class='form-group'> <label class='control-label col-md-2' for='name'>Name</label> <div class='col-md-10'> <input  class='form-control' id='name' required /> </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='birthday'> Birthday</label> <div class='col-md-10'> <input type='date' class='form-control' id='birthday' required> </div> </div><div class='form-group'> <label  class='control-label col-md-2' for='class'>Class</label> <div class='col-md-10'> <select id='school' class='select form-control' data-dynamic-opts=true required> <option value='5'>5</option> <option value='6'>6</option> <option value='7'>7</option> <option value='8'>8</option> <option value='9'>9</option> <option value='10'>10</option> <option value='11'>11</option> <option value='12'>12</option> </select> </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='email'> Email</label> <div class='col-md-10'> <input type='email' class='form-control' id='email' required> </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='contact'> Contact</label> <div class='col-md-10'> <input type='text' class='form-control' id='contact' required> </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='password'> Password</label> <div class='col-md-10'> <input type='password' class='form-control' id='password' required> </div> </div> <div class='form-group'> <label class='control-label col-md-2' for='confpassword'> Confirm Password</label> <div class='col-md-10'> <input type='password' class='form-control' id='confpassword' required> </div> </div> <div class='form-group'> <div class='col-md-8 col-md-offset-2 text-center'> <button type='submit' class='btn btn-info btn-raised'>Save Changes</button> </div> </div> </fieldset> </form> </div> </div>");
    $.material.init();
    $(".select").dropdown({"optionClass": "withripple"});

    // $(".select").dropdown({"optionClass": "withripple"});
  });


});

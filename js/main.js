$(document).ready(function() {
  // don't enable submit button until all 4 videos submitted / id's exist
});

// new submit function
$('#app').submit(function(event){
  event.preventDefault();
  console.log('submit button pressed');

  if ($(this).validate({
    rules:{
      //ignore: ".ignore",
      name: {required: true},
      //job: {required: true},
      email: {
        email: true,
        required: true
      },
      v1: {required: true},
      v2: {required: true},//
      v3: {required: true},
      v4: {required: true}//,
      //v5: {required: true},
      //v6: {required: true},
    }
  }).form()) {
    // push data to firebase
    var key = saveApp();

    // build & send email
    //var html = buildEmail(key);
    //sendMail(html, "Neal Shyam", "nealrs@gmail.com", $("#hname").val(), "Junior Web Developer");
    // confirmation + reset form + video recorder
    alert("Thanks for your time, we'll be in touch soon!");
    this.reset();

    ZiggeoApi.Embed.get("v1").reset();
    document.getElementById("v1").value = '';

    ZiggeoApi.Embed.get("v2").reset();
    document.getElementById("v2").value = '';

    ZiggeoApi.Embed.get("v3").reset();
    document.getElementById("v3").value = '';

    ZiggeoApi.Embed.get("v4").reset();
    document.getElementById("v4").value = '';

    //ZiggeoApi.Embed.get("v3").reset();
    //document.getElementById("v3").value = '';

    //ZiggeoApi.Embed.get("v4").reset();
    //document.getElementById("v4").value = '';

  } else {
    return false;
  }
});

function saveApp(){
  fb = new Firebase("https://commitinterview.firebaseio.com/interviews/");
  var key = fb.push({
    'name': $("#name").val(),
    //'job': $("#job").val(),
    'email': $("#email").val(),
    'v1': $("#v1").val(),
    'v2': $("#v2").val(),
    'v3': $("#v3").val(),
    'v4': $("#v4").val()//,
    //'v5': $("#v5").val(),
    //'v6': $("#v6").val()
  });
  console.log(key.key());
  return key.key();
}


/// ZIGGEO CRAP
// SET THESE CONFIGS
ZiggeoApi.token = "4afaff08a206010335585bae22ed3a28";
ZiggeoApi.Config.cdn = true;
ZiggeoApi.Config.webrtc = true;
ZiggeoApi.Config.resumable = true;

// FUNCTIONS

ZiggeoApi.Events.on("submitted", function (data) {
	console.log('Video ID ' + data.video.token + ' was uploaded and processed for  question ' + data.id);
	document.getElementById(data.id).value = data.video.token;
	//document.getElementById('addsuccess').style.display="block";
  $("#applyButton").prop('disabled', false);
});

// having trouble getting rerecords to work...
ZiggeoApi.Events.on("discarded", function(data) {
  console.log('recording new video for: ' + data.id);
  document.getElementById(data.id).value = '';
  //document.getElementById('addsuccess').style.display="none";
  $("#applyButton").prop('disabled', true);
});

ZiggeoApi.Events.on("recording", function (data) {
  console.log('recording video for: ' + data.id);
	// Triggered when the recording process has been started
  $("#applyButton").prop('disabled', true);
});

/*$(window).resize(function(){
  var i = document.getElementsByClassName('video-recorder-outer')[0];
  var j = document.getElementsByClassName("video-recorder-initial")[0];
  var k = document.getElementsByClassName("inner-container")[0];

  i.style.height = ZiggeoApi.Embed.get("recorder").offsetWidth/1.5;
	i.style.width = ZiggeoApi.Embed.get("recorder").offsetWidth;

	j.style.height = ZiggeoApi.Embed.get("recorder").offsetWidth/1.5;
	j.style.width = ZiggeoApi.Embed.get("recorder").offsetWidth;

  k.style.height = ZiggeoApi.Embed.get("recorder").offsetWidth/1.5;
	k.style.width = ZiggeoApi.Embed.get("recorder").offsetWidth;
});*/

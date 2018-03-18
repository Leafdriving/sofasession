
// Attach Attributes to Html (Put here for html readability)

$("#playerArtist").attr({title:"UserName", class:"lincircle", src:"http://www.sofasession.com/public/user/b4/89/892b_dd42.jpg?c=22bc"});
$("#playerScrolling").attr({style:"cursor: pointer", title:"Click to Change Display Style"});
$("#playerSongName").attr({style:"font-size: 18px;margin-top:-30px;visibility: hidden"});
$("#playerStop").attr({ title:"Stop Current Song",style:"margin-top:-2px", class:"playerbutton amplitude-stop"});
$("#playerPause").attr({title:"Pause Current Song",style:"margin-top:-2px", class:"playerbutton amplitude-pause"});
$("#playerPlay").attr({title:"Play Current Song", style:"margin-top:-2px", class:"playerbutton amplitude-play"});
$("#playerTrackNo").attr({title:"Playing Song 01 of 07 In Playlist", style:"font-family: triple-dot-digital-7;color: #019DFF;font-size:0.8em;margin-top:2px;margin-left:10px;margin-right:-14px"});
$("#playerPrevious").attr({title:"Previous Song in Playlist", style:"margin-top:-2px", class:"playerbutton amplitude-prev"});
$("#playerNext").attr({title:"Next Song In Playlist", style:"margin-top:-2px", class:"playerbutton amplitude-next"});
$("#volumcontroller").attr({style:"margin-left:5px"});
$("#playerTimeUp").attr({title:"Current Time This Song"});
$(".amplitude-current-time").attr({style:"font-size:10px;vertical-align: top;"});
$("#playerRange").attr({title:"Click Slider to Jump to Position in Song"});
$("#playerTimeDown").attr({title:"Length Of Song", style:"font-size:10px;vertical-align: top;"});
$("#PlayerContributers").attr({title:"Musicians that Contributed to this Song"});
$("#PlayerStyles").attr({title:"Music Styles"});
$("#ShareSong").attr({title:"Click to Share Song"});
$("#RePostSong").attr({title:"Click to Re-Post Song"});
$("#FavouritesSong").attr({title:"Click to add to your Favourites"});
$("#LikeSong").attr({title:"Click to 'like'"});


var songblock = `
<div style="background-color:green"
  class="songlistelement amplitude-play"
  id="song*{index}"
  amplitude-song-index="*{index}"
  onclick="changeSong(*{index})"
>
  <table width="100%">
    <tr>
      <td width=75>
        <img class="lincircle" style="opacity: 1.0;background-image: none" src="*{url}" />
      </td>
      <td style="vertical-align: top;color:white;font-size:12px">
        <div>*{mix_name}</div>
        <div>*{mix_description}</div>
        <div>Line Three</div>
        <div>&nbsp</div>
        <div>&nbsp</div>
        <span style="float:left">
          *{mix_update_date}
        </span>
        <span style="float:right">
          <span title="Number of Song Plays">&nbsp&nbsp<span class="glyphicon glyphicon-play"></span>*{mix_plays}</span>
          <span title="Number of Song Likes">&nbsp&nbsp<span class="glyphicon glyphicon-heart"></span>&nbsp*{numLikes}</span>
          <span title="Number of Song Comments">&nbsp&nbsp<span class="glyphicon glyphicon-comment"></span>&nbsp*{mix_status}</span>
          <span title="Number of Song Tracks">&nbsp&nbsp<span class="glyphicon glyphicon-music"></span>&nbsp*{tracks}</span>
        </span>
      </td>
    </tr>
  </table>
</div>
`;

function switchTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

var twostring = function(int_) {
  var s = int_.toString();
  return (s.length === 1) ? "0"+s : s;
};

var replaceAll = function(base, search, replacement) {
  while (base.includes(search)) base = base.replace(search, replacement);
  return base;
};

var applyTemplate = function(template, obj) {
  var element = null;
  var returnstring = template;
  for (var key in obj)
    returnstring = replaceAll(returnstring, "*{" + key + "}", obj[key]);
  return returnstring;
};

var changeSong = function(songnum) {
  currentSong = songnum;
  var mix = feedMixesObjects.mixes[songnum];
  var picurl = "http://sofasession.com" + feedMixesObjects.users[ mix.mix_owner_id ].photoUrl;
  var trackstr =
  $("#cvs, #playerSongName").html(mix.mix_name);
  $("#player").css('background-image', 'url("' + picurl + '")');
  $("#playerArtist").attr({title:"UserName", class:"lincircle", src:picurl});
  $("#playerTrackNo").html(twostring(songnum+1)+"/"+twostring(feedMixesObjects.mixes.length));
};

var currentSong = 0;
changeSong(0);

var output = "";
var mix = null;
var songlist = [];
var songartist = null;
for (var i = 0; i < feedMixesObjects.mixes.length; i++) {
  if (i !== 0) output +='<hr style="margin:0">';
  mix = feedMixesObjects.mixes[i];
  songartist = feedMixesObjects.users[ mix.mix_owner_id ].username;
  output += applyTemplate(songblock, {
    index : i,
    mix_name : mix.mix_name,
    mix_description : ((mix.mix_description == null ) ? "(by " + songartist + ")" : mix.mix_description),
    mix_plays : mix.mix_plays,
    numLikes : ((mix.numLikes == undefined ) ? "0" : mix.numLikes),
    mix_status : mix.mix_status,
    mix_update_date : mix.mix_update_date,
    url: "http://www.sofasession.com" + feedMixesObjects.users[ mix.mix_owner_id ].photoUrl,
    tracks : Object.keys(mix.tracks).length
  });
  songlist.push(
  {
    "name": mix.mix_name,
    "artist": songartist,
    "album": "",
    "url": "http://www.sofasession.com" + mix.clientUrl,
  });
}
$("#Latest").html(output);

//var Latest = "";
//feedMixesObjects.mixes.forEach(function(element) {
//    Latest += "<br>" + element.mix_name;
//});
//$("#Latest").html(Latest);

// Initialize Dot Matrix Scrolling Window

var options = {
horizontalPixelsCount: 75,
verticalPixelsCount: 5,
pixelSize: 6,
disabledPixelColor: '#404040',
enabledPixelColor: '#019DFF',
pathToPixelImage: 'pixel.png',
stepDelay: 70,
// only for canvas
backgroundColor: '#202020', //'transparent', // // '#202020'
// only for canvas
pixelRatio: 0.7,
runImmidiatly: true
};

// Layout Manager Callback

Handler.callback = function() {
  // Re-Calculate Number of Horizontal Pixels required for Scrolling Display
  $('.demo-div, .demo-canvas').leddisplay(
    $.extend(options, {horizontalPixelsCount: Math.floor(document.getElementById('playerScrolling').offsetWidth/6)-2})
  );
  console.log(Math.floor(document.getElementById('playerScrolling').offsetWidth/6)-2);
};

console.log(Amplitude.audio());
// If progress bar clicked, Jump to that point in song.
document.getElementById('song-played-progress').addEventListener('click', function(e) {
  var offset = this.getBoundingClientRect();var x = e.pageX - offset.left;
  Amplitude.setSongPlayedPercentage((parseFloat(x) / parseFloat(this.offsetWidth)) * 100);
});
  $("#playerStop").click(function(){$("#playerStop").notify("Stop Clicked",{ position:"top", className:"success", autoHideDelay: 1000 });});
  $("#playerPause").click(function(){/*Amplitude.pause();*/$("#playerPause").notify("Pause Clicked",{ position:"top", className:"success", autoHideDelay: 1000 });});
  $("#playerPlay").click(function(){/*Amplitude.play();*/$("#playerPlay").notify("Play Clicked",{ position:"top", className:"success", autoHideDelay: 1000 });});
  $("#playerPrevious").click(function(){$("#playerPrevious").notify("Previous Clicked",{ position:"top", className:"success", autoHideDelay: 1000 });});
  $("#playerNext").click(function(){$("#playerNext").notify("Next Clicked",{ position:"top", className:"success", autoHideDelay: 1000 });});
  $("#ShareSong").click(function(){$("#ShareSong").notify("Share Clicked",{ position:"top", className:"success", autoHideDelay: 1000 });});
  $("#RePostSong").click(function(){$("#RePostSong").notify("RePost Clicked",{ position:"top", className:"success", autoHideDelay: 1000 });});
  $("#FavouritesSong").click(function(){$("#FavouritesSong").notify("Make Favourite Clicked",{ position:"top", className:"success", autoHideDelay: 1000 });});
  $("#LikeSong").click(function(){$("#LikeSong").notify("Like Clicked",{ position:"top", className:"success", autoHideDelay: 1000 });});
  $("#playerArtist").click(function(){$("#playerArtist").notify("Show Artist Details Clicked",{ position:"bottom", className:"success", autoHideDelay: 1000 });});
  $(".sincircle").click(function(){$.notify("SubUser Clicked", "success");});
  $(".darkbox").click(function(){$.notify("Style Clicked", "success");});
  $(".lightbox").click(function(){$.notify("Instrument Clicked", "success");});
  $(".songlistelement").click(function(){$.notify("Play " + songlist[parseInt(this.getAttribute("id").substr(4))].name,{position:"top", className:"success", autoHideDelay: 1000 });});
  //$("#song1").click(function(){ alert("hi"); });
  var isScrolling = true;
  $("#playerScrolling").click(function(){
    $("#playerScrolling").notify("Song Name Clicked",{ position:"bottom", className:"success", autoHideDelay: 1000 });
    isScrolling = !isScrolling;
    if(isScrolling) {
      $("#cvs").css("visibility", "visible");
      $("#playerSongName").css("visibility", "hidden");}
    else {
      $("#cvs").css("visibility", "hidden");
      $("#playerSongName").css("visibility", "visible");}
  });

// Initialize Playlist and Songs

  Amplitude.init({
    "songs": songlist,
    "autoplay": true,
    "callbacks": {
      'after_play': function(){
        $("#playerArtist").css("-webkit-animation","rotation 6s infinite linear");
      },
      'after_stop': function(){
        $("#playerArtist").css("-webkit-animation","");
      },
      'after_pause': function(){
        $("#playerArtist").css("-webkit-animation","rotation 1000s infinite linear");
      },
      'song_change': function(){
        currentSong = Amplitude.getActiveIndex();
        changeSong(currentSong);
      },
    }
  });
/*
  #playerArtist {
  		-webkit-animation: rotation 0s infinite linear;
  }

*/

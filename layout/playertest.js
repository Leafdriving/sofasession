// See https://www.npmjs.com/package/liefs-layout-manager for Docs on how this works
var HeaderBlock = h("Header", "48px", 0,                            // Header Block
    I("Iconbtn", "68px"),
    I("hblank", "100%"),
    I("Homebtn","69px"),
    I("Browsebtn", "80px"),
    I("Songsbtn", "69px"),
    I("Helpbtn", "59px"),
    I("Settingsbtn", "59px"),
    I("Notifybtn", "59px"),
    I("Userbtn", "59px")
);

var PlayerButtons = [
  I("playerStop", "20%"),
  I("playerPause", "20%"),
  I("playerPlay", "20%"),
  I("playerTrackNo", "85px"),
  I("playerPrevious", "20%"),
  I("playerNext", "20%")
];

var PlayerProgress = [
  I("playerTimeUp", "25px"),
  I("playerRange", "100%"),
  I("playerTimeDown", "25px")
];

var PlayerBlockTop = [
  I("playerArtist", "70px"),
  v("playerRightofArtist", "100%",
    I("playerScrolling", "32px"),
    h("playerUnderScrolling", "100%",
      v("playerLeftofVolume", "100%",
        h("PlayerButtons", "19px", PlayerButtons),
        h("PlayerProgress", "100%", PlayerProgress)
      ),
      I("playerVolume", "60px")
    )
  )
];

var PlayerLargeBlock = [
  h("PlayerBlockTop", "70px", PlayerBlockTop),
  I("PlayerContributers", "100%"),
  I("PlayerStyles", "20px"),
  I("PlayerInstruments", "20px"),
  I("PlayerFooter", "15px")
];

var PlayerColumnBlock = v("PlayerColumn", "534px", "410px", "534px", 0,                   // Player Column
  I("PlayerHeader", "25px"),
  v("player", "175px", PlayerLargeBlock),       // Plauyer
  I("PlaylistHeader", "25px"),
  I("playlistTabs", "25px"),
  I("PlayerColumnBlankBottom", "100%")
);

var LeftColumn = [
  v("AA", "350px", "150px", "700px", 0,
    I("MembersHeader", "25px"),
    I("Members", "100%"),
    I("message","25px")
  ),
  v("BB", "100%", 0,
    I("ChatHeader", "25px"),
    I("ChatWindow", "100%"),
    I("SendMessage","87px")
  )
];

v("Main",
  HeaderBlock,
  h("Body", "100%", 0,                              // Below Header
    v("LeftColumn", "200px", "150px", "300px", 0, LeftColumn),
    v("CC", "100%", 0,
      I("FeedHeader", "25px"),
      I("MainWindow", "100%")
    ),
    PlayerColumnBlock
  )
);

/*
  v("Main",
    I("top", "50%"),
    h("middle", "175px",
      I("left", "50%"),
      v("player", "538px", PlayerLargeBlock),
      I("right", "50%")
    ),
    I("recentPlaylist", "200px"),
    I("bottom", "50%")
  );
*/

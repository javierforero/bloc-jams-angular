(function() {
  /*
  * @function SongPlayer
  * @desc function that will be passed to the factory service
  * @returns {Object} SongPlayer
  */
  function SongPlayer($rootScope, Fixtures) {
     /*
     * @desc object that will hold public methods for playing and pausing a song
     * @type {Object}
     */
     var SongPlayer = {};
     /*
     * @desc private variable that hold the current album object
     * @type {Object}
     */
     var currentAlbum = Fixtures.getAlbum();
     /*
     * @desc Buzz object audio file
     * @type {Object}
     */
     var currentBuzzObject = null;
     /*
     * @function getSongIndex
     * @desc This fuctions takes in a song object and return the index of the song in the current album
     * @param {Object} song
     * @returns {Number}
     */
     var getSongIndex = function(song) {
       return currentAlbum.songs.indexOf(song);
     }
     /*
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
     var setSong = function(song) {

        if(currentBuzzObject){

          stopSong(SongPlayer.currentSong);
        }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });

        currentBuzzObject.bind('timeupdate', function() {

            $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
        });
        SongPlayer.currentSong = song;
     };

     /*
     * @function playSong
     * @desc Plays song in currentBuzzObject
     * @param {Object} song
     */
     var playSong = function(song) {

         currentBuzzObject.play();
         song.playing = true;
     };
     /*
     * @function stopSong
     * @desc stops song in currentBuzzObject
     * @param {Object} song
     */
    var stopSong = function(song) {
        currentBuzzObject.stop();
        song.playing = null;
    };
     /*
     * @desc variable that will be set to the song object
     * @type {Object}
     */
     SongPlayer.currentSong = null;
     /*
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
     SongPlayer.currentTime = null;
     /*
     * @desc variable that will set the volume of the song
     * it has an initial value of 50
     * @type {Number}
     */
     SongPlayer.volume = 50;
     /*
     * @function in SongPlayer object
     * @desc plays a specified song
     * @param {Object} song
     */
     SongPlayer.play = function(song) {
         song = song || SongPlayer.currentSong;
         if(!song) {
            setSong(currentAlbum.songs[0]);
            playSong(currentAlbum.songs[0]);
         } else if(SongPlayer.currentSong !== song && song) {

             setSong(song);
             playSong(song);

         } else if(SongPlayer.currentSong == song) {

            if(currentBuzzObject.isPaused()) {

              playSong(song);
            }
         }
     };

     /*
     * @function in SongPlayer object
     * @desc pauses a specified song
     * @param {Object} song
     */
     SongPlayer.pause = function(song) {
         song = song || SongPlayer.currentSong;
         currentBuzzObject.pause();
         song.playing = false;
     };
     /*
     * @function in SongPlayer object
     * @desc it plays the previous song on the album tracklisting
     * unless it is the first song then it will stop the current song
     */
     SongPlayer.previous = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex--;

         if(currentSongIndex < 0) {

          stopSong(SongPlayer.currentSong);
         } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
         }
     };
     /*
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
     SongPlayer.setCurrentTime = function(time) {
         if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
         }
         SongPlayer.currentTime = time;
     };
     /*
     * @function setVolume
     * @desc Sets volume of currently playing song
     * @param {Number} newVolume
     */
     SongPlayer.setVolume = function (newVolume) {
         if(currentBuzzObject) {

             currentBuzzObject.setVolume(newVolume);
         }
         SongPlayer.volume = newVolume;
     };
     /*
     * @function in SongPlayer object
     * @desc it plays the next song on the album tracklisting
     * unless it is the last song then it will stop the current song
     */
     SongPlayer.next = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex++;

         if(currentSongIndex > currentAlbum.songs.length-1) {

          stopSong(SongPlayer.currentSong);
         } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
         }
     };

     return SongPlayer;
  }

  angular
     .module('blocJams')
     .factory('SongPlayer', ['$rootScope', 'Fixtures',SongPlayer]);
})();

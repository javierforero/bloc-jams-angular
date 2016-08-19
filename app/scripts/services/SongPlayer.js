(function() {
  /*
  * @function SongPlayer
  * @desc function that will be passed to the factory service
  * @returns {Object} SongPlayer
  */
  function SongPlayer() {
     /*
     * @desc object that will hold public methods for playing and pausing a song
     * @type {Object}
     */
     var SongPlayer = {};
     /*
     * @desc variable that will be set to the song object
     * @type {Object}
     */
     var currentSong = null;
     /*
     * @desc Buzz object audio file
     * @type {Object}
     */
     var currentBuzzObject = null;
     /*
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
     var setSong = function(song) {

        if(currentBuzzObject){
          currentBuzzObject.stop();
          currentSong.playing = null;
        }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });

        currentSong = song;
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
     * @function in SongPlayer object
     * @desc plays a specified song
     * @param {Object} song
     */
     SongPlayer.play = function(song) {

         if(currentSong !== song) {

             setSong(song);
             playSong(song);

         } else if(currentSong == song) {

            if(currentBuzzObject.isPaused()) {

              currentBuzzObject.play();
            }
         }
     };

     /*
     * @function in SongPlayer object
     * @desc pauses a specified song
     * @param {Object} song
     */
     SongPlayer.pause = function(song) {

         currentBuzzObject.pause();
         song.playing = false;
     };

     return SongPlayer;
  }

  angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
})();

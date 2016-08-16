(function() {
    function AlbumCtrl(Fixtures) {
        this.albumData = [];
        this.albumData.push(Fixtures.getAlbum());
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();

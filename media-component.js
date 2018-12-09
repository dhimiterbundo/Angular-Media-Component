'use strict';

function mediaController ($cordovaCamera, notificationService, $log, $ionicActionSheet, $filter) {
  var vm = this;
  vm.image = vm.media;
  var translateFilter = $filter('translate');


  function showMedia () {
    var options = {
      quality: 100,
      encodingType: 0, // JPEG = 0, PNG = 1
      destinationType: 0, //DATA_URL: To return a base64 encoded string
      targetWidth: 200,
      targetHeight: 200,
      allowEdit: true,
      correctOrientation: true
    };
    $ionicActionSheet.show({
      buttons: [
        { text: translateFilter('common.camera') },
        { text: translateFilter('common.library') }
      ],
      cancelText: translateFilter('common.cancel_button'),
      cancel: function (onCancel) {
        $log.log(onCancel);
      },
      buttonClicked: function (index) {
        switch (index) {
          case 0:
            options.sourceType = 1; //Take picture from camera
            options.saveToPhotoAlbum = true;
            options.mediaType = 0;
            break;
          case 1:
            options.sourceType = 0; //Choose image from picture library
            options.saveToPhotoAlbum = false;
            options.mediaType = 0;
            break;
        }
        $cordovaCamera.getPicture(options).then(function (result) {
          if (result !== null && result !== undefined) {
            vm.media = result;
            vm.image = 'data:image/jpeg;base64,' + result;
          }
        }, function (err) {
          notificationService.error(err.data.message);
        });
        return true;
      }
    });
  }

  function getMedia (image) {
    if (!image) {
      return vm.imageDefault;
    }
    //for the case when we have the image as a base64 encoded string
    if (image.startsWith('data')) {
      return image;
    }
    return image;
  }

  vm.showMedia = showMedia;
  vm.getMedia = getMedia;

}

mediaController.$inject = ['$cordovaCamera', 'notificationService', '$log', '$ionicActionSheet', '$filter'];


angular.module('common').component('media', {
  templateUrl: 'common/components/media/media-component.html',
  restrict: 'EA',
  transclude: true,
  bindings: {
    updateMedia: '&',
    media: '=',
  },
  controllerAs: 'mediaController',
  controller: mediaController
});

# Angular-MediaUpload-Component
This is a media component , I use $cordovaCamera $ionicActionSheet to build it.

This is a single file image upload .

* Action Sheet ( pops up a select menu).
  * From Camera
  * From Library
``` javascript 
$ionicActionSheet.show({
      buttons: [
        { text: translateFilter('common.camera') },
        { text: translateFilter('common.library') }
      ],
      cancelText: translateFilter('common.cancel_button'),
      cancel: function (onCancel) {
        $log.log(onCancel);
      },
      ```
      

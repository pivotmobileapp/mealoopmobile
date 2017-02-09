/*var _view=document.getElementsByClassName('view');
console.log(_view);
console.log(document.getElementsByClassName('pane'));
      console.log(document.getElementsByTagName('ion-side-menus'));*/
/*if (_view.classList.contains('thatClass')) {
    // do some stuff
}*/
$(document).ready(function(){
  console.log ($('.view').removeClass('pane'));
  console.log ($('.menu-content').removeClass('pane'));
  console.log ($('.menu-content').removeClass('menu-animated'));
});
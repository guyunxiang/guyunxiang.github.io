$(function(){

  var url = window.location.href;

  $('#search-input').on('keypress', function(e){
    if (e.keyCode == 13) {
      handleSearch($(this).val());
    }
  });

  $('.search .fa.fa-search').on('click', function(){
    handleSearch($('#search-input').val());
  });

  function handleSearch(value) {
    if (value) {
      window.location.href = '/search/?w='+ value
    }
  }

  if (url.indexOf('search') > -1) {
    var searchVal = url.split('w=')[1];
  }

});

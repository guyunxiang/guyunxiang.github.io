$(function(){

  $('#search-input').on('keypress', function(e){
    if (e.keyCode == 13) {
      handleSearch($(this).val());
    }
  });

  $('.search .fa.fa-search').on('click', function(){
    handleSearch($('#search-input').val());
  });

  function handleSearch(value) {
    window.location.href = '/search/?w='+ value
  }

});

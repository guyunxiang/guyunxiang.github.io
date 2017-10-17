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
      window.location.href = '/search/?w='+ value.trim();
    }
  }

  if (url.indexOf('search') > -1) {
    var searchVal = decodeURIComponent(url.split('w=')[1]);
    var resultList = [];
    getList(function(data) {
      data.forEach(function(item) {
        if (
          item.title.indexOf(searchVal) > -1 ||
          item.content.indexOf(searchVal) > -1
        ) {
          resultList.push(item);
        }
      });
      renderResultList(resultList);
    });
  }

  // 获取所有文章列表
  function getList(callback) {
    $.ajax({
      url: '../search.json',
      type: 'GET',
      success: function(data) {
        callback(data);
      }
    });
  }

  // 渲染结果列表
  function renderResultList(dataList) {
    var templateHtml = '<ul class="listing">';
    if (dataList.length) {
      dataList.forEach(function(item) {
        templateHtml +=
          '<div class="listing-item">' +
            '<div class="list-post">' +
              '<a href="'+ item.url +'" title="'+ item.title +'">' +
                item.title +
              '</a>' +
              '<div class="post-time">' +
                '<span class="date">' +
                  item.url.match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/g)[0].replace(/\//g, '-') +
                '</span>' +
              '</div>' +
            '</div>' +
          '</div>';
      });
    } else {
      templateHtml += '<p>未匹配到相应文章</p>';
    }
    templateHtml += '</ul>';
    $('.search-content').html(templateHtml);
  }

});

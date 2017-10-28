$(function(){

  var url = window.location.href;

  $('.search > input').on('keypress', function(e){
    if (e.keyCode == 13) {
      handleSearch($(this).val());
    }
  });

  $('.search .fa.fa-search').on('click', function(){
    handleSearch($('#search-input').val());
  });

  function handleSearch(value) {
    if (value.trim()) {
      window.location.href = '/search/?w='+ value.trim();
    }
  }

  // 判断是否是搜索页面
  if (url.indexOf('search') > -1) {
    var searchVal = getKeyword();
    var resultList = [];
    if (!searchVal) { window.location.href = '/'; }
    $.get('../content.json', function(data) {
      data.forEach(function(item) {
        if (
          item.title.indexOf(searchVal) > -1 ||
          item.text.indexOf(searchVal) > -1
        ) {
          resultList.push(item);
        }
      });
      renderResultList(resultList);
    });
  }

  // 判断是否存在搜索关键字
  function getKeyword() {
    var keywords = decodeURIComponent(url.split('w=')[1]);
    if (url.indexOf('w=') < 0) { return null; }
    if (keywords === '') { return null; }
    return keywords;
  }

  // 渲染结果列表
  function renderResultList(dataList) {
    var templateHtml = '<ul class="listing">';
    if (dataList.length) {
      dataList.forEach(function(item) {
        templateHtml +=
          '<div class="listing-item">' +
            '<div class="list-post">' +
              '<a href="/'+ item.path +'" title="'+ item.title +'">' +
                item.title +
              '</a>' +
              '<div class="post-time">' +
                '<span class="date">' +
                  item.date +
                '</span>' +
              '</div>' +
            '</div>' +
          '</div>';
      });
    } else {
      templateHtml += '<p>返回首页重新搜索，<a href="/">点我</a></p>';
    }
    templateHtml += '</ul>';
    $('.post-information > .meta > .info').append('本次共搜索到 ' + dataList.length + ' 条结果');
    $('.search-content').html(templateHtml);
  }

});

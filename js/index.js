$(function(){

  var url = window.location.href;

  // 监听搜索框回车事件
  $('.search > input').on('keypress', function(e) {
    if (e.keyCode == 13) {
      handleSearch($(this).val());
    }
  });

  // 监听搜索框搜索按钮点击事件
  $('.search .fa.fa-search').on('click', function() {
    handleSearch($(this).siblings('input').val());
  });

  // 跳转搜索页面
  function handleSearch(value) {
    if (value.trim()) {
      $('.search > input').val('');
      window.location.href = '/search/?w='+ value.trim();
    }
  }

  // 判断是否是搜索页面
  if (url.indexOf('search') > -1) {
    var searchVal = getKeyword();
    var resultList = [];
    var el = document.createElement('div');
    if (!searchVal) { window.location.href = '/'; }
    $.get('../content.json', function(data) {
      data.forEach(function(item) {
        el.innerHTML = item.text;
        if (
          item.title.indexOf(searchVal) > -1 ||
          el.innerHTML.indexOf(searchVal) > -1
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
    var scEl = $('.search-content');
    if (dataList.length) {
      var templateHtml = '<ul class="listing">';
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
      templateHtml += '</ul>';
      scEl.html(templateHtml);
    } else {
      scEl.find('.loading-result').hide();
      scEl.find('.search-not-found').show();
    }
    $('.post-information > .meta > .info').html('本次共搜索到 ' + dataList.length + ' 条结果');
  }

});

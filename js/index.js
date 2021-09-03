$(function(){

  var url = window.location.href;
  var searchReg = null;

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
    searchReg = new RegExp(searchVal, 'gi');
    $.get('../content.json', function(data) {
      data.forEach(function(item) {
        el.innerHTML = item.text;
        if (
          item.title.search(searchReg) > -1 ||
          el.innerHTML.search(searchReg) > -1 ||
          (item.keywords || []).join().search(searchReg) > -1
        ) {
          resultList.push(item);
        }
      });
      renderResultList(resultList, searchVal);
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
  function renderResultList(dataList, searchVal) {
    var scEl = $('.search-content');
    if (dataList.length) {
      var templateHtml = '<ul class="listing">';
      dataList.forEach(function(item) {
        var itemTitle = item.title.replace(searchReg, '<span class="search-hot-words">$&</span>');
        templateHtml +=
          '<div class="listing-item">' +
            '<div class="list-post">' +
              '<a href="/'+ item.path +'" title="'+ item.title +'">' +
                itemTitle +
              '</a>' +
              '<div class="post-time">' +
                '<span class="date">' +
                  item.date +
                '</span>' +
              '</div>' +
              '<div class="post-detail">' +
                getContext(item) +
              '</div>' +
            '</div>' +
          '</div>';
      });
      templateHtml += '</ul>';
      scEl.html(templateHtml);
    } else {
      scEl.find('.loading-result').hide();
      scEl.find('.search-not-found').show();
      scEl.find('.search-not-found > .search > input').focus();
      $('.page-top > .information > .search').hide();
    }
    $('.post-information > .meta > .info').html('本次共搜索到 ' + dataList.length + ' 条结果');
  }

  // 截取搜索匹配的大致文章内容
  function getContext(item) {
    var el = document.createElement('div');
    el.innerHTML = item.text;
    var index = el.innerHTML.search(searchReg);
    var preText = '';
    var nextText = '';
    // 通过关键字匹配进来，模糊匹配上的，这种情况直接从开头取
    if (index < 0) {
      nextText = el.innerHTML.substr(0, 150).trim();
    } else {
      preText = el.innerHTML.substring(el.innerHTML.substring(0, index).lastIndexOf('。') + 1, index).replace(/(^\s*)/g,"");
      // preText 最大不超过 80 个字符串
      if (preText.length > 80) {
        preText = el.innerHTML.substring(index - 80, index).trim();
      }
      nextText = el.innerHTML.substr(index, (150 - preText.length)).trim();
    }
    return (preText + nextText).replace(searchReg, '<span class="search-hot-words">$&</span>') + '...';
  }

});

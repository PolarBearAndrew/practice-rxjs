
'use strict';

$(document).ready(initRx);

function initRx() {

  const input = $('#search');
  const source = Rx.Observable
    .fromEvent(input, 'keyup')
    .map(e => e.target.value)
    .filter(text => text.length > 2)
    .distinctUntilChanged();

  const searchResult = source
    .flatMap(searchDcardPosts)
    .map(formatResponse);

  searchResult.subscribe(posts => {
    renderResult(posts);
  });

}

function searchDcardPosts(query) {
  const API = 'https://www.dcard.tw/_api/search/posts?query=@query';
  console.log('search on Dcard - ', query);
  return $.ajax({
    url: API.replace(/@query/, query)
  }).promise();
}

function formatResponse(res) {
  return res.map(post => {
    return post.title + ' - ' + post.excerpt;
  });
}

function renderResult(values) {
  const result = $('#result');
  result.html(renderPlainHtmlList(values));
}

function renderPlainHtmlList(values) {

  if (values.length === 0) {
    return '無搜尋結果';
  }

  const LIST = '<ol>@content</ol>';
  const ITEM = '<li>@value</li>';
  return LIST.replace(/@content/, values.map(val => {
    return ITEM.replace(/@value/, val);
  }).join(''));
}

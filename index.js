
'use strict';

$('#search').keyup(function(e) {
  const value = e.target.value;
  console.log('search change', e, value);
});

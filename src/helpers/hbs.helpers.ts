import * as moment from 'moment';

function paginate(context, options) {
  if (!context.meta?.totalItems) {
    return '';
  }
  let paginate = '';
  let url = context.links.first.split('?')[0];
  let search_params = new URLSearchParams(context.links.first.split('?')[1]);
  for (let i = 0; i < context.meta?.totalPages; i++) {
    search_params.set('page', (i + 1).toString());
    search_params.set('limit', context.meta.itemsPerPage);
    const search = search_params.toString();
    const new_url = `${url}?${search}`;
    paginate +=
      '<li class="page-item ' +
      (context.meta?.currentPage == i + 1 ? 'active disabled' : '') +
      '"><a class="page-link" href="' +
      new_url +
      '">' +
      (i + 1) +
      '</a></li>';
  }

  const paramsPrev = context.links.previous
    .replace(/.*\?/g, '')
    .split('&')
    .reverse()
    .filter((e, i, a) => {
      const s = a.map((x) => x.split('=')[0]);
      return s.indexOf(e.split('=')[0]) === i;
    })
    .join('&');
  const paramsNext = context.links.next
    .replace(/.*\?/g, '')
    .split('&')
    .reverse()
    .filter((e, i, a) => {
      const s = a.map((x) => x.split('=')[0]);
      return s.indexOf(e.split('=')[0]) === i;
    })
    .join('&');

  const prev = context.links.previous.replace(/\?.*/g, '?' + paramsPrev);
  const next = context.links.next.replace(/\?.*/g, '?' + paramsNext);

  return (
    '<ul class="pagination">' +
    '<li class="page-item ' +
    (context.meta?.currentPage <= 1 ? 'disabled' : '') +
    '"><a class="page-link" href="' +
    prev +
    '">Prev</a></li>' +
    paginate +
    '<li class="page-item ' +
    (context.meta?.currentPage >= context.meta?.totalPages ? 'disabled' : '') +
    '"><a class="page-link" href="' +
    next +
    '">Next</a></li>' +
    '</ul>'
  );
}

function loop(context, page, perpage, options) {
  const count = perpage * (page - 1);
  return context + 1 + count;
}

function inlineif(condition, iftrue, iffalse, options) {
  if (condition) {
    return iftrue;
  } else {
    return iffalse;
  }
}

function inline2if(condition1, condition2, iftrue, iffalse, options) {
  if (condition1 && condition2) {
    return iftrue;
  } else {
    return iffalse;
  }
}

function compare(condition1, condition2, iftrue, iffalse, options) {
  if (condition1 == condition2) {
    return iftrue;
  } else {
    return iffalse;
  }
}

function contain(text, contain, iftrue, iffalse, options) {
  if (text?.includes(contain)) {
    return iftrue;
  } else {
    return iffalse;
  }
}

function toJson(data) {
  return JSON.stringify(data);
}

function regexp(text: string, contains, result, err) {
  if (new RegExp(contains).test(text)) {
    return result;
  }
  return err;
}

export function registerHelper(hbs) {
  hbs.registerHelper('paginate', paginate);
  hbs.registerHelper('loop', loop);
  hbs.registerHelper('inlineif', inlineif);
  hbs.registerHelper('inline2if', inline2if);
  hbs.registerHelper('compare', compare);
  hbs.registerHelper('contain', contain);
  hbs.registerHelper('toJson', toJson);
  hbs.registerHelper('regexp', regexp);
}

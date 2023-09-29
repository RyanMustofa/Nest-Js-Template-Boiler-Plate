export function getPagination(page: number, total: number, limit: number) {
  return range(page, total < limit ? 1 : total / limit);
}

function getLastDigit(t) {
  return parseInt(t.toString().slice(-1));
}

function getFirstDigits(t) {
  return parseInt(t.toString().slice(0, -1));
}

function isMultipleOf5(t) {
  return [0, 5].reduce((res, curr) => {
    return (res = res || curr === getLastDigit(t));
  }, false);
}

function isBetween0and5(t) {
  const _t = getLastDigit(t);
  return _t < 5;
}

function isBetween5and9(t) {
  const _t = getLastDigit(t);
  return (_t) => 5 && _t <= 9;
}

function appendDigit(t, d) {
  return parseInt(getFirstDigits(t).toString() + d.toString());
}

function getLeft(t) {
  if (t >= 10) {
    if (isBetween0and5(t)) return appendDigit(t, 0);
    else return appendDigit(t, 5);
  } else {
    if (t < 5) return 0;
    else return 5;
  }
}

function getSecondRightMostDigit(t) {
  return parseInt(t.toString().slice(-2, -1));
}

function incrementSecondDigit(t) {
  return t + 10;
}

function getRight(t) {
  if (t < 5) return 5;
  else if (t < 10) return 10;
  else if (isBetween0and5(t)) return appendDigit(t, 5);
  else return appendDigit(incrementSecondDigit(t), 0);
}

function range(c, m) {
  var current = c || 1,
    last = m,
    delta = 2,
    left = getLeft(c),
    right = getRight(c),
    range = [],
    rangeWithEllipsis = [],
    l,
    t;

  var rightBoundary = right < 5 ? 5 : right;
  for (var i = left; i < rightBoundary; ++i) {
    if (i < m && i > 0) range.push(i);
  }
  range.push(m);

  for (i of range) {
    if (l) {
      if (i - l === 2) {
        t = l + 1;
        rangeWithEllipsis.push(t);
      } else if (i - l !== 1) {
        rangeWithEllipsis.push('...');
      }
    }
    rangeWithEllipsis.push(i);
    l = i;
  }
  return rangeWithEllipsis;
}

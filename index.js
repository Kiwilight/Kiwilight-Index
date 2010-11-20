window.observe = Event.observe.curry(window);
window.observe('load', function(event) {
  var title = $$('.title').first();
  document.title = 'Index for ' +
    window.location.pathname;
  title.innerHTML = document.title;

  var table = $$('table').first();
  table.cellSpacing = '0px';
  table.cellPadding = '4px';
  table.className = 'index';

  var lines = table.select('tr');
  lines[0].className = 'head';
  lines[1].remove();
  lines = lines.slice(2);

  var cells = table.select('th');
  var html = cells[3].innerHTML;
  cells[3].innerHTML =
    cells[2].innerHTML;
  cells[2].innerHTML = html;
  cells[0].className = 'icon';
  cells[1].className = 'name';
  cells[2].className = 'size';
  cells[3].className = 'date';

  var M = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December' };

  lines.each(function(line) {
  line.className = 'item'; });

  var cells = table.select('td');
  while (cells.length != 0) {
    var html = cells[3].innerHTML;
    cells[3].innerHTML =
      cells[2].innerHTML;
    cells[2].innerHTML = html;
    cells[0].className = 'icon';
    cells[1].className = 'name';
    cells[2].className = 'size';
    cells[3].className = 'date';

    var text = cells[2].innerHTML;
    text = text.strip();
    if (!text.endsWith('K') ||
      !text.endsWith('M') ||
      !text.endsWith('G')) { }

    var text = cells[3].innerHTML;
    text = text.strip();
    var y = text.substring(7, 11);
    var d = text.substring(0, 2);
    d = parseInt(d).toString();
    var m = text.substring(3, 6);
    cells[3].innerHTML =
      M[m] + ' ' + d + ', ' + y;
    cells = cells.slice(4); } });

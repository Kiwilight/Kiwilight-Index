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

  var line = table.select('tr');
  line[0].className = 'head';
  var t = line[1].down().down();
  t = t.attributes[0].nodeValue;
  if (t == '/') line[1].remove();
  line.slice(1).each(function(l)
    { l.className = 'item'; });

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
    cells = cells.slice(4); }

  // Delete to disable AJAX README lookup
  var handle = function(transport) {
    var text = transport.responseText;
    text = text.escapeHTML()
    var table = $$('table').first();
    var outer = new Element('div');
    outer.className = 'outer';
    var inner = new Element('pre');
    outer.update(inner.update(text));
    table.insert({ after: outer }); }
  new Ajax.Request('README', {
  method: 'get', onSuccess: handle });
  // Delete to disable AJAX README lookup
});

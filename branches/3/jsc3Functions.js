
var myChart = new JSChart('chart_div', 'line');
myChart.setDataXML('jsc3Data.xml');
myChart.setLineWidth(3);
myChart.setSize(616, 321);
myChart.setBackgroundImage('jsc3/chart_bg.jpg');

myChart.draw();
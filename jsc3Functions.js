var myData = new Array( ['11-Mar', 100], ['12-Mar', 75], ['13-Mar', 50], ['14-Mar', 25], ['15-Mar', 0]);
var myChart = new JSChart('chart_div', 'line');

	myChart.setDataArray(myData);
	myChart.setTitle('Employee performance');
	myChart.setTitleColor('#8E8E8E');
	myChart.setTitleFontSize(11);
	myChart.setAxisNameX('');
	myChart.setAxisNameY('');
	myChart.setAxisColor('#8420CA');
	myChart.setAxisValuesColor('#949494');
	myChart.setAxisPaddingLeft(100);
	myChart.setAxisPaddingRight(120);
	myChart.setAxisPaddingTop(50);
	myChart.setAxisPaddingBottom(40);
	myChart.setAxisValuesDecimals(0);
	myChart.setAxisValuesNumberX(myData.length);
	myChart.setShowXValues(false);
	myChart.setGridColor('#C5A2DE');
	myChart.setLineColor('#BBBBBB');
	myChart.setLineWidth(2);
	myChart.setFlagColor('#9D12FD');
	myChart.setFlagRadius(4);

myChart.setTooltip(['11-Mar', '100d']);
myChart.setTooltip(['12-Mar', '75d']);
myChart.setTooltip(['13-Mar', '50d']);
myChart.setTooltip(['14-Mar', '25d']);
myChart.setTooltip(['15-Mar', '0d']);
/*
myChart.setLabelX(['11-Mar', '100']);
myChart.setLabelX(['12-Mar', '100']);
myChart.setLabelX(['13-Mar', '100']);
myChart.setLabelX(['14-Mar', '100']);
myChart.setLabelX(['15-Mar', '100']);
*/
myChart.setSize(616, 321);
myChart.setBackgroundImage('jsc3/chart_bg.jpg');

myChart.draw();
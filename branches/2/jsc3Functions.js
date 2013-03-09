var PerfLine = new Array( ['11-Mar', 100], ['12-Mar', 75], ['13-Mar', 50], ['14-Mar', 25], ['15-Mar', 0]);
var WorkRemain = new Array( ['11-Mar', 100], ['12-Mar', 90], ['13-Mar', 65], ['14-Mar', 20], ['15-Mar', 4]);
var myChart = new JSChart('chart_div', 'line');

	myChart.setDataArray(PerfLine, 'perf_line');
	myChart.setDataArray(WorkRemain, 'work_remain');
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
	myChart.setAxisValuesNumberX(PerfLine.length);
	myChart.setShowXValues(false);
	myChart.setGridColor('#C5A2DE');
	myChart.setLineColor('#00FF00', 'perf_line');
	myChart.setLineColor('#FF0000', 'work_remain');
    myChart.setLineWidth(2);
	myChart.setFlagColor('#9D12FD');
	myChart.setFlagRadius(4);

myChart.setTooltip(['11-Mar', '100d', 'perf_line']);
myChart.setTooltip(['12-Mar', '75d', 'perf_line']);
myChart.setTooltip(['13-Mar', '50d', 'perf_line']);
myChart.setTooltip(['14-Mar', '25d', 'perf_line']);
myChart.setTooltip(['15-Mar', '0d', 'perf_line']);
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
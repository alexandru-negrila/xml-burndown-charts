var xmlHttp;
var data;
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
   data = new google.visualization.DataTable();
   //getDataFromPHP();
   getDataFromXml();
}

function getDataFromXml() {
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Perf Line');
    data.addColumn('number', 'Work Remaining');
    data.addRows([  ['4-Mar', 100, 100],
                    ['5-Mar',  75,  90],
                    ['6-Mar',  50,  45],
                    ['7-Mar',  25,  10],
                    ['8-Mar',   0,   2]
                    ]);
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, {width: 500, height: 300, title: 'Company Performance'});
}

function getDataFromPHP(){
   xmlHttp=GetXmlHttpObject()
   if (xmlHttp==null)
   {
     alert ("Browser does not support HTTP Request")
     return
   }
   var url="getWorldCO2Data.php";
   xmlHttp.onreadystatechange=stateChanged ;
   xmlHttp.open("GET",url,true);
   xmlHttp.send(null);
}

function stateChanged()
{
   if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
   {
     var xmlDoc = xmlHttp.responseXML;

     //retrieve the content of the responseNode
     var chartSettings = xmlDoc.getElementsByTagName("columnlist");

     var numColumns = chartSettings[0].childNodes.length;
     var data_types = chartSettings[0].getElementsByTagName("data_type");
     var data_labels = chartSettings[0].getElementsByTagName("label");

     for (ii=0; ii<numColumns; ii++ ){
       data.addColumn(data_types[ii].textContent, data_labels[ii].textContent);
     }

     // Now get the data out of the returned XML set...
     var chartData = xmlDoc.getElementsByTagName("chart_data_set");
     var numRows = chartData[0].childNodes.length;
     data.addRows(numRows);
     var dataSet = chartData[0].getElementsByTagName("data_row");

     for (ii=0;ii<numRows;ii++){
       var nextRow = dataSet[ii].getElementsByTagName("set_element");
       var tempval = nextRow[0].textContent ;
       var strlength = tempval.length;
       data.setValue(ii, 0, tempval);

       for (jj=1;jj<numColumns;jj++){
         var tempval = nextRow[jj].textContent ;
         var strlength = tempval.length;
         data.setValue(ii, jj, parseFloat(tempval));
       }
     }
     var chart = new     google.visualization.LineChart(document.getElementById('chart_div'));
     chart.draw(data, {width: 500, height: 300, title: 'Company Performance'});

   }
}

function GetXmlHttpObject(){
     var xmlHttp=null;
     try{
         // Firefox, Opera 8.0+, Safari
       xmlHttp=new XMLHttpRequest();
     }
     catch (e){
       //Internet Explorer
       try{
         xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
       }
       catch (e){
         xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
       }
     }
   return xmlHttp;
}
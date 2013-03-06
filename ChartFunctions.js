var xmlHttp;
var data;
var swLevel = "NU00.01";

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
   data = new google.visualization.DataTable();
   //getDataFromPHP();
   getDataFromJiraXml();
}


function getDataFromJiraXml() {
    xmlHttp=GetXmlHttpObject()
    if (xmlHttp==null)
    {
     alert ("Browser does not support HTTP Request")
     return
    }
    //var url="http://localhost/xml-burndown-charts/jira_resp_" + swLevel +".xml";
    var url="http://myszin.ugu.pl/jira_resp_" + swLevel +".xml";

    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}



function stateChanged()
{
    if (xmlHttp.readyState==4 && xmlHttp.status==200)
    {
        var xmlDoc = xmlHttp.responseXML;

        txt = "<h2>Chart generated for SW Level: " + swLevel + "</h2>";
        document.getElementById("chart_head").innerHTML = txt;

        //retrieve the content of the responseNode
        issueCnt = xmlDoc.getElementsByTagName("issue")[0].getAttribute("total");
        document.getElementById("chart_div").innerHTML = "Number of issues assinged to " + swLevel + " = " + issueCnt;
        
        /*
        var chart = new     google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, {width: 500, height: 300, title: 'Company Performance'});
        */
    }
}

function getDataFromPHP(){
/*   xmlHttp=GetXmlHttpObject()
   if (xmlHttp==null)
   {
     alert ("Browser does not support HTTP Request")
     return
   }
   var url="getWorldCO2Data.php";
   xmlHttp.onreadystatechange=stateChanged ;
   xmlHttp.open("GET",url,true);
   xmlHttp.send(null);*/
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
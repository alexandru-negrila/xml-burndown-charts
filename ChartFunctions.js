var xmlHttp;
var data;
var swLevel = "NU00.01";
var dataFile = "sample.xml";

google.load("visualization", "1.0", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
   getDataFromJiraXml();
}


function getDataFromJiraXml() {
    xmlHttp=GetXmlHttpObject()
    if (xmlHttp==null)
    {
        alert ("Browser does not support HTTP Request")
        return
    }

    url = document.URL + dataFile;
    //alert(url)

    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}



function stateChanged()
{
    if (xmlHttp.readyState==4 && xmlHttp.status==200)
    {
        var startTime = new Date();
        var xmlDoc = xmlHttp.responseXML;

        txt = "<h2>Chart generated for SW Level: " + swLevel + "</h2>";
        document.getElementById("header").innerHTML = txt;
        
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Day');
        data.addColumn('number', 'Perf Line');
        data.addColumn('number', 'Work Remaining');

        //set data with days of sprint
        var sprintDur = 0;   // length of sprint in days (w/o weekends)
        var sprintDates = new Array();
        xmlNode = xmlDoc.getElementsByTagName("row")[0];
        for (var i = 0; i < xmlNode.childNodes.length; i++)
        {
            // dates in xml input are embedded in <string> tags
            // node type check is for browsers other than IE -> http://www.w3schools.com/dom/dom_mozilla_vs_ie.asp
            if ((xmlNode.childNodes[i].nodeName == "string") && (xmlNode.childNodes[i].nodeType == 1))
            {
                sprintDates[sprintDates.length] = xmlNode.childNodes[i].childNodes[0].nodeValue;
                data.addRow();
                data.setValue(sprintDur, 0, xmlNode.childNodes[i].childNodes[0].nodeValue);
                sprintDur++;
            }
        }
        //alert(sprintDates.join());

        //set data with perfect line values
        xmlNode = xmlDoc.getElementsByTagName("row")[1];
        for (i = 0, sprVals = 0; i < xmlNode.childNodes.length; i++)
        {
            if ((xmlNode.childNodes[i].nodeName == "number") && (xmlNode.childNodes[i].nodeType == 1))
            {
                //perfect line has always all values
                data.setValue(sprVals, 1, parseInt(xmlNode.childNodes[i].childNodes[0].nodeValue));
                sprVals++;
            }
        }

        //set data with work remaining values
        xmlNode = xmlDoc.getElementsByTagName("row")[2];
        for (i = 0, sprVals = 0; i < xmlNode.childNodes.length; i++)
        {
            if ((xmlNode.childNodes[i].nodeName == "number") && (xmlNode.childNodes[i].nodeType == 1))
            {
                //during sprint work remaining nodes may not contain values
                if (xmlNode.childNodes[i].childNodes[0])
                {
                    //process only those which contain numbers
                    var curVal = Number(xmlNode.childNodes[i].childNodes[0].nodeValue);
                    data.setValue(sprVals, 2, curVal);
                    sprVals++;
                }
            }
        }

        var chart = new     google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, {width: '100%', height: 300, 
                          title: 'BurnDown chart for '+ swLevel, 
                          legend: 'bottom',
                          chartArea: {left:38,top:30, width:"100%",height:"70%"}});

        var finishTime = new Date();
        document.getElementById("footer").innerHTML = "Generated in " + (finishTime.valueOf() - startTime.valueOf()) + " ms.";
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

function setChartData() {
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
    chart.draw(data, {width: 500, height: 300, title: 'Company Performance', legend: 'bottom'});
}
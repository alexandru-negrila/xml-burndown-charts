Project goal is to compare and evaluate usefulness of different solutions for drawing Burn Down charts on a website.
Used APIs:
XML/SWF charts (http://www.maani.us/xml_charts/)
Google Visualization API (https://developers.google.com/chart/)
Planned:
JS Charts (http://www.jscharts.com/)

Project is deployed at myszin.ugu.pl

Couple of assumptions:
  1. API must be available for free (even for commercial usage)
  1. generated chart must be displayed properly on any 'modern' browser (TBD: mobile versions) -> all pages shall validate xhtml1.0 strict w/o errors
  1. possibly whole generating work shall be executed on user machine -> site shall be possible to deploy on a server w/o server-side-scripting (php, ruby, etc)
  1. data for charts shall be get in JIRA-XML format
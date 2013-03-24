# script requests XML report of specified SW level via HTTP
# shall be executed on regular time basis (every day, week, etc)
# XML report is stored in file and used for creation/update of xml-data file
# for burn down chart
require 'rubygems'
require 'nokogiri'   

DEBUG = 1

# create HTTP request

# process XML response
jira_resp_dir = "/jira_reports"
if DEBUG == 1
    jira_resp_file = "/jiraResp_DU01.00_2013-03-12.xml"
else
    #create file name on basis of SW level and day
    jira_resp_file = "/jiraResp_.xml"
end

dir = File.dirname(__FILE__)
#in_file = File.new(dir+jira_resp_dir+jira_resp_file, "r")
in_file = Nokogiri::HTML(open(dir+jira_resp_dir+jira_resp_file))

puts in_file.class
puts in_file.css("title").text
in_file.xpath("//comment()").each {|comment| puts comment}

__END__
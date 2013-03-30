# script requests XML report of specified SW level via HTTP
# shall be executed on regular time basis (every day, week, etc)
# XML report is stored in file and used for creation/update of xml-data file
# for burn down chart

#search current dir first for includes
$:.unshift File.dirname(__FILE__)
require 'rubygems'
require 'nokogiri'
require 'jira_support'

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
in_file = Nokogiri::XML(open(dir+jira_resp_dir+jira_resp_file))

puts in_file.css("title").text
commts = []
in_file.xpath("//comment()").each {|comment| commts << comment.to_s}

print "Found #{commts.length} comment node(s).\n"
print "Comment class: #{commts[0].class} \n"


# check if file name matches with date reported by JIRA
if (0 == jira_sup_check_date(commts[0]))
    puts "Date is correct!"
else
    puts "Incorrect date!"
end

__END__
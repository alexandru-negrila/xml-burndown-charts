# script requests XML report of specified SW level via HTTP
# shall be executed on regular time basis (every day, week, etc)
# XML report is stored in file and used for creation/update of xml-data file
# for burn down chart

#search current dir first for includes
$:.unshift File.dirname(__FILE__)
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
in_file = Nokogiri::XML(open(dir+jira_resp_dir+jira_resp_file))

puts in_file.css("title").text
commts = []
in_file.xpath("//comment()").each {|comment| commts << comment}

print "Found #{commts.length} comment node(s).\n"
print "Comment class: #{commts[0].class} \n"


# check if file name matches with date reported by JIRA
jira_rep_wday_regex = Regexp.new('at (Mon|Tue|Wed|Thu|Fri|Sat|Sun)')
jira_rep_wday_regex.match(commts[0].to_s)
jira_rep_wday = $1
if jira_rep_wday != nil
    puts jira_rep_wday
else
    puts "wday not found!"
end

jira_rep_month_regex = Regexp.new('(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)')
jira_rep_month_regex.match(commts[0].to_s)
jira_rep_month = $1
if jira_rep_month != nil
    puts jira_rep_month
else
    puts "wday not found!"
end

jira_rep_mday_regex = Regexp.new('at (\w{3}) (\w{3}) ([0-9]{2})')
jira_rep_mday_regex.match(commts[0].to_s)
jira_rep_mday = $3
if jira_rep_mday != nil
    puts jira_rep_mday
else
    puts "mday not found!"
end

jira_rep_year_regex = Regexp.new('([0-9]{4})$')
jira_rep_year_regex.match(commts[0].to_s)
jira_rep_year = $1
if jira_rep_year != nil
    puts jira_rep_year
else
    puts "year not found!"
end

__END__
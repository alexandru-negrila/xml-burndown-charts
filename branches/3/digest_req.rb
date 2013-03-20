# script requests XML report of specified SW level via HTTP
# shall be executed on regular time basis (every day, week, etc)
# XML report is stored in file and used for creation/update of xml-data file
# for burn down chart
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
in_file = File.new(dir+jira_resp_dir+jira_resp_file, "r")

until in_file.eof
    i = in_file.readlines
    i.each do
        |line|
        puts line
    end
end

__END__
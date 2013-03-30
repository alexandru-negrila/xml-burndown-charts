# file contain suuport functions for parsing and validating JIRA xml-reports

require 'Date'

# validates date from JIRA xml-report comment
def jira_sup_check_date(str_2_chk = "")

    result = 0

    jira_rep_wday_regex = Regexp.new('at (Mon|Tue|Wed|Thu|Fri|Sat|Sun)')
    jira_rep_wday_regex.match(str_2_chk)
    jira_rep_wday = $1
    if jira_rep_wday != nil
        #puts jira_rep_wday
        jira_rep_wday = Date::ABBR_DAYNAMES.index(jira_rep_wday)
    else
        puts "wday not found!"
        result |= (1 << 0)
    end
    
    jira_rep_month_regex = Regexp.new('(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)')
    jira_rep_month_regex.match(str_2_chk)
    jira_rep_month = $1
    if jira_rep_month != nil
        #puts jira_rep_month
        jira_rep_month = Date::ABBR_MONTHNAMES.index(jira_rep_month)
    else
        puts "wday not found!"
        result |= (1 << 1)
    end

    jira_rep_mday_regex = Regexp.new('at (\w{3}) (\w{3}) ([0-9]{2})')
    jira_rep_mday_regex.match(str_2_chk)
    jira_rep_mday = $3
    if jira_rep_mday != nil
        #puts jira_rep_mday
    else
        puts "mday not found!"
        result |= (1 << 2)
    end
    
    jira_rep_year_regex = Regexp.new('([0-9]{4})$')
    jira_rep_year_regex.match(str_2_chk)
    jira_rep_year = $1
    if jira_rep_year != nil
        #puts jira_rep_year
    else
        puts "year not found!"
         result |= (1 << 3)
    end

    #check if week day matches
    chk_date = Date.new(jira_rep_year.to_i, jira_rep_month, jira_rep_mday.to_i)
    if (chk_date.wday != jira_rep_wday)
        result |= (1 << 4)
    end

    result

end
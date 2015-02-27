// ==UserScript==
// @name         Print JIRA Ticket
// @namespace    https://jira.rocket-internet.de/
// @version      0.1
// @description  Prints Jira ticket
// @author       Nikolai Besschetnov
// @match        https://jira.rocket-internet.de/browse/*
// @grant        none
// ==/UserScript==

var JiraTicketPrinter = {
   
    loadScript: function (url, callback){
        var script = document.createElement("script");
        
        script.type = "text/javascript";
        script.src = url;
        script.onload = function(){
            callback();
        };
        
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

JiraTicketPrinter.loadScript("https://127.0.0.1:90/jira-ticket/javascript/landing.js", function() {
    hydraJiraPrintTicket.run();
});

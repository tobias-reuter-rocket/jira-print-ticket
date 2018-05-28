### Samples

![sample tickets][tickets]
![sample board][board]


### Add the following code to your GreaseMonkey (FF) or User Scripts in Chrome:

```
// ==UserScript==
// @name         Print JIRA Ticket
// @namespace    https://[YOUR-PROJECT-NAME].atlassian.net/
// @version      0.1
// @description  Prints Jira ticket
// @author       Nikolai Besschetnov
// @match        https://[YOUR-PROJECT-NAME].atlassian.net/*
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

JiraTicketPrinter.loadScript("https://tobias-reuter-rocket.github.io/jira-print-ticket/javascript/landing.js", function() {
    hydraJiraPrintTicket.run();
});
```


[board]: https://tobias-reuter-rocket.github.io/jira-print-ticket/images/sample-board.jpg "Sample board"
[tickets]: https://tobias-reuter-rocket.github.io/jira-print-ticket/images/sample-tickets.jpg "Sample tickets"

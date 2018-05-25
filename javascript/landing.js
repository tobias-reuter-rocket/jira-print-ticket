var hydraJiraPrintTicket = { 
	run: function() {
		UI.createPrintButton();	
	}
};

var UI = {
    createPrintButton: function()
    {
        var operationsBar = document.getElementById('opsbar-opsbar-operations');

        var operationPrintItem = document.createElement('li');
        operationPrintItem.className = 'toolbar-item';

        var a = document.createElement('a');
        a.onclick = function() { 
            var title = encodeURIComponent(document.getElementById('summary-val').firstChild.data);
            var key = document.getElementById('key-val').firstChild.data.split('-');
            var project = key[0];
            var number = key[1];

            window.open(
                'https://tobias-reuter-rocket.github.io/jira-print-ticket/application.html?title='+title+'&project='+project+'&number='+number,
                '_blank',
                {
                    'location': 0,
                    'menubar': 0
                }
            );
        }
        a.className = 'toolbar-trigger';

        var spanText = document.createElement('span');
        spanText.className = 'trigger-label';
        spanText.appendChild(document.createTextNode('Print'));

        a.appendChild(spanText);
        operationPrintItem.appendChild(a);

        var jiraToolsBar = document.getElementById('opsbar-jira.issue.tools');
        jiraToolsBar.insertBefore(operationPrintItem, jiraToolsBar.firstChild);
    },
}
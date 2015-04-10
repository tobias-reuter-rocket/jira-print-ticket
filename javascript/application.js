
var Checkboxes = {
	draw: function(pdf) {
		pdf.setTextColor(0);
		pdf.setFontType('bold');
		pdf.setFontSize(9);

		pdf.text('Development', 10, 215);
		pdf.text('CodeReview', 150, 215);
		pdf.text('QA', 240, 215);
		pdf.text('Merge', 330, 215);

		pdf.setFontSize(8);
		pdf.setTextColor(170);
		pdf.setFontType('normal');

		pdf.rect(10, 220, 40, 30);    pdf.textEx('Who', 30, 230, 'center');
		pdf.rect(10, 250, 40, 30);    pdf.textEx('Epic\nnumber', 30, 256, 'center');
		pdf.rect(50, 220, 30, 30);    pdf.textEx('Build\ngreen', 65, 226, 'center');
		pdf.rect(50, 250, 30, 30);    pdf.textEx('Time\nlogged', 65, 256, 'center');
		pdf.rect(80, 220, 30, 30);    pdf.textEx('QA\nToDo', 95, 226, 'center');
		pdf.rect(80, 250, 30, 30);    pdf.textEx('UT\nCover', 95, 256, 'center');
		pdf.rect(110, 220, 30, 30);    pdf.textEx('Re-\nbased', 125, 226, 'center');

		pdf.rect(150, 220, 40, 30);    pdf.textEx('Who 1', 170, 230, 'center');
		pdf.rect(150, 250, 40, 30);    pdf.textEx('Comment\n& time log', 170, 256, 'center');
		pdf.rect(190, 220, 40, 30);    pdf.textEx('Who 2', 210, 230, 'center');
		pdf.rect(190, 250, 40, 30);    pdf.textEx('Rebased', 210, 261, 'center');

		pdf.rect(240, 220, 40, 30);    pdf.textEx('Who', 260, 230, 'center');
		pdf.rect(240, 250, 40, 30);    pdf.textEx('Comment\n& time log', 260, 256, 'center');
		pdf.rect(280, 220, 40, 30);    pdf.textEx('Workflow\nchecked', 300, 227, 'center');
		pdf.rect(280, 250, 40, 30);    pdf.textEx('Testcases\nneeded', 300, 256, 'center');

		pdf.rect(330, 220, 30, 30);    pdf.textEx('Who', 345, 230, 'center');
		pdf.rect(330, 250, 30, 30);    pdf.textEx('Comm-\nented', 345, 256, 'center');
		pdf.rect(360, 220, 40, 30);    pdf.textEx('Jira\nstatus', 380, 226, 'center');
		pdf.rect(360, 250, 40, 30);    pdf.textEx('Branch\ndeleted', 380, 256, 'center');
	},
	drawPointer: {
		x: 0,
		y: 0
	},
	move: function(x, y) {
		this.drawPointer.x += x;
		this.drawPointer.y += y;
	}
};

var Body = {
	draw: function(pdf, attributes) {
		pdf.setFontSize(40);
		pdf.setFontType('bold');
		this.move(10, 45);
		pdf.text(attributes.number, this.drawPointer.x, this.drawPointer.y);

		pdf.setFontSize(30);
		var titleFormatted = pdf.splitTextToSize(attributes.title, 210);
		titleFormatted = titleFormatted.length === 1 ? titleFormatted[0] : titleFormatted; // bug in textEx

		pdf.setFontType('normal');
		pdf.textEx(
			titleFormatted,
			10, 
			55,
			'left'
		);
	},
	drawPointer: {
		x: 0,
		y: 0
	},
	move: function(x, y) {
		this.drawPointer.x += x;
		this.drawPointer.y += y;
	}
}

var QR = {
	draw: function(pdf, position, image) {
		pdf.setDrawColor(0);
		pdf.setFillColor(255);
		pdf.rect(8, 210, 400, 90, 'F');
		pdf.addImage(image, 'JPEG', 220, 10, 180, 180);
	},
	drawPointer: {
		x: 0,
		y: 0
	},
	move: function(x, y) {
		this.drawPointer.x += x;
		this.drawPointer.y += y;
	}	
}

var PDF = {
	create: function(title, project, number, image) {
		pdf = new jsPDF('l','pt', 'a4');
		pdf.autoPrint();

		Body.draw(pdf, {
			title: title,
			number: number,
			project: project
		});
		QR.draw(pdf, Body.drawPointer, image);
		Checkboxes.draw(pdf);

		return pdf;
	}
}

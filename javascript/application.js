
var Checkboxes = {
	draw: function(pdf) {
		this.move(20, 110);

		pdf.setTextColor(0);
		pdf.setFontSize(10);
		pdf.setFontType('bold');
		pdf.text('Development', this.drawPointer.x, this.drawPointer.y);

		this.move(35*2+8, 0);
		pdf.text('CodeReview', this.drawPointer.x+2, this.drawPointer.y);

		this.move((35*2+8)*(-1), 5);

		pdf.setTextColor(170);
		pdf.setFontType('normal');
		pdf.setFontSize(8);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 30, 25); pdf.textEx('Who', 34, 124, 'center');
		this.move(30, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 30, 25); pdf.textEx('CI', 34+30, 124, 'center');

		this.move(50, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 30, 25); pdf.textEx('Who', 64+50+1, 124, 'center');
		this.move(30, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 30, 25); pdf.textEx('CI', 64+50+1+30, 124, 'center');

		this.move(-30-50-30, 25);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 60, 25); pdf.textEx('Time Logged', 50, 124+24, 'center');
		this.move(50+30, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 60, 25); pdf.textEx('Dev/QA Todo', 50, 124+24+24+2, 'center');

		this.move(-30-50, 25);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 60, 25); pdf.textEx('Time Logged', 50+80, 124+24, 'center');
		this.move(50+30, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 60, 25); pdf.textEx('Commented', 50+80, 124+24+24+2, 'center');

		// ------------------------------------------------------

		this.drawPointer.x = 20;
		this.move(0, 38);

		pdf.setTextColor(0);
		pdf.setFontSize(10);
		pdf.setFontType('bold');
		pdf.text('QA', this.drawPointer.x, this.drawPointer.y);

		this.move(35*2+8, 0);
		pdf.text('Reintegration', this.drawPointer.x+2, this.drawPointer.y);

		this.move((35*2+8)*(-1), 5);
		pdf.setTextColor(170);
		pdf.setFontType('normal');
		pdf.setFontSize(8);

		pdf.rect(this.drawPointer.x, this.drawPointer.y, 30, 25); pdf.textEx('Who', 34, 216, 'center');
		this.move(30, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 30, 25); pdf.textEx('CI', 34+30, 216, 'center');

		this.move(50, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 30, 25); pdf.textEx('Who', 34+30+50, 216, 'center');
		this.move(30, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 30, 25); pdf.textEx('Jira\nStatus', 34+30+50+30, 212, 'center');

		this.move(-30-50-30, 25);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 60, 25); pdf.textEx('Comments\nChecked', 50, 216+21, 'center');
		this.move(50+30, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 60, 25); pdf.textEx('Commented', 50+30+50, 216+24+1, 'center');

		this.move(-30-50, 25);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 60, 25); pdf.textEx('Commented', 50, 216+24+24+3, 'center');
		this.move(50+30, 0);
		pdf.rect(this.drawPointer.x, this.drawPointer.y, 60, 25); pdf.textEx('Branch deleted', 50+30+50, 216+24+24+3, 'center');
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
		this.move(20, 45);
		pdf.text(attributes.number, this.drawPointer.x, this.drawPointer.y);

		this.move(105, -7);
		pdf.setFontSize(30);
		var titleFormatted = pdf.splitTextToSize(attributes.title, 300);
		titleFormatted = titleFormatted.length === 1 ? titleFormatted[0] : titleFormatted; // bug in textEx

		pdf.setFontType('normal');
		pdf.textEx(
			titleFormatted,
			400, 
			10,
			'right'
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
		pdf.rect(100, 102, 400, 400, 'F');
		pdf.addImage(image, 'JPEG', 230, 110, 170, 170);
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
	create: function(title, number, image) {
		pdf = new jsPDF('l','pt', 'a4');
		pdf.autoPrint();

		Body.draw(pdf, {
			title: title,
			number: number
		});
		QR.draw(pdf, Body.drawPointer, image);
		Checkboxes.draw(pdf);

		return pdf;
	}
}

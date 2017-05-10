if(Meteor.isServer)
	{
	Picker.route('/getPDF2', function(params, req, res, next){
		var doc = new PDFDocument({size: 'A4', margin: 50});
		doc.fontSize(12);
		doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});
		res.writeHead(200, {
					 'Content-type': 'application/pdf', 'Content-Disposition': "attachment; filename=etatdeslieux.pdf"
				});			
		//res.end(xmlData);
		res.end( doc.outputSync());
	});
}
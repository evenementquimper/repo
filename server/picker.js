if(Meteor.isServer)
	{
		Picker.route('/getPDF', function(params, req, res, next){
			console.log("params: "+params);
			console.log("req: "+req);
			var doc = new PDFDocument({size: 'A4', margin: 50});
			//var doc = null;
			// Apply some transforms and render an SVG path with the even-odd fill rule
			// doc.scale(0.6)
			//    .translate(470, -380) +
			//    .path(M 250,75 L 323,301 131,161 369,161 177,301 z)
			//    .fill(red, even-odd)
			//    .restore();
			doc.fontSize(12);
			doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});
			doc.circle(100,50,50).lineWidth(3).fillOpacity(0.8).fillAndStroke("red","#900");
			
			// Fit the image within the dimensions
			// doc.image('images/lbcclogo.png', 320, 15)
   // 				.rect(320, 15, 100, 100)
   // 				.stroke()
   				//.text('Fit', 320, 0)
			//doc.image(images/lbcclogo.png, 320, 280, scale: 0.25).text(Scale, 320, 265);    
			// var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";+    
			// xmlData += "<Response>";+    
			// xmlData += "<Say voice=\"woman\" language=\"en\">Hello!</Say>";+    
			// xmlData += "</Response>";
			res.writeHead(200, {
			 'Content-type': 'application/pdf', 'Content-Disposition': "attachment; filename=etatdeslieux.pdf"
		});
			//res.end(xmlData);
			res.end( doc.outputSync());
		});
}
if(Meteor.isServer)
{

Picker.route('/getPDF', function(params, req, res, next){
 var doc = new PDFDocument({size: 'A4', margin: 50});
 //var doc = null;
 doc.fontSize(12);
 doc.text('PDFKit is simple', 10, 30, {align: 'center', width: 200});

    // var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    // xmlData += "<Response>";
    // xmlData += "<Say voice=\"woman\" language=\"en\">Hello!</Say>";
    // xmlData += "</Response>";

 res.writeHead(200, {
 'Content-type': 'application/pdf',
 'Content-Disposition': "attachment; filename=etatdeslieux.pdf"
 });
 //res.end(xmlData);
 res.end( doc.outputSync() );
});

}
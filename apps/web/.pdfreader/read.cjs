const fs = require('fs');
const pdf = require('pdf-parse');
const filePath = process.argv[2] || '/Users/kylenguyen291/Work/portfolio/src/apps/web/lib/public/SQL Final Presentation.pdf';
let dataBuffer = fs.readFileSync(filePath);
const parse = pdf.default || pdf;
parse(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(console.error);

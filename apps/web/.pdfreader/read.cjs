const fs = require('fs');
const pdf = require('pdf-parse');
let dataBuffer = fs.readFileSync('/Users/kylenguyen291/Work/portfolio/src/apps/web/lib/public/SQL Final Presentation.pdf');
pdf(dataBuffer).then(function (data) {
    console.log(data.text);
});

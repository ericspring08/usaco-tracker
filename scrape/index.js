import fetch from "node-fetch";
import DOMParser from "xmldom";

const url_base = "http://usaco.org/index.php?page=viewproblem2&cpid="

for(var i = 468;i<1238;i++) {
    const url = `${url_base}${i}`
    fetch(url).then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(html) {
        // Initialize the DOM parser
        console.log(html)
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
}

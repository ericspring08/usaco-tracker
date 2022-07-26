import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const url_base = "http://usaco.org/index.php?page=viewproblem2&cpid="

fetch(url_base + "")

for(var i = 0;i<2000;i++) {
    try {
        const url = `${url_base}${i}`
        fetch(url).then(res => res.text()).then(body => {
            fs.writeFile(path.join('problems', ), {flag: "wx"}, body, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //file written successfully
            })
        })
    } catch(e) {
        console.log(e)
    }
}

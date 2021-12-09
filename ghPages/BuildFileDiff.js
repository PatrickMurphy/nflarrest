var dft = require('diff-file-tree')

async function main(){
    var changes = await dft.diff('./nflarrest/development/', './nflarrest/', {filter: function(p){
        //console.log(p);
        if(p.indexOf("\\.git") > -1){
            return true;
        }else if(p.indexOf("\\development") > -1){
            return true;
        }else if(p.indexOf("\\devProjects") > -1){
            return true;
        }else if(p.indexOf("\\CNAME") > -1){
            return true;
        }else if(p.indexOf("\\js\\data") > -1){
            return true;
        }else if(p.indexOf("\\js\\compressed") > -1){
            return true;
        }else if(p.indexOf(".min.css") > -1){
            return true;
        }
        return false;
    }});
    console.log(changes);
}

main();
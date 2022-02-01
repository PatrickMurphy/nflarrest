var dft = require('diff-file-tree')

var filterFunction = function(p){
    if(p.indexOf("\\.git") > -1){
        return true;
    }else if(p.indexOf("\\development") > -1){
        return true;
    }else if(p.indexOf("\\devProjects") > -1){
        return true;
    }else if(p.indexOf("\\archived\\") > -1){
        return true;
    }else if(p.indexOf("\\Archived\\") > -1){
        return true;
    }else if(p.indexOf("\\Broken") > -1){
        return true;
    }else if(p.indexOf("\\CNAME") > -1){
        return true;
    }else if(p.indexOf("\\js\\data") > -1){
        return true;
    }else if(p.indexOf("\\js\\compressed") > -1){
        return true;
    }else if(p.indexOf("\\index.html") > -1){
        return true;
    }else if(p.indexOf("\\Crime.html") > -1){
        return true;
    }else if(p.indexOf("\\Player.html") > -1){
        return true;
    }else if(p.indexOf("\\Team.html") > -1){
        return true;
    }else if(p.indexOf("\\Position.html") > -1){
        return true;
    }else if(p.indexOf(".min.css") > -1){
        return true;
    }
    return false;
};

var displayLog = function(changes){
    //console.log(changes);
    for(var i = 0; i < changes.length; i++){
        var change = changes[i];
        console.log(change.change + " | " + change.path);
    }
};

async function main(){
    var changes = await dft.diff('./nflarrest/development/', './nflarrest/', {filter: filterFunction});
    displayLog(changes);
}

main();
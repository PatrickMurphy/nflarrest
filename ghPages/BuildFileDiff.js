var dft = require('diff-file-tree')

var filterFunction = function (p) {
    if (p.indexOf("\\.git") > -1) {
        return true;
    } else if (p.indexOf("\\development") > -1) {
        return true;
    } else if (p.indexOf("\\devProjects") > -1) {
        return true;
    } else if (p.indexOf("\\archived\\") > -1) {
        return true;
    } else if (p.indexOf("\\Archived\\") > -1) {
        return true;
    } else if (p.indexOf("\\Broken") > -1) {
        return true;
    } else if (p.indexOf("\\CNAME") > -1) {
        return true;
    } else if (p.indexOf("\\js\\data") > -1) {
        return true;
    } else if (p.indexOf("\\js\\compressed") > -1) {
        return true;
    } else if (p.indexOf("\\index.html") > -1) {
        return true;
    } else if (p.indexOf("\\Crime.html") > -1) {
        return true;
    } else if (p.indexOf("\\Player.html") > -1) {
        return true;
    } else if (p.indexOf("\\Team.html") > -1) {
        return true;
    } else if (p.indexOf("\\Position.html") > -1) {
        return true;
    } else if (p.indexOf(".min.css") > -1) {
        return true;
    }
    return false;
};

var displayLog = function (changes) {
    //console.log(changes);
    for (var i = 0; i < changes.length; i++) {
        var change = changes[i];
        console.log(change.change + " | " + change.path);
    }
};

var moveFiles = function (changes, onlyExisting) {
    onlyExisting = onlyExisting || false;
    //console.log(changes);
    for (var i = 0; i < changes.length; i++) {
        var change = changes[i];
        var writeFile = false;
        if (onlyExisting) {
            if (change.change == 'mod') {
                writeFile = true;
            }
        } else {
            writeFile = true;
        }
        if (writeFile) {
            var oldPath = './nflarrest/development' + change.path;
            var newPath = './nflarrest' + change.path;

            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err
                console.log(change.change + " | " + oldPath + ' File Moved to Prod ' + newPath);
            });
        }
    }
};

async function main() {
    var changes = await dft.diff('./nflarrest/development/', './nflarrest/', {
        filter: filterFunction
    });
    displayLog(changes);
    //moveFilesOpt = moveFilesOpt || false;
    //moveFiles(changes);
}

main();
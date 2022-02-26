var dft = require('diff-file-tree');
var fs = require('fs');

class BuildFileDiffModule {
    constructor(){
        
    }
    
    async init(){
        this.changes = await dft.diff('./nflarrest/development/', './nflarrest/', {
            filter: this.filterFunction
        });
    }
    
    getChanges(){
        return this.changes;
    }
    
    setChanges(changesObj){
        this.changes = changesObj;
    }
    
    // filter out file if return true, p is path parameter
    filterFunction(p) {
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
        } else if (p.indexOf("\\Methodology.html") > -1) {
            return true;
        } else if (p.indexOf("\\CrimeCategory.html") > -1) {
            return true;
        } else if (p.indexOf(".min.css") > -1) {
            return true;
        }
        return false;
    }

    displayFileChanges(changes, callback) {
        //console.log(changes);
        changes = changes || this.changes;
        for (var i = 0; i < changes.length; i++) {
            var change = changes[i];
            console.log(change.change + " | " + change.path);
        }
        callback();
    }

    moveFiles(changes, onlyExisting, callback) {
        changes = changes || this.changes;
        onlyExisting = onlyExisting || false;
        var determineWriteFile = (changeParam, onlyExistingParam) => {
            var writeFile = false;
            if (onlyExistingParam) {
                if (changeParam.change == 'mod') {
                    writeFile = true;
                }else{
                    // only exisiting set, but file was not a modification
                    writeFile = false;
                }
            } else {
                writeFile = true;
            }
            
            return writeFile;
        };
        
        // for each file change (mod, add, del?)
        for (var i = 0; i < changes.length; i++) {
            var change = changes[i];
            var writeFile = determineWriteFile(change, onlyExisting);
            
            if (writeFile) {
                var oldPath = './nflarrest/development' + change.path;
                var newPath = './nflarrest' + change.path;
                // copy file and use mode overwrite
                fs.copyFile(oldPath, newPath, function (err) {
                    if (err) throw err
                    console.log(change.change + " | " + oldPath + ' File Moved to Prod ' + newPath);
                });
            }
        }
        
        callback();
    }
}

module.exports = BuildFileDiffModule;
var fs = require('fs');
var path = require('path');
var Guid = require('guid');

exports.receiveImage = function (req, res) {
    // received image, store at <guid>.png
    var guid = Guid.create().toString();
    req.pipe(fs.createWriteStream(guid+'.png'));

    req.on('end', function() {
        // image is now stored at <guid>.png
        res.sendFile(__dirname+'/'+guid+'.png', function(){
            // remove the file
            fs.unlink(guid+'.png');
            console.log('Removed file');
        });
    });
};

exports.serveImage = function (req, res) {
    var fileLocation = path.join(path.dirname(require.main.filename), '/temp.png');
    if (fs.existsSync(fileLocation)) {
        res.sendFile(fileLocation);
    } else {
        res.status(400).send(
            {
                error: 'Sorry, a file does not exist'
            }
        )
    }
};

exports.test = function (req, res) {
    res.json(
        {
            response: 'something'
        }
    );
};
const $ = require('jquery');
const {
    ipcRenderer
} = require('electron');
const implicitFigures = require('markdown-it-implicit-figures');
const marked = require('marked');
const renderer = require('../utils/renderer');

renderer.initialize({
    hr: 5
});

////////// Upload with cookies //////////

/**
 * Step 1: Click the button, open the dialog and choose file.
 */
$('#upcover').click(() => {
    ipcRenderer.send('image-upload');
})

/**
 * Step 2: The image has been uploaded, and print the addr here.
 * 
 * Response has the format like this:
 *  {
 *      "code": 0,
 *      "data": {
 *          "size": 283382,
 *          "url": "http://i0.hdslb.com/bfs/article/24d88dea4b05f9806ebc740de1be2840eedccf5c.png"
 *      },
 *      "message": "0",
 *      "ttl": 1
 *  }
 */
ipcRenderer.on('image-uploaded', (event, response) => {
    const original = $('#markdown-input').val();
    $('#markdown-input').val(original + '\n![](' + response.data.url + ')');
    $('#markdown-input').trigger('input');
})

////////// Upload with cookies //////////

$('#markdown-input').bind('input propertychange', () => {
    let text = $('#markdown-input').val(),
        md = marked(text, {
            renderer: renderer.getLocalRenderer(),
            gfm: true,
            breaks: true,
            table: true,
        });
    $('#render-column').replaceWith('<div id="render-column">' + md + '</div>');
})

onload = () => {
    let codeMirror = CodeMirror.fromTextArea(document.getElementById('markdown-input'), {
        lineNumbers: true,
        //mode: 'htmlmixed',
        lineWrapping: true,
        styleActiveLine: true
    });

    codeMirror.setSize('100%', '100%');
    codeMirror.on('change', function (instance, obj) {
        let text = instance.getValue(),
            md = marked(text, {
                renderer: renderer.getLocalRenderer(),
                gfm: true,
                breaks: true,
                table: true,
            });
        $('#render-column').replaceWith('<div id="render-column">' + md + '</div>');
    })
}
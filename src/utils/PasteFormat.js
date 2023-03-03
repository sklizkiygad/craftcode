const pasteFormat=(text)=>{
    let map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
    return text.replace(/[&<>"']/g, function(m) {
        console.log(map[m])
        return map[m];
    });
}

export const toPasteText=(e)=>{
    e.preventDefault();
    let text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand('insertHtml', false, pasteFormat(text));
}
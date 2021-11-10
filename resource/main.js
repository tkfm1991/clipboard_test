window.onload = function() {
    CreateElem();
}

function CreateElem() {
    const btn = document.createElement('button');
    btn.setAttribute('id', 'btn-id');
    btn.setAttribute('class', 'btn copy-value');
    btn.setAttribute('data-clipboard-text', 'hogehoge');
    btn.addEventListener('mouseleave',clearTooltip);

    const img = document.createElement('img');
    img.setAttribute('src', './resource/assets/clippy.svg');
    img.setAttribute('width', '13');
    img.setAttribute('alt', 'Copy to clipboard');
    btn.appendChild(img);

    btn_area = document.getElementById('btn_area');
    btn_area.appendChild(btn);
}

// Add .tooltip class when it's clicked
function showTooltip(elem){
    elem.setAttribute('class','btn copy-value tooltip');
}

function clearTooltip(e){
    e.currentTarget.setAttribute('class','btn copy-value');
}

const clipboard_btn = new ClipboardJS('.btn');
const clipboard = new ClipboardJS('.copy-value');

clipboard_btn.on('success', function(e) {
    showTooltip(e.trigger);

    const copied_text = window.getSelection().toString();
    // before
    // host-a	ge-0/0/0	host-b	ge-0/0/0	path_a
    // after
    // host-a[ge-0/0/0] --- host-b[ge-0/0/0] Description[path_a]
    console.log('before\n' + copied_text);

    const lines = copied_text.split('\n')
    let after_lines = ''
    lines.forEach(line => {
        let split_line = line.split('\t');
        let after_line = split_line[0] + '[' + split_line[1] + ']' + ' --- ' + split_line[2] + '[' + split_line[3] + ']' + ' Desc' + '[' + split_line[4] + ']' + '\n';
        after_lines = after_lines + after_line; 
    });
    
    // console.log('after\n' + after_lines);
    // console.log(e)
    // e.text = 'test';
    // e.clipboardData.setData('text/plain', after_lines);

    // 再クリック用
    const btn = document.getElementById('btn-id'); 
    btn.setAttribute('class', 'btn copy-value');

    console.log(e)
    e.clearSelection();
});


// Select all .copy-value items
const btns = document.querySelectorAll('.copy-value');
 
// Remove .tooptip class by mouseout
for(let i=0;i<btns.length;i++){
    btns[i].addEventListener('mouseleave',clearTooltip);
}
 
clipboard.on('success', function(e) {
    showTooltip(e.trigger);
});

clipboard_btn.on('success', function(e) {

    e.clearSelection();
});

/*
document.addEventListener('copy', function (e) {
    const copied_text = window.getSelection().toString();
    // before
    // host-a	ge-0/0/0	host-b	ge-0/0/0	path_a
    // after
    // host-a[ge-0/0/0] --- host-b[ge-0/0/0] Description[path_a]
    console.log('before\n' + copied_text);

    const lines = copied_text.split('\n')
    let after_lines = ''
    lines.forEach(line => {
        let split_line = line.split('\t');
        let after_line = split_line[0] + '[' + split_line[1] + ']' + ' --- ' + split_line[2] + '[' + split_line[3] + ']' + ' Desc' + '[' + split_line[4] + ']' + '\n';
        after_lines = after_lines + after_line; 
    });

    console.log('after\n' + after_lines);
    e.clipboardData.setData('text/plain', after_lines);
    // 元のイベントが起こるのをキャンセル
    e.preventDefault();
});
*/


var clipboard = new ClipboardJS('.btn');
// クリップ成功
clipboard.on('success', (e) => {
    const title = e.trigger.dataset.clipboardTitle;
    // alert(title + 'をコピーしたよ');

    console.log(e);
    e.trigger.dataset.clipboardTitle = title + '2';
});
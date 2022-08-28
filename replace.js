function modifySelection(newValue) 
{
    var sel, range;

	if (window.getSelection) 
	{
        sel = window.getSelection();
        if (sel.rangeCount) 
		{
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(newValue));
        }
    } 
	else if (document.selection && document.selection.createRange) 
	{
        range = document.selection.createRange();
        range.text = newValue;
    }
}

chrome.extension.onMessage.addListener(function (message, sender, response) {
    modifySelection(message);
});
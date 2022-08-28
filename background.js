String.prototype.replaceAt = function(index, replacement) 
{
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}

var wordExtern = "";

function translate(word)
{	
	wordExtern = "";
	
	var engChar = ["`", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "z", "x", "c", "v", "b", "n", "m", ",", "."];
	var ruChar = ["ё", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю"];
	
	for (i = 0; i < word.length; i++) 
	{	
		if (!engChar.includes(word[i].toLowerCase()))
			wordExtern += word[i];
		else
			wordExtern += ruChar[engChar.indexOf(word[i].toLowerCase())];
	}	
}
	
translateTextCopy = function(info, tab)
{
    translate( info.selectionText);
	
	copyTextToClipboard(wordExtern);
	
	chrome.notifications.create(
		{
			type : "basic",
			message: wordExtern,
			title: "Перевод",
			iconUrl : "icon.png"
		}
	);
 };
 
 translateTextChange = function(info, tab)
{
    translate( info.selectionText);
	
	chrome.tabs.sendMessage(tab.id, wordExtern);
	
	chrome.notifications.create(
		{
			type : "basic",
			message: wordExtern,
			title: "Перевод",
			iconUrl : "icon.png"
		}
	);
 };

chrome.contextMenus.create(
	{
		id: "trans1Copy",
		title: "Перевод с эльфийского копирование",
		contexts:["selection"],
		onclick: translateTextCopy
	}
);

chrome.contextMenus.create(
	{
		id: "trans1Change",
		title: "Перевод с эльфийского замена",
		contexts:["selection"],
		onclick: translateTextChange
	}
);
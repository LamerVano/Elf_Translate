String.prototype.replaceAt = function(index, replacement) 
{
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

var wordExtern = "";
	
translateText = function(info)
{
    var word = info.selectionText;
	
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
		id: "trans1",
		title: "Перевод с эльфийского",
		contexts:["selection"],
		onclick: translateText
	}
);
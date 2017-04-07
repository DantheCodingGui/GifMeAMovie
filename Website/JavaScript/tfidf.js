function tf(summary) {
				var i;
				var index;
				var temp;
				var uniqueWords = [];
				var wordTotal;
				summary = summary.replace(/[.,\/#!$%\^&\*{\n};:{}=\-_'"`~()]/g,""); //Removes punctuation from summary.
				summary = summary.toLowerCase();	//ensures all characters are lower case.
				var words = summary.split(" "); //splits summary into word array
				totalWords = words.length; //This records the number of word in the summary.
				for (i = 0; i < words.length; ++i) {
					index = uniqueWords.map(function(e) {return e.Word}).indexOf(words[i]); //mapping function returns -1 if its the first time a word has been read, otherwise returns the words index in our unique words array.  
					if (words[i] != ""){	//Removes empty words if any have been found.
						if (index != -1) 
							++uniqueWords[index].Frequency;	//increments word's frequency counter in object.
						else {	//Once a new word is found.
							temp = {Word: words[i], Frequency: 1}; // creates object
							uniqueWords.push(temp); //Adds object to unique words array.
						}
					}
				}
				//-------------
				//sort arrar of 
				uniqueWords.sort(function(a, b){return b.Frequency - a.Frequency});	//This line orders the uniqueWords is decending order of frequency.

				var wordRanked = [];
				
				for (i = 0; i < uniqueWords.length; ++i){
						uniqueWords[i].Frequency = uniqueWords[i].Frequency / totalWords; 
				}
				return uniqueWords;
		}

function idf(summary){
			
			var tfArray = tf(summary);
			df = df.replace(/{/ig,"");
			df = df.replace(/}/ig,"");
			df = df.replace(/'/ig,"");
			
			var dfArray = df.split(":");
			var temp;
			var obj;
			var idfArray = [];
			for (i = 0; i < dfArray.length; ++i){
				temp = dfArray[i].split(",");
				obj = {Word: temp[0], Frequency: temp[1]}
				idfArray.push(obj); //Adds object to unique words array.
			}
			
			var choiceWords = [];
			var i;	//outer loop
			var j = 0; //inner loop.
		
			for (i = 0; i < tfArray.length; ++i){ 	
				//while( ( j <= idfArray.length) && (idfArray[j].Word != tfArray[i].Word))  //counter <= myDocFreq && idf not in input
				do
				{
					++j;
				} while( ( j < idfArray.length ) && (idfArray[j].Word != tfArray[i].Word)) ;
 				 
				 if (j !=  idfArray.length){
					 if(idfArray[j].Word == tfArray[i].Word)
					{
						tfArray[i].Frequency = tfArray[i].Frequency * idfArray[j].Frequency;
					} 
					}else{
						tfArray[i].Frequency = 0;	//Play with this.
					}
				
				j = 0;
			}
			
			
			//---------------
			//sort list in decending order
			tfArray.sort(function(a, b){return b.Frequency - a.Frequency});
			
			//---------------
			//remove frequency.
			//return the first x words in the list, where x is the number of desired gifs
			var numOfReturnWords = 10;
			if (tfArray.length < numOfReturnWords) {numOfReturnWords = tfArray.length}
			
			for (i = 0; i <= numOfReturnWords; ++i){
				   choiceWords[i] = tfArray[i].Word; //converts array of objects into array of words for compatability with gif API.
				}
			
			return choiceWords; //returns 10 words in an array. 
		}
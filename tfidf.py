import nltk
from collections import Counter
punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''       #The punctuation to remove from the string

counter = 0                     #Counter to keep track of how many files it has done
string = ""                     #blank string
no_punct_string = ""            #blank string

while (counter < 10000):            #To go through the 10000 film summaries

    no_punct = ""                   #Blank string
    f = open("FilmSummary/" + str(counter) + ".txt", "r")       #Open file
    string = f.read()                                           #Read file to string
    for char in string:
        if char not in punctuations:                            #If char in string is punctuaiton ignore it
            no_punct = no_punct + char                          #Add the char to the string
    f.close                                                     #Close the file
    no_punct_string = no_punct_string + no_punct[1:]            #Form a larger string what will have all the film summaries in it
    counter += 1

no_punct_string = no_punct_string.lower()                       #Turn the string to all lower case letters

idf = Counter(no_punct_string.split()).most_common()            #To generate the most common words from the files

allWords = ""
for i in range(0,len(idf)):
    wordTuple = idf[i]
    word = wordTuple[0]                                         #Just to get the word from the tuple
    allWords = allWords + word + " "

f = open("df.txt","w")              #save the output to file
f.write(str(allWords))
print(len(allWords))
f.close()

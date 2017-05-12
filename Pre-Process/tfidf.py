from collections import Counter
import re
import string
from operator import itemgetter
import os
import json
import unittest

# Calculates the term frequency for each word in a single film script
def termFreq(textList,totalWords):
    topWords = Counter(textList).most_common()
    wordTermFreq = [(pair[0], pair[1]/totalWords) for pair in topWords]
    return wordTermFreq

# Makes the text lower case and remove text tags such as \n
def textToListFormat(textInput):
    textInput = textInput.lower()   #make all the code lower case
    textList = textInput.split()    # turn text into list
    textList = [ re.sub(r'[^\w\s]','',x.replace('\\n','').replace('\\t','')) for x in textList]   #remove punctuation and get rid of //n and //t
    textList = list(filter(None, textList)) #get rid of empty elements
    return textList

#Performs the TFIDF oen script at a time by going through all the words in the filn script
def tfidf(termFreq, invDocFreq):
    i = 0;
    j = 0;
    tfidf = []

    while ((i < len(termFreq)) and (j < len(invDocFreq))):  #Go until it reaches the end of one of the lists

        if(termFreq[i][0] == invDocFreq[j][0]):     #When both the words are the same in the list
            tfidf.extend([(termFreq[i][0],"{0:.25f}".format(termFreq[i][1]*invDocFreq[j][1]))])     #TFIDF calculation
            i += 1
            j += 1
        elif(termFreq[i][0] > invDocFreq[j][0]):    #When termFreq word is further through the alphabet then invDocFreq
            j += 1
        elif(termFreq[i][0] < invDocFreq[j][0]):    #When invDocFreq word is further through the alphabet then termFreq
            i += 1

    return tfidf

#Format the Inverse Document Freq into a suitable format
def formatIDF():
    f = open("IDF/dfCalc.txt")
    idftext = f.read()
    f.close()
    idftext = idftext[1:-1].replace('(','').replace(')','').replace(' ','').replace("'",'')
    idfList = list(idftext.split(','))
    idfList = [(idfList[x], float(idfList[x+1])) for x in range (len(idfList)) if x % 2 == 0]
    return idfList

#Open files
def openFilmScripts(fileName):
    f = open("FilmScript/" + fileName)
    fileText = f.read()
    f.close()

    return fileText

#gets the recommended words for the film script
def GetTopWords(tdf):
    words = []
    for i in range (0,10):
        words += [tdf[i][0]]

    return words

if __name__ == "__main__":
    f = open("FilmAndWords.json","w")
    f.write('[')

    for filename in os.listdir("FilmScript"):
        fileText = openFilmScripts(filename)
        fileList = textToListFormat(fileText)
        totalWords = len(fileList)
        tf = termFreq(fileList,totalWords)
        tf.sort()

        idf = formatIDF()

        tdf = tfidf(tf,idf)
        tdf.sort(key=itemgetter(1))
        tdf.reverse()

        words = GetTopWords(tdf)

        filename = filename[:-4].replace("-"," ")

        f.write(json.dumps({'FilmName': filename, 'Words': words}, sort_keys=True, indent=4) + ',')

    f.write(']')
    f.close()


class test_termFreq(unittest.TestCase):

    def test_termFreq(self):
        test = ["hello","my","name","is","lewis","hello","my","is","my","cat"]
        self.assertCountEqual(termFreq(test,10), [('my',0.3),('is',0.2),('hello',0.2),('name',0.1),('lewis',0.1),('cat',0.1)])

class test_textToListFormat(unittest.TestCase):

    def test_textToListFormat(self):
        test = "HEllo my name is Hello my name is lewis hammond\\n"
        self.assertCountEqual(textToListFormat(test), ["hello","my","name","is","hello","my","name","is","lewis","hammond"])

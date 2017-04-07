from collections import Counter
import re
import string
from operator import itemgetter
from nltk.corpus import stopwords
import os
import json
from pymongo import MongoClient

# Calculates the term frequency for each word
def termFreq(textList,totalWords):
    topWords = Counter(textList).most_common()
    wordTermFreq = [(pair[0], pair[1]/totalWords) for pair in topWords]
    return wordTermFreq

# Makes the text lower case and remove text tags such as \n
def textToListFormat(textInput):
    textInput = textInput.lower()
    textList = textInput.split()
    textList = [ re.sub(r'[^\w\s]','',x.replace('\\n',' ').replace('\\t',' ')) for x in textList]
    textList = list(filter(None, textList))
    return textList

def tfidf(termFreq, invDocFreq):
    i = 0;
    j = 0;
    tfidf = []
    stop = set(stopwords.words('english'))

    while ((i < len(termFreq)) and (j < len(invDocFreq))):

        if(termFreq[i][0] == invDocFreq[j][0]):
            if termFreq[i][0] not in stop:
                tfidf.extend([(termFreq[i][0],"{0:.25f}".format(termFreq[i][1]*invDocFreq[j][1]))])
            i += 1
            j += 1
        elif(termFreq[i][0] > invDocFreq[j][0]):
            j += 1
        elif(termFreq[i][0] < invDocFreq[j][0]):
            i += 1

    return tfidf

def formatIDF():
    f = open("IDF/dfCalc.txt")
    idftext = f.read()
    f.close()
    idftext = idftext[1:-1].replace('(','').replace(')','').replace(' ','').replace("'",'')
    idfList = list(idftext.split(','))
    idfList = [(idfList[x], float(idfList[x+1])) for x in range (len(idfList)) if x % 2 == 0]
    return idfList

def openFilmScripts(fileName):
    f = open("FilmScript/" + fileName)
    fileText = f.read()
    f.close()

    return fileText

def GetTopWords(tdf):
    words = []
    for i in range (0,10):
        words += [tdf[i][0]]

    return words

if __name__ == "__main__":

    client = MongoClient('mongodb://rishi.doubletrouble.co:27017')
    db = client['gifs']

    collection = db['gifs']


    filename = "Alien-1979.txt"
    #for filename in os.listdir("FilmScript"):

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

    post = {"title": filename,
            "words": words}

    posts = db.posts
    #post_id = posts.insert_one(post).inserted_id
    #post_id


    db.collection_names(include_system_collections=False)

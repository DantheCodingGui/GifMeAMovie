import unittest
import re
import math
from collections import Counter
import os

#Read the file and return the contents
def readFile(fileID):
    f = open("../FilmScript/"+ str(fileID), "r")
    fileText = f.read()
    f.close()
    return fileText

#Format the text by making it lower case and remove punctuation
def textFormatter(fileText):
    fileText = fileText.lower()
    fileText = re.sub(r'[^\w\s]','',fileText)
    return fileText

#Turns the contents into a list and remove duplicates
def listFormat(fileText):
    fileList = fileText.split()
    fileList = list(set(fileList))
    return fileList

#Add the new list to the current list
def listExtend(currentList, fileList):
    return currentList + fileList

#Count the document frequency for each word
def documentFreq(currentList):
    return Counter(currentList).most_common()

#Calculate the document frequency for each word which is: log(TotalNumberOfDocs/NumberOfOccurences)
def documentFreqCalc(currentList, TotalDocs):
    newList = []
    for i in range(0, len(currentList)):
        wordTuple = currentList[i]
        number = wordTuple[1]
        docFreq = math.log((TotalDocs/number), 10)
        newList.append((wordTuple[0], docFreq))
    return newList

if __name__ == "__main__":
    counter = 0
    currentList = []
    for filename in os.listdir("../FilmScript"):
        fileText = readFile(filename)
        fileText = textFormatter(fileText)
        fileList = listFormat(fileText)
        currentList = listExtend(currentList, fileList)
        counter += 1

    currentList = documentFreq(currentList)
    currentList = documentFreqCalc(currentList, counter)
    currentList.sort()
    f = open("dfCalc.txt","w")
    f.write(str(currentList))
    f.close()

class test_textFormatter(unittest.TestCase):

    def test_textFormatter(self):
        self.assertEqual(textFormatter("This is the most basic input. It should work!?!?"), "this is the most basic input it should work")

class test_listFormat(unittest.TestCase):

    def test_listFormat(self):
        self.assertCountEqual(listFormat("hello this is a test"), ["hello","this","is","a","test"])

class test_listExtend(unittest.TestCase):

    def test_listExtend(self):
        self.assertEqual(listExtend(["hello","my"],["name","is","lewis"]), ["hello","my","name","is","lewis"])

class test_documentFreq(unittest.TestCase):

    def test_documentFreq(self):
        test = ["hello","my","name","is","lewis","hello","my","is","my"]
        self.assertCountEqual(documentFreq(test), [("my",3),("is",2),("hello",2),("name",1),("lewis",1)])

class test_documentFreqCalc(unittest.TestCase):

    def test_documentFreqCalc(self):
        test = [("my",3),("is",2),("hello",2),("name",1),("lewis",1)]
        testResult = [("my",0),("is",0.17609125905568124),("hello",0.17609125905568124),("name",0.47712125471966244),("lewis",0.47712125471966244)]
        self.assertCountEqual(documentFreqCalc(test,3), testResult)

import re
import math
from collections import Counter

#Read the file and return the contents
def readFile(fileID):
    f = open("FilmSummary/" + str(fileID) + ".txt", "r")
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
    fileID = 0
    currentList = []
    while (fileID < 10000 ):
        fileText = readFile(fileID)
        fileText = textFormatter(fileText)
        fileList = listFormat(fileText)
        fileList = listExtend(currentList, fileList)
        fileID += 1

    currentList = documentFreq(currentList)
    currentList = documentFreqCalc(currentList, 10000)

    f = open("dfCalc.txt","w")
    f.write(str(currentList))
    f.close()

#Unit Testing
import unittest

class Test_DocFreq(unittest.TestCase):

    #Test: Remove all punctuation and turn all characters to lower case
    #Passed: 14/02/2017
    def test_textFormatter(self):
        inputS = "String. with! Text,. in it."
        outputS = "string with text in it"
        self.assertEqual(textFormatter(inputS), outputS)

    #Test: Read the contents of a file and return them
    #Passed: 14/02/2017
    def test_readFile(self):
        fileID = "0"
        outputS = "\\nHolding a mysterious leather suitcase in his hand, Newt Scamander, a young activist wizard from England, visits New York while he is on his way to Arizona. Inside his expanding suitcase hides a wide array of diverse, magical creatures that exist among us, ranging from tiny, twig-like ones, to majestic and humongous ones. It is the middle of the 20s and times are troubled since the already fragile equilibrium of secrecy between the unseen world of wizards and the ordinary or \"No-Maj\" people that the MACUSA Congress struggles to maintain, is at risk of being unsettled. In the meantime, the voices against wizardry keep growing with daily protests led by Mary Lou Barebone and fuelled by the increasing disasters ascribed to a dark wizard, Gellert Grindelwald. At the same time, by a twist of fate, Newt\\'s precious suitcase will be switched with the identical one of an aspiring No-Maj baker, Jacob Kowalski, while demoted Auror, Tina Goldstein, arrests Newt for being an unregistered wizard. To...                ',"
        self.assertEqual(readFile(fileID), outputS)

    #Test: Turn a string into a list and remove all duplicates
    #Passed: 14/02/2017
    def test_listFormat(self):
        inputS = "the cat sat on the mat"
        outputS =["the", "cat", "sat", "on", "mat"]
        self.assertIn("cat", listFormat(inputS))
        self.assertIn("sat", listFormat(inputS))
        self.assertIn("mat", listFormat(inputS))
        self.assertIn("the", listFormat(inputS))
        self.assertIn("on", listFormat(inputS))

    #Test: Take one list and add another list to the end of it
    #Passed: 14/02/2017
    def test_listExtend(self):
        inputS1 = ["the", "cat"]
        inputS2 = ["on", "the", "mat"]
        outputS = ["the", "cat", "on", "the", "mat"]
        self.assertEqual(listExtend(inputS1, inputS2), outputS)

    #Test: See how many times each word appears in a list
    #Passed: 14/02/2017
    def test_documentFreq(self):
        inputS = ["the", "cat", "sat", "on", "the", "mat"]
        self.assertIn(("cat", 1), documentFreq(inputS))
        self.assertIn(("sat", 1), documentFreq(inputS))
        self.assertIn(("mat", 1), documentFreq(inputS))
        self.assertIn(("the", 2), documentFreq(inputS))
        self.assertIn(("on", 1), documentFreq(inputS))

    #Test: To calculate the document freq which is log(Number of Files/ Number of Occurences)
    #Passed: 14/02/2017
    def test_documentFreqCalc(self):
        inputS = [("the", 10), ("cat", 5), ("sat",3), ("on", 1)]
        outputS = [("the", 0.0), ("cat", 0.30102999566398114), ("sat", 0.5228787452803376), ("on", 1.0)]
        self.assertEqual(documentFreqCalc(inputS,10), outputS)

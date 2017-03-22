import re
import math
from collections import Counter

#Read the file and return the contents
def readFile(fileID):
    f = open("FilmSummary/"+ str(fileID) + ".txt", "r")
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
    while (fileID < 20000):
        fileText = readFile(fileID)
        fileText = textFormatter(fileText)
        fileList = listFormat(fileText)
        currentList = listExtend(currentList, fileList)
        fileID += 1

    currentList = documentFreq(currentList)
    currentList = documentFreqCalc(currentList, 20000)

    f = open("dfCalc.txt","w")
    f.write(str(currentList))
    f.close()

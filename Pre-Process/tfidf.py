from collections import Counter

#This is used to remove Punctuation from a string
def removePunctuation(string):
    punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''       #All the characters to remove from the string
    text_no_punct = ""
    for char in string:                         #Goes through every char in the string
        if char not in punctuations:            #If the char not in the punctuations string
            text_no_punct = text_no_punct + char    #Add the char to the a new string
    text_no_punct = text_no_punct.rstrip()
    text_no_punct = text_no_punct + " "
    return text_no_punct[1:]                    #Return the Text after the first char because the first char maybe the n of \n

#This is to fetch all the film summaries and return them in a string
def fetchFilmSummaries(NumOfFiles):
    counter = 0                         #A counter initalised to 0
    all_text_no_punct = ""
    while (counter < NumOfFiles):       #While counter is less than the Number of file
        f = open("FilmSummary/" + str(counter) + ".txt", "r")       #Open the file
        string = f.read()                                           #Read file contents
        f.close()                                                   #Close the file
        all_text_no_punct = all_text_no_punct + removePunctuation(string)   #Remove the punctuation from the file input and add it on a different string
        counter += 1            #Increment Counter by 1
    return all_text_no_punct    #Return all the film summaries with punctuation removed

#This is to get just the word from the list of tuples
def getWordTuples(df):
    allWords = ""
    for i in range(0,len(df)):      #For i between 0 and length of df
        wordTuple = df[i]           #To get the tuple pair (word,frequency)
        word = wordTuple[0]         #To get the word part of the tuple
        allWords = allWords + word + " "        #Just add the word to a string
    return allWords

#Main
if __name__ == '__main__':
    df = fetchFilmSummaries(10000)
    df = df.lower()             #To make all the letters lowercase
    df = Counter(df.split()).most_common()      #To get the frequency for all the words
    df = getWordTuples(df)

    #To save the output to a file
    f = open("df.txt","w")
    f.write(str(df))
    f.close()

#Unit Testing
import unittest

class Test_tfidf(unittest.TestCase):
    def test_removePunctuation(self):
        FilmSummaryFormatInput = "\nAn African-American father struggles wi[]th race relation#s in the Unite~d States while tryin\"g to raise his f\"amily in t[]he 1950s and comin//g to terms with the events of his life."
        FilmSummaryFormatOutput = "An AfricanAmerican father struggles with race relations in the United States while trying to raise his family in the 1950s and coming to terms with the events of his life "
        self.assertEqual(removePunctuation(FilmSummaryFormatInput), FilmSummaryFormatOutput)

    def test_getWordTuples(self):
        wordTuplesInput = [("The",2),("cat",5),("sat",1),("in",2)]
        wordTuplesOutput = "The cat sat in "
        self.assertEqual(getWordTuples(wordTuplesInput), wordTuplesOutput)

    def test_fetchFilmSummaries(self):
        FilmSummariesOutput = "Holding a mysterious leather suitcase in his hand Newt Scamander a young activist wizard from England visits New York while he is on his way to Arizona Inside his expanding suitcase hides a wide array of diverse magical creatures that exist among us ranging from tiny twiglike ones to majestic and humongous ones It is the middle of the 20s and times are troubled since the already fragile equilibrium of secrecy between the unseen world of wizards and the ordinary or NoMaj people that the MACUSA Congress struggles to maintain is at risk of being unsettled In the meantime the voices against wizardry keep growing with daily protests led by Mary Lou Barebone and fuelled by the increasing disasters ascribed to a dark wizard Gellert Grindelwald At the same time by a twist of fate Newts precious suitcase will be switched with the identical one of an aspiring NoMaj baker Jacob Kowalski while demoted Auror Tina Goldstein arrests Newt for being an unregistered wizard To When mysterious spacecraft touch down across the globe an elite team  led by expert linguist Louise Banks  is brought together to investigate As mankind teeters on the verge of global war Banks and the team race against time for answers  and to find them she will take a chance that could threaten her life and quite possibly humanity "
        self.assertEqual(fetchFilmSummaries(2), FilmSummariesOutput)

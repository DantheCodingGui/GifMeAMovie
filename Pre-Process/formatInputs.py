def getInput(f):
    counter = 0
    while (counter < 20000):
        ln = f.readline()
        if (ln.startswith('MV:')):
            txt = getSummary(f)
            fW = open ("FilmSummary/"+ str(counter) + ".txt", "w")
            fW.write(str(txt))
            fW.close()
            counter += 1

def getSummary(f):
    ln = f.readline()
    txt = ""
    while(not ln.startswith('---')):
        if ln.startswith('PL:'):
            txt += ln[4:]
        ln = f.readline()
    txt = removePunctuation(txt)
    return txt

def removePunctuation(string):
        punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''       #All the characters to remove from the string
        text_no_punct = ""
        for char in string:                         #Goes through every char in the string
            if char not in punctuations:            #If the char not in the punctuations string
                text_no_punct = text_no_punct + char    #Add the char to the a new string
        text_no_punct = text_no_punct.rstrip()
        text_no_punct = text_no_punct + " "
        text_no_punct = text_no_punct.replace('\n',' ')
        text_no_punct = text_no_punct.lower()
        return text_no_punct

if __name__ == '__main__':
    f = open("plot.txt","r")    #Open file
    getInput(f)
    f.close()

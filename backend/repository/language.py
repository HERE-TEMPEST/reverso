from typing import List

from .letter import LetterEntity
from .word import WordEntity

class LanguageEntity:
  def __init__(self, name: str, id: int | None = None,  letters: List[LetterEntity] = [], words: List[WordEntity] = []):
    self.name: str = name
    self.id: int | None = id
    self.letters: List[LetterEntity] = letters
    self.words: List[WordEntity] = words

  def getName(self):
    return self.name

  def getId(self):
    return self.id

  def setName(self, name: str):
    self.name = name

  def purgeLetters(self):
    self.letters = []

  def purgeWords(self):
    self.words = []

  def containsLetter(self, findLetter: LetterEntity):
    for letter in self.letters:
      if findLetter.equals(letter) is True:
        return True
    return False

  def addLetter(self, newLetter: LetterEntity):
    isExists = False
    for letter in self.letters:
      if letter.equals(newLetter):
        isExists = True
        break
    if not isExists:
      self.letters.append(newLetter)


  def removeLetter(self, removeLetter: LetterEntity):
    for letter in self.letters:
      if letter.equals(removeLetter):
        self.letters.remove(letter)
        break
    
  def getLetters(self) -> List[LetterEntity]:
    return self.letters

  def containsWord(self, findWord: WordEntity):
    for word in self.words:
      if word.equals(findWord):
        return True
    return False

  def addWord(self, newWord: WordEntity):
    isExists = False
    for word in self.words:
      if word.equals(newWord):
        isExists = True
        word.incrementOccurrences()
        break
    if not isExists:
      self.words.append(newWord)
      newWord.incrementOccurrences()

  def removeWord(self, removeWord: WordEntity):
    for word in self.words:
      if word.equals(removeWord):
        self.words.remove(word)
        break
    
  def getWords(self) -> List[WordEntity]:
    return self.words

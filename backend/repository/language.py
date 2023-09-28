from typing import List

from .letter import LetterEntity

class LanguageEntity:
  def __init__(self, name: str, id: int | None = None,  letters: List[LetterEntity] = []):
    self.name: str = name
    self.id: int | None = id
    self.letters: List[LetterEntity] = letters

  def getName(self):
    return self.name

  def getId(self):
    return self.id

  def setName(self, name: str):
    self.name = name

  def purge(self):
    self.letters = []

  def addLetter(self, newLetter: LetterEntity):
    isExists = False
    for word in self.words:
      if word.equals(newLetter):
        isExists = True
        break
    if not isExists:
      self.words.append(newLetter)


  def removeLetter(self, letter: LetterEntity):
    for _letter in self.letters:
      if letter.equals(_letter):
        self.letters.remove(_letter)
        break
    
  def getLetters(self) -> List[LetterEntity]:
    return self.letters

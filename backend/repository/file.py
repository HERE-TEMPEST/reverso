from typing import List

from .word import WordEntity

class FileEntity:
  def __init__(self, name: str, id: int | None = None,  words: List[WordEntity] = []):
    self.name: str = name
    self.id: int | None = id
    self.words: List[WordEntity] = words

  def getName(self):
    return self.name

  def getId(self):
    return self.id

  def setName(self, name: str):
    self.name = name

  def purge(self):
    self.words = []

  def addWord(self, newWord: WordEntity):
    isExists = False
    for word in self.words:
      if word.equals(newWord):
        isExists = True
        break
    if not isExists:
      self.words.append(newWord)

  def removeWord(self, entity: WordEntity):
    for word in self.words:
      if word.equals(entity):
        self.words.remove(word)
        break

  def getWords(self) -> List[WordEntity]:
    return self.words

class LetterEntity:
  def __init__(self, name: str, amountOccurrences: int, id: int | None = None):
    self.name = name.lower()
    self.amountOccurrences = int(amountOccurrences)
    self.id: int | None = id

  def getName(self):
    return self.name

  def getId(self):
    return self.id

  def setId(self, id: int):
    self.id = id

  def incrementOccurrences(self):
    self.amountOccurrences += 1

  def getAmountOccurrences(self):
    return self.amountOccurrences

  def setName(self, name: str):
    self.name = name.lower()

  def equals(self, word):
    if isinstance(word, LetterEntity):
      return self.getName() == word.getName()
    if isinstance(word, str):
      return self.getName() == word
    raise BaseException('equals gotten unknown type')


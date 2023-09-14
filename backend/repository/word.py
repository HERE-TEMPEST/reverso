class WordEntity:
  def __init__(self, name: str, id: int | None = None):
    self.name = name.lower()
    self.id: int | None = id

  def getName(self):
    return self.name

  def getId(self):
    return self.id

  def setId(self, id: int):
    self.id = id

  def setName(self, name: str):
    self.name = name.lower()

  def equals(self, word):
    if isinstance(word, WordEntity):
      return self.getName() == word.getName()
    if isinstance(word, str):
      return self.getName() == word
    raise BaseException('equals gotten unknown type')


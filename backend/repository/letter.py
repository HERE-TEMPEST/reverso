class LetterEntity:
  def __init__(self, name: str, id: int | None = None):
    if len(name) > 1 or not name.isalnum():
      raise 'not characher'
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
    if isinstance(word, LetterEntity):
      return self.getName() == word.getName()
    if isinstance(word, str):
      return self.getName() == word
    raise BaseException('equals gotten unknown type')


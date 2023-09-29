from typing import Dict, Any, List

from neo4j import GraphDatabase, Driver
from .language import LanguageEntity
from .word import WordEntity
from .file import FileEntity
from .letter import LetterEntity

class Neo4JStorage:
  def __init__(self, uri: str, user: str, password: str):
    auth = None
    if user and password:
      auth=(user, password)
    self.driver: Driver = GraphDatabase.driver(uri, auth=auth)

  def __del__(self):
    self.driver.close()

  def saveWordNode(self, word: WordEntity):
    founded = self.getWordByName(word.getName())
    if founded is not None:
      return founded
    createQuery = "CREATE (word:Word { name: $name, amountOccurrences: $amountOccurrences }) RETURN word"
    response = self.query(createQuery, { "name": word.getName(), "amountOccurrences": word.getAmountOccurrences() })
    record = response[0]
    node = record.get('word')
    return self.__mapWordNodeToEntity(node)

  def getWordByName(self, wordName: str) -> WordEntity | None:
    findQuery = "MATCH (word: Word { name: $name }) RETURN word"
    response = self.query(findQuery, { "name": wordName })
    if len(response) > 0:
      record = response[0]
      node = record.get('word')
      return self.__mapWordNodeToEntity(node)
    return None

  def getWordById(self, id: int) -> WordEntity | None:
    findQuery = "MATCH (word) WHERE ID(word) = $id RETURN word"
    response = self.query(findQuery, { "id": int(id) })
    if len(response) > 0:
      record = response[0]
      node = record.get('word')
      return self.__mapWordNodeToEntity(node)
    return None

  def getWordsByFileId(self, fileId: int) -> List[WordEntity]:
    findQuery = """
      MATCH (file:File), (word:Word) WHERE id(file)=$fileId AND (file)-[:INCLUDE]->(word) RETURN word
    """
    response = self.query(findQuery, { "fileId": int(fileId) })
    mappedWords = []
    for record in response:
      node = record.get('word')
      mappedWords.append(self.__mapWordNodeToEntity(node))
    return mappedWords
  
  def getWordsByFileName(self, fileName: str) -> List[WordEntity]:
    file = self.getFileByName(fileName)
    return file.getWords()

  def saveFileNode(self, entity: FileEntity):
    file: FileEntity = self.getFileByName(entity.getName())
    if file is not None:
      for word1 in entity.getWords():
        isNew = True
        for word2 in file.getWords():
          if word1.getName() == word2.getName():
            isNew = False
            break
        if isNew:
          word = self.saveWordNode(word1)
          self.saveRelationBetweenWordAndFile(word.getId(), file.getId())
          file.addWord(word)
      for word1 in file.getWords():
        isDeleted = True
        for word2 in entity.getWords():
          if word1.getName() == word2.getName():
            isDeleted = False
            break
        if isDeleted:
          self.removeRelationBetweenWordAndFile(word1.getId(), file.getId())
          file.removeWord(word1)
      return file
    else:
      createQuery = "CREATE (file:File { name: $name }) RETURN file"
      response = self.query(createQuery, { "name": entity.getName() })
      record = response[0]
      node = record.get('file')
      file = self.__mapFileNodeToEntity(node, [])
      for _word in entity.getWords():
        word = self.saveWordNode(_word)
        self.saveRelationBetweenWordAndFile(word.getId(), file.getId())
        file.addWord(word)
    return file

  def getAllFiles(self):
    findQuery = "MATCH (file:File) RETURN file"
    response = self.query(findQuery)
    files = []
    for record in response:
      node = record.get('file')
      mappedNode = self.__mapFileNodeToEntity(node, [])
      file = self.getFileById(mappedNode.getId())
      files.append(file)
    return files

  def getFileByName(self, fileName: str) -> FileEntity | None:
    findQuery = "MATCH (file:File { name: $name }) RETURN file"
    response = self.query(findQuery, { "name": fileName })
    if len(response) > 0:
      record = response[0]
      node = record.get('file')
      words = self.getWordsByFileId(node.element_id)
      return self.__mapFileNodeToEntity(node, words)
    return None

  def getFileById(self, fileId: int) -> FileEntity | None:
    findQuery = "MATCH (file) WHERE ID(file) = $fileId RETURN file"
    response = self.query(findQuery, { "fileId": int(fileId) })
    if len(response) > 0:
      record = response[0]
      node = record.get('file')
      words = self.getWordsByFileId(node.element_id)
      return self.__mapFileNodeToEntity(node, words)
    return None

  def matchFilesByWords(self, words: List[WordEntity]) -> List[FileEntity]:
    findQuery = """
      MATCH (file), (word) WHERE id(word) IN $words AND (file)-[:INCLUDE]->(word)
      WITH file, count(word) as wordCount
      WHERE wordCount = $countWords
      RETURN file
    """
    wordIds = []
    for word in words:
      foundedWord = self.getWordByName(word.getName())
      if foundedWord is None:
        return []
      wordIds.append(int(foundedWord.getId()))
    response = self.query(findQuery, { "words": wordIds, "countWords": len(words) })
    files = []
    for record in response:
      node = record.get('file')
      mappedNode = self.__mapFileNodeToEntity(node, [])
      file = self.getFileById(mappedNode.getId())
      files.append(file)
    return files

  def query(self, query, parameters: Dict[str, Any] | None = None, db=None):
    assert self.driver is not None, "Driver not initialized!"
    session = None
    response = None
    try:
      session = self.driver.session(database=db) if db is not None else self.driver.session()
      response = list(session.run(query, parameters))
    except Exception as e:
      print("Query failed:", e)
    finally:
      if session is not None:
          session.close()
    return response


  def saveRelationBetweenWordAndFile(self, wordId: int, fileId: int):
    relationIsExist = self.existRelationBetweenWordAndFile(wordId, fileId)    
    if relationIsExist:
      return
    findQuery = """
      MATCH (word:Word), (file:File)
      WHERE id(word)=$wordId AND id(file)=$fileId
      CREATE (file)-[relation:INCLUDE]->(word)
      RETURN relation
    """
    self.query(findQuery, { "fileId": int(fileId), "wordId": int(wordId) })
    return

  def existRelationBetweenWordAndFile(self, wordId: int, fileId: int):
    findQuery = """
      MATCH (file)-[relation:INCLUDE]->(word)
      WHERE id(word)=$wordId AND id(file)=$fileId
      RETURN relation
    """
    result = self.query(findQuery, { "fileId": int(fileId), "wordId": int(wordId) })
    return len(result) > 0

  def removeRelationBetweenWordAndFile(self, wordId: int, fileId: int):
    findQuery = """
      MATCH (word:Word)<-[relation:INCLUDE]-(file:File)
      WHERE id(word)=$wordId AND id(file)=$fileId
      DELETE relation
    """
    self.query(findQuery, { "fileId": int(fileId), "wordId": int(wordId) })
    return

  def saveRelationBetweenLetterAndLanguage(self, letterId: int, languageId: int):
    relationIsExist = self.existRelationBetweenLetterAndLanguage(letterId, languageId)    
    if relationIsExist:
      return
    findQuery = """
      MATCH (letter:Letter), (language:Language)
      WHERE id(letter)=$letterId AND id(language)=$languageId
      CREATE (language)-[relation:INCLUDE]->(letter)
      RETURN relation
    """
    self.query(findQuery, { "languageId": int(languageId), "letterId": int(letterId) })
    return

  def existRelationBetweenLetterAndLanguage(self, letterId: int, languageId: int):
    findQuery = """
      MATCH (language)-[relation:INCLUDE]->(letter)
      WHERE id(letter)=$letterId AND id(language)=$languageId
      RETURN relation
    """
    result = self.query(findQuery, { "letterId": int(letterId), "languageId": int(languageId) })
    return len(result) > 0

  def removeRelationBetweenLetterAndLanguage(self, letterId: int, languageId: int):
    findQuery = """
      MATCH (letter:Letter)<-[relation:INCLUDE]-(language:Language)
      WHERE id(letter)=$letterId AND id(language)=$languageId
      DELETE relation
    """
    self.query(findQuery, { "languageId": int(languageId), "letterId": int(letterId) })
    return

  def saveRelationBetweenWordAndLanguage(self, wordId: int, languageId: int):
    relationIsExist = self.existRelationBetweenWordAndLanguage(wordId, languageId)    
    if relationIsExist:
      return
    findQuery = """
      MATCH (word:Word), (language:Language)
      WHERE id(word)=$wordId AND id(language)=$languageId
      CREATE (language)-[relation:INCLUDE]->(word)
      RETURN relation
    """
    self.query(findQuery, { "languageId": int(languageId), "wordId": int(wordId) })
    return

  def existRelationBetweenWordAndLanguage(self, wordId: int, languageId: int):
    findQuery = """
      MATCH (language)-[relation:INCLUDE]->(word)
      WHERE id(word)=$wordId AND id(language)=$languageId
      RETURN relation
    """
    result = self.query(findQuery, { "wordId": int(wordId), "languageId": int(languageId) })
    return len(result) > 0

  def removeRelationBetweenWordAndLanguage(self, wordId: int, languageId: int):
    findQuery = """
      MATCH (word:Word)<-[relation:INCLUDE]-(language:Language)
      WHERE id(word)=$wordId AND id(language)=$languageId
      DELETE relation
    """
    self.query(findQuery, { "languageId": int(languageId), "wordId": int(wordId) })
    return

  def getWordsByLanguageId(self, languageId: int) -> List[WordEntity]:
    findQuery = """
      MATCH (language:Language), (word:Word) WHERE id(language)=$languageId AND (language)-[:INCLUDE]->(word) RETURN word
    """
    response = self.query(findQuery, { "languageId": int(languageId) })
    mappedWords = []
    for record in response:
      node = record.get('word')
      mappedWords.append(self.__mapWordNodeToEntity(node))
    return mappedWords

  def getLettersByLanguageId(self, languageId: int) -> List[LetterEntity]:
    findQuery = """
      MATCH (language:Language), (letter:Letter) WHERE id(language)=$languageId AND (language)-[:INCLUDE]->(letter) RETURN letter
    """
    response = self.query(findQuery, { "languageId": int(languageId) })
    mappedWords = []
    for record in response:
      node = record.get('letter')
      mappedWords.append(self.__mapLetterNodeToEntity(node))
    return mappedWords

  def getLanguageByName(self, languageName: str) -> LanguageEntity | None:
    findQuery = "MATCH (language:Language { name: $name }) RETURN language"
    response = self.query(findQuery, { "name": languageName })
    if len(response) > 0:
      record = response[0]
      node = record.get('language')
      letters = self.getLettersByLanguageId(node.element_id)
      words = self.getWordsByLanguageId(node.element_id)
      return self.__mapLanguageNodeToEntity(node, letters, words)
    return None

  def getLetterByName(self, letterName: str) -> LetterEntity | None:
    findQuery = "MATCH (letter:Letter { name: $name }) RETURN letter"
    response = self.query(findQuery, { "name": letterName })
    if len(response) > 0:
      record = response[0]
      node = record.get('letter')
      return self.__mapLetterNodeToEntity(node)
    return None

  def saveLetterNode(self, letter: LetterEntity):
    founded = self.getLetterByName(letter.getName())
    if founded is not None:
      return founded
    createQuery = "CREATE (letter:Letter { name: $name, amountOccurrences: $amountOccurrences  }) RETURN letter"
    response = self.query(createQuery, { "name": letter.getName(), "amountOccurrences": letter.getAmountOccurrences() })
    record = response[0]
    node = record.get('letter')
    return self.__mapLetterNodeToEntity(node)

  def saveLanguageNode(self, entity: LanguageEntity):
    language: LanguageEntity = self.getLanguageByName(entity.getName())
    if language is not None:
      for letter1 in entity.getLetters():
        isNew = True
        for letter2 in language.getLetters():
          if letter1.getName() == letter2.getName():
            isNew = False
            break
        if isNew:
          letter = self.saveLetterNode(letter1)
          self.saveRelationBetweenLetterAndLanguage(letter.getId(), language.getId())
          language.addLetter(letter)
      for letter1 in language.getLetters():
        isDeleted = True
        for letter2 in entity.getLetters():
          if letter1.getName() == letter2.getName():
            isDeleted = False
            break
        if isDeleted:
          self.removeRelationBetweenLetterAndLanguage(letter1.getId(), language.getId())
          language.removeLetter(letter1)
      for word1 in entity.getWords():
        isNew = True
        for word2 in language.getWords():
          if word1.getName() == word2.getName():
            isNew = False
            break
        if isNew:
          word = self.saveWordNode(word1)
          self.saveRelationBetweenWordAndLanguage(word.getId(), language.getId())
          language.addWord(word)
      for word1 in language.getWords():
        isDeleted = True
        for word2 in entity.getWords():
          if word1.getName() == word2.getName():
            isDeleted = False
            break
        if isDeleted:
          self.removeRelationBetweenWordAndLanguage(word1.getId(), language.getId())
          language.removeWord(word1)
      return language
    else:
      createQuery = "CREATE (language:Language { name: $name }) RETURN language"
      response = self.query(createQuery, { "name": entity.getName() })
      record = response[0]
      node = record.get('language')
      language = self.__mapLanguageNodeToEntity(node, [], [])
      for _letter in entity.getLetters():
        letter = self.saveLetterNode(_letter)
        self.saveRelationBetweenLetterAndLanguage(letter.getId(), language.getId())
        language.addLetter(letter)
      for _word in entity.getWords():
        word = self.saveWordNode(_word)
        self.saveRelationBetweenWordAndLanguage(word.getId(), language.getId()) 
        language.addWord(word)
    return language


  def __mapLetterNodeToEntity(self, node: Any):
    return LetterEntity(node['name'], node['amountOccurrences'] or 0, int(node.element_id))

  def __mapWordNodeToEntity(self, node: Any):
    return WordEntity(node['name'], node['amountOccurrences'] or 0, int(node.element_id))

  def __mapLanguageNodeToEntity(self, node: Any, letters: List[LetterEntity], words: List[WordEntity]):
    return LanguageEntity(node['name'], int(node.element_id), letters, words)

  def __mapFileNodeToEntity(self, node: Any, words: List[WordEntity]):
    return FileEntity(node['name'], int(node.element_id), words)

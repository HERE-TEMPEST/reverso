from typing import Dict, Any, List

from neo4j import GraphDatabase, Driver
from .word import WordEntity
from .file import FileEntity

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
    createQuery = "CREATE (word:Word { name: $name }) RETURN word"
    response = self.query(createQuery, { "name": word.getName() })
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

  def __mapWordNodeToEntity(self, node: Any):
    return WordEntity(node['name'], int(node.element_id))

  def __mapFileNodeToEntity(self, node: Any, words: List[WordEntity]):
    return FileEntity(node['name'], int(node.element_id), words)

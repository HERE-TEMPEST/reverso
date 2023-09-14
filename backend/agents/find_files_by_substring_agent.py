from .agnet_base import AgentBase
from repository import Neo4JStorage, WordEntity, FileEntity, FileStorage
from help import to_normal

class FindFilesBySubstringAgent(AgentBase):
  def __init__(self):
    self.neo4JStorage = Neo4JStorage("bolt://localhost:7687", "neo4j", "password")
    self.fileStorage = FileStorage("localhost:9000/", "QeTQEELnYpjfj4zz3TG2", "PoRa1jKp6Sb8tCrnfdvRYMVlyTuLTcfZoWV2uJ0p")

  def execute(self, input_words) -> str:
    words = []
    input_words = to_normal(input_words)
    for word in input_words:
      words.append(WordEntity(word))
    files = self.neo4JStorage.matchFilesByWords(words)
    # print(files)
    answer = "#"
    for file in files:
      answer += file.getName() + " "
    # print(answer)
    if len(answer) > 1:
      answer += "*" + ''.join(input_words)
    else:
      answer = "Я не нашел информацию по указанному запросу"
    return answer
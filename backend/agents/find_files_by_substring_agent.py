from .agnet_base import AgentBase
from repository import Neo4JStorage, WordEntity, FileEntity, FileStorage
from help import to_normal
import re

class FindFilesBySubstringAgent(AgentBase):
  def __init__(self):
    self.neo4JStorage = Neo4JStorage("bolt://localhost:7687", "neo4j", "password")
    self.fileStorage = FileStorage("localhost:9000/", "ADdqhW3Dr7im2uGIgYUE", "WzKYkXnxRA56J9AuHmd1Z9zPK18P6ClHX5w8jOFT")

  def execute(self, input_dict: dict) -> str:
    answer = "#"

    input_words = input_dict['words_en']
    input_str = " ".join(input_words)
    print(input_words, input_str)
    
    if '!' not in input_words and '&&' not in input_words and '||' not in input_words:
      words = []
      input_words = to_normal(input_words)
      for word in input_words:
        words.append(WordEntity(word))
      files = self.neo4JStorage.matchFilesByWords(words)

      for file in files:
        filename = file.getName()
        file_content = self.fileStorage.get(filename)
        if input_str.lower() in file_content.lower():
          answer += file.getName() + " "

    elif ('&&' in input_words or '||' in input_words) and '!' not in input_words:
      substrings = input_str.split(" || ") if '||' in input_words else input_str.split(" && ")
      input_words.remove('&&') if '&&' in input_words else input_words.remove('||')

      files_u = []
      for sub in substrings:
        sub = sub.split(' ')
        sub = to_normal(sub)
        print(sub)
        words = []
        for word in sub:
          words.append(WordEntity(word))
        files_u.append(self.neo4JStorage.matchFilesByWords(words))

      for files in files_u:
        for file in files:
          filename = file.getName()
          file_content = self.fileStorage.get(filename)
          if '&&' in input_str:
            if substrings[0].lower() in file_content.lower() and substrings[1].lower() in file_content.lower():
              if file.getName() not in answer:
                answer += file.getName() + " "
          elif '||' in input_str:
            if substrings[0].lower() in file_content.lower() or substrings[1].lower() in file_content.lower():
              answer += file.getName() + " "        

    elif ('&&' in input_words or '||' in input_words) and '!' in input_words:
      input_str1 = input_str.split(' ! ')
      input_str, not_value = input_str1

      substrings = input_str.split(" || ") if '||' in input_words else input_str.split(" && ")
      input_words.remove('&&') if '&&' in input_words else input_words.remove('||')
      input_words.remove('!')

      not_value_l = [not_value]
      not_value_l = to_normal(not_value_l)
      words_n = []
      for word in not_value_l:
        words_n.append(WordEntity(word))
      files_n = self.neo4JStorage.matchFilesByWords(words_n)

      files_u = []
      for sub in substrings:
        sub = sub.split(' ')
        sub = to_normal(sub)
        print(sub)
        words = []
        for word in sub:
          words.append(WordEntity(word))
        files_u.append(self.neo4JStorage.matchFilesByWords(words))
      
      for file1 in files_n:  
        for files in files_u:
          for file in files:
            if file1.getName() == file.getName():
              files.remove(file)

      for files in files_u:
        for file in files:
          filename = file.getName()
          file_content = self.fileStorage.get(filename)
          if '&&' in input_str:
            if substrings[0].lower() in file_content.lower() and substrings[1].lower() in file_content.lower():
              if file.getName() not in answer:
                answer += file.getName() + " "
          elif '||' in input_str:
            if substrings[0].lower() in file_content.lower() or substrings[1].lower() in file_content.lower():
              answer += file.getName() + " "    
          

    elif '&&' not in input_words and '||' not in input_words and '!' in input_words:
      words = []
      input_words.remove('!')
      input_str = " ".join(input_words)
      input_words = to_normal(input_words)
      for word in input_words:
        words.append(WordEntity(word))
      files = self.neo4JStorage.matchFilesByWords(words)
      
      files_a = self.neo4JStorage.getAllFiles()
      
      for file in files:  
        for file1 in files_a:
            if file1.getName() == file.getName():
              files_a.remove(file1)

      for file in files_a:
        answer += file.getName() + " "  

    # print(answer)
    if len(answer) > 1:
      answer += "*" + input_str
    else:
      answer = "Я не нашел информацию по указанному запросу"
    return answer
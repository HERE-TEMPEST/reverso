from agents import AgentBase, agents
from typing import List

from .message_loop import MessageResponseLoop
from .interfaces import Message, Response

from help import get_words, to_normal

class MessageListener:
  agents: List[AgentBase]
  keywords: list

  def __init__(self):
    self.agents = agents
    self.loop: MessageResponseLoop = None

    self.commands = {
      ('аниме', 'серия'): self.agents[1].execute, #FindAnimeAgent
      ('аниме', 'рейтинг'): self.agents[3].execute, #FindAnimeAgentRaiting
      ('аниме', 'жанр'): self.agents[4].execute, #FindAnimeAgentGenre
      ('аниме', 'год'): self.agents[5].execute, #FindAnimeAgentYear
      ('яой'): self.agents[2].execute, #SurpriseAgent
      ('привет'): self.agents[0].execute, #ExampleAgent
      ('добрый', 'день'): self.agents[0].execute, #ExampleAgent
      ('добрый', 'вечер'): self.agents[0].execute, #ExampleAgent
      ('добрый', 'утро'): self.agents[0].execute, #ExampleAgent
      ('салют'): self.agents[0].execute, #ExampleAgent
      ('халло'): self.agents[0].execute, #ExampleAgent
      ('хай'): self.agents[0].execute, #ExampleAgent
      ('жалко'): self.agents[6].execute, #PittyAgent
      ('помощь'): self.agents[7].execute, #HelpAgent
      ('помочь'): self.agents[7].execute, #HelpAgent
      ('что', 'уметь'): self.agents[7].execute, #HelpAgent
      ('поиск'): self.agents[8].execute, #FindFilesBySubstringAgent
    }
  
  def executeAgent(self, input_string: list, *args: list):
    answer = 'Привет'
    for keys in self.commands.keys():
      check = []
      if type(keys) is tuple:
        for key in keys:
          if key in input_string:
            check.append(1)
          else:
            check.append(0)
      else:
        if keys in input_string:
            check.append(1)
        else:
          check.append(0)

      if all(check):
          answer = self.commands[keys](*args)
      else:
        answer = 'Не могу ответить на вопрос, я еще учусь... Но скорее всего не научусь...'
        
    return answer
        

  def setLoop(self, messageResponseLoop: MessageResponseLoop):
    self.loop = messageResponseLoop


  async def done(self, response: Response):
    print(response.message)
    await self.loop.handleResponse(response)

  async def execute(self, message: Message):
    id = message.id
    body = message.message

    words, words_en = get_words(body, False, 'en')
    words = to_normal(words)

    answer = ''
    answer = self.executeAgent(words, words_en)
    
    # answer = 'что-то пошло не так'

    response = Response(id, answer)
    await self.done(response)
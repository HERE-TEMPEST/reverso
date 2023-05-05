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
    }
  
  def executeAgent(self, input_string: list, *args: list):
    answer = 'Привет'
    for keys in self.commands.keys():
      check = []
      if type(keys) is tuple:
        for key in keys:
          print(key)
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
        return answer
      else:
        answer = 'Не могу ответить на вопрос'
        
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
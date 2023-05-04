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
    self.keywords = ['аниме', 'серия', 'сериал', 'фильм', 'рейтинг', 'жанр', 'тег', 'описание', 'правда', 'яой']
  
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
    
    keywords = []
    for word in words:
      if word in self.keywords:
        keywords.append(word)

    keywords = keywords.sort()

    print('ключевые: ', keywords,' все русские слова: ', words, 'все английские слова и цифры',  words_en)

    answer = ''

    if body == 'яой':
      answer = 'Держи ссылку на прекрасное аниме: https://anime-go.online/195-skuchnyj-mir-gde-ne-suschestvuet-samoj-idei-pohabnyh-shutok.html'
    else:
      answer = 'Попробуй найти пасхалку'

    response = Response(id, answer)
    await self.done(response)
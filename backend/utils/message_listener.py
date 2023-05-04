from agents import AgentBase, agents
from typing import List

from .message_loop import MessageResponseLoop
from .interfaces import Message, Response

class MessageListener:
  agents: List[AgentBase]
  
  def __init__(self):
    self.agents = agents
    self.loop: MessageResponseLoop = None
  
  def setLoop(self, messageResponseLoop: MessageResponseLoop):
    self.loop = messageResponseLoop


  async def done(self, response: Response):
    print(response.message)
    await self.loop.handleResponse(response)

  async def execute(self, message: Message):
    id = message.id
    body = message.message

    #
    #
    #

    answer = "Hello!!!!"
    response = Response(id, answer)
    await self.done(response)
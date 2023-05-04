from agents import AgentBase, agents
from typing import List

class Message:
  id: str
  message: str

  def __init__(self, id: str, message: str):
    self.id = id
    self.message = message

class Response:
  id: str
  message: str

  def __init__(self, id: str, message: str):
    self.id = id
    self.message = message


class MessageListener:
  agents: List[AgentBase]
  
  def __init__(self):
    self.agents = agents

  def done(self, response: Response):
    print(response.message)
    pass

  async def execute(self, message: Message):
    id = message.id
    body = message.message

    #
    #
    #

    answer = "Hello!!!!"
    response = Response(id, answer)
    await self.done(response)
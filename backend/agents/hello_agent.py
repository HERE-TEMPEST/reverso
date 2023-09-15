from random import randint
from .agnet_base import AgentBase

class HelloAgent(AgentBase):
  def __init__(self):
    super().__init__()

  def execute(self, input_str: list, user_str: str) -> str: # Сюрприз агент
    answer_a = ['Привет!', 'Добрый день!', 'Халло!', '!тевирП']

    
    return answer_a[randint(0, len(answer_a)-1)]
from .agnet_base import AgentBase

class PittyAgent(AgentBase):
  def __init__(self):
    super().__init__()

  def execute(self, input_dict: dict) -> str: # Сюрприз агент
    answer = 'Жалко у пчелки'
    return answer
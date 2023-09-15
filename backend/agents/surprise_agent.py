from .agnet_base import AgentBase

class SurpriseAgent(AgentBase):
  def __init__(self):
    super().__init__()

  def execute(self, input_str: list, user_str: str) -> str: # Сюрприз агент
    answer = 'Держи ссылку на прекрасное аниме: https://anime-go.online/195-skuchnyj-mir-gde-ne-suschestvuet-samoj-idei-pohabnyh-shutok.html'
    return answer
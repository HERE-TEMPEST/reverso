from agnet_base import AgentBase

class ExampleAgent(AgentBase):
  def __init__(self):
    super().__init__()

  def execute(self, input: str) -> str:
    return "Hello!"
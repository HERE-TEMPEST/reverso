from backend.agents.agnet_base import AgentBase
from main import *

class FindAnimeAgent(AgentBase):
  def __init__(self):
    super().__init__()

  def execute(self, input: str) -> str: # Какие аниме ты знаешь?
    words = get_words(input, False)
    p_words = parse_words(words, False)

    return "Hello"
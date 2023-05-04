from abc import ABC, abstractmethod

class AgentBase(ABC):
  def __init__(self):
    pass

  @abstractmethod
  def execute(self, input: str) -> str:
    pass
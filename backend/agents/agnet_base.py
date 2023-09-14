from abc import ABC, abstractmethod
import pandas as pd


class AgentBase(ABC):
  def __init__(self):
    self.df = pd.read_csv('anime.csv')

  @abstractmethod
  def execute(self, input_str: str) -> str:
    pass
from .agnet_base import AgentBase, pd

class FindAnimeAgentGenre(AgentBase):
  def __init__(self):
    super().__init__()

  def execute(self, input_str: list, user_str: str) -> str: # Какие аниме ты знаешь?
  
    if not input_str:
      return 'Извините, не могу обработать Ваш запрос. Возможно, Вы неправильно ввелт название. Попробуйте еще раз.'

    else:
      input_str = " ".join(input_str)
      titles = self.df[self.df['title'] == input_str].reset_index()
      titles = titles['tags'][0]
      titles = titles.replace('[', '')
      titles = titles.replace(']', '')
      titles = titles.replace("'", '')

    answer = (f'Жанры выбранного аниме {input_str}: {titles}')
    return answer
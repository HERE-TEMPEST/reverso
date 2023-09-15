from .agnet_base import AgentBase, pd

class FindAnimeAgentRaiting(AgentBase):
  def __init__(self):
    super().__init__()

  def execute(self, input_str: list, user_str: str) -> str: # Какие аниме ты знаешь?
    if 'больше' in input_str:
      input_str.remove('больше')
      if not input_str:
        return 'Извините, не могу обработать Ваш запрос. Возможно, Вы ввели цифры буквами. Попробуйте еще раз.'

      titles = self.df[self.df['rating'] > float(input_str[0])]
      titles = titles.sort_values('rating')
      titles = titles.head()
      titles = list(titles['title'])

    elif 'меньше' in input_str:
      input_str.remove('меньше')
      if not input_str:
        return 'Извините, не могу обработать Ваш запрос. Возможно, Вы ввели цифры буквами. Попробуйте еще раз.'

      titles = self.df[self.df['rating'] < float(input_str[0])]
      titles = titles.sort_values('rating')
      titles = titles.head()
      titles = list(titles['title'])
    
    elif not input_str:
      return 'Извините, не могу обработать Ваш запрос. Возможно, Вы ввели цифры буквами. Попробуйте еще раз.'

    else:
      try:
        titles = self.df[self.df['rating'] == float(input_str[0])]
        titles = titles.sort_values('rating')
        titles = titles.head()
        titles = list(titles['title'])
      except :
        input_str = " ".join(input_str)
        titles = self.df[self.df['title'] == input_str].reset_index()
        titles = int(titles['rating'][0])
        return f'Рейтинг выбранного аниме {input_str}: {titles}'

    answer = (f'Топ-5 аниме с рейтингом {input_str[0]}: ')

    for item in titles:
      answer += (item + ', ')
    return answer
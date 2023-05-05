from .agnet_base import AgentBase, pd

class FindAnimeAgentYear(AgentBase):
  def __init__(self):
    super().__init__()

  def execute(self, input_str: list) -> str: # Какие аниме ты знаешь?
    if 'позже' in input_str:
      input_str.remove('позже')
      if not input_str:
        return 'Извините, не могу обработать Ваш запрос. Возможно, Вы ввели цифры буквами. Попробуйте еще раз.'

      titles = self.df[self.df['startYr'] > float(input_str[0])]
      titles = titles.sort_values('rating')
      titles = titles.head()
      titles = list(titles['title'])

    elif 'раньше' in input_str:
      input_str.remove('раньше')
      if not input_str:
        return 'Извините, не могу обработать Ваш запрос. Возможно, Вы ввели цифры буквами. Попробуйте еще раз.'

      titles = self.df[self.df['startYr'] < float(input_str[0])]
      titles = titles.sort_values('rating')
      titles = titles.head()
      titles = list(titles['title'])
    
    elif not input_str:
      return 'Извините, не могу обработать Ваш запрос. Возможно, Вы ввели цифры буквами. Попробуйте еще раз.'

    else:
      try:
        titles = self.df[self.df['startYr'] == float(input_str[0])]
        titles = titles.sort_values('rating')
        titles = titles.head()
        titles = list(titles['title'])
      except ValueError:
        input_str = " ".join(input_str)
        titles = self.df[self.df['title'] == input_str].reset_index()
        titles = int(titles['startYr'][0])
        return f'Год выхода выбранного аниме {input_str}: {titles}'


    answer = (f'Топ-5 анимe, вышедшие в {input_str[0]} году: ')
    for item in titles:
      answer += (item + ', ')
    return answer
def get_set_letters(line: str):
  letters = []
  for c in line:
      normilized = ''.join(e for e in c if e.isalnum())
      if normilized:
        letters.append(normilized)
  unique_letters = set(letters)
  return list(unique_letters)

import re
import svgling
import pymorphy2
from tinydb import TinyDB, Query
from typing import List

morph = pymorphy2.MorphAnalyzer()
db = TinyDB('./db.json')
check = Query()


def get_words(lines, type=True, lang = 'ru'):
    words = []
    if type and lang == 'ru':
        lines : list
        for line in lines:
            line1 = re.findall(r'[А-яЁё][А-яё\-]*', line)
            for word in line1:
                words.append(word.lower())

    elif not type and lang == 'ru':
        lines : str
        line1 = re.findall(r'[А-яЁё][а-яё\-]*', lines)
        for word in line1:
            words.append(word.lower())

    elif not type and lang == 'en':
        lines : str
        words_en = []
        line1 = re.findall(r'[А-яЁё][а-яё\-]*', lines)
        line2 = re.findall(r'[A-z0-9][A-z0-9\-]*', lines)
        for word in line1:
            if word == ('больше' or 'меньше' or 'позже' or 'раньше'):
                words_en.append(word)
            else:
                words.append(word.lower())
        for word in line2:
            words_en.append(word)
        return words, words_en

    return words


def parse_words(words, type = True): #words: dict or list
    parsed_words = []
    if type:
        words : dict
        for word in words.keys():
            if db.search(check.word == word):
                db.update({'amount': words[word]}, check.word == word)
                parsed_words.append(db.search(check.word == word)[0])
            else: 
                p_word = morph.parse(word)[0].tag
                parsed_words.append({'word': word, 'amount': words[word],'POS': p_word.POS, 'animacy': p_word.animacy, 'case': p_word.case, 'gender': p_word.gender, 'mood': p_word.mood,
                                'number': p_word.number, 'person': p_word.person, 'tense': p_word.tense, 'transitivity': p_word.transitivity, 'voice': p_word.voice})
    
    else:
        words : list
        for word in words:
            if db.search(check.word == word):
                parsed_words.append(db.search(check.word == word)[0])
            else:
                p_word = morph.parse(word)[0].tag
                parsed_words.append({'word': word, 'amount': 1,'POS': p_word.POS, 'animacy': p_word.animacy, 'case': p_word.case, 'gender': p_word.gender, 'mood': p_word.mood,
                                'number': p_word.number, 'person': p_word.person, 'tense': p_word.tense, 'transitivity': p_word.transitivity, 'voice': p_word.voice})
    return parsed_words

def to_normal(words: List):
    normal_words = []
    for word in words:
        n_word = morph.parse(word)[0].normal_form
        normal_words.append(n_word)

    return normal_words
    
def tree2svg(t):
    img = svgling.draw_tree(t)
    svg_data = img.get_svg()
    return svg_data
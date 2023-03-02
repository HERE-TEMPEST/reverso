from typing import Union

import re
import pymorphy2

from fastapi import FastAPI
from pydantic import BaseModel
from tinydb import TinyDB, Query
from typing import List

from collections import Counter

app = FastAPI()
morph = pymorphy2.MorphAnalyzer()
db = TinyDB('/home/needslyp/labs/sem6/EYzIIS/db.json')
check = Query()


def get_words(lines, type=True):
    
    words = []
    if type:
        lines : list
        for line in lines:
            line1 = re.findall(r'[А-я][А-я\-]*', line)
            for word in line1:
                words.append(word.lower())

    else:
        lines : str
        line1 = re.findall(r'[А-я][А-я\-]*', lines)
        for word in line1:
            words.append(word.lower())

    return words


def parse_words(words: dict):
    parsed_words = []
    for word in words.keys():

        if db.search(check.word == word):
            parsed_words.append({'word': word, 'amount': words[word],'POS': p_word.POS, 'animacy': p_word.animacy, 'case': p_word.case, 'gender': p_word.gender, 'mood': p_word.mood,
                              'number': p_word.number, 'person': p_word.person, 'tense': p_word.tense, 'transitivity': p_word.transitivity, 'voice': p_word.voice})
        else: 
            p_word = morph.parse(word)[0].tag
            parsed_words.append({'word': word, 'amount': words[word],'POS': p_word.POS, 'animacy': p_word.animacy, 'case': p_word.case, 'gender': p_word.gender, 'mood': p_word.mood,
                              'number': p_word.number, 'person': p_word.person, 'tense': p_word.tense, 'transitivity': p_word.transitivity, 'voice': p_word.voice})
    
    return parsed_words


class Word(BaseModel):
    word: str
    amount: int
    POS: Union[str, None] = None
    animacy: Union[str, None] = None
    case: Union[str, None] = None
    gender: Union[str, None] = None
    mood: Union[str, None] = None
    number: Union[str, None] = None
    person: Union[str, None] = None
    tense: Union[str, None] = None
    transitivity: Union[str, None] = None
    voice: Union[str, None] = None


@app.get('/file/get')
def get_words_from_file(file_path: str):
    try:
        f = open(file_path, 'r')
        lines = f.readlines()
        
        words = get_words(lines, True)
        word_counts = Counter(words)
        print(word_counts)

        parsed_words = parse_words(word_counts)

        f.close()

    except FileNotFoundError:
        return {'msg': 'file not found, dude'}
    
    except IsADirectoryError:
        return {'msg': 'it\'s not a file, dude'}


    return {'file': file_path, 'text': lines, 'words': parsed_words}


@app.get('/text/get')
def get_words_from_text(text: str):
    words = get_words(text, False)
    word_counts = Counter(words)

    parsed_words = parse_words(word_counts)

    return {'text': text, 'words': parsed_words}


@app.get('/db/get')
def get_all_fromd_db():
    return {'db': db.all()}


@app.post('/db/post')
def save_and_update_db(words: List[Word]):
    for word in words:
        print(word.word) 
        if db.search(check.word == word.word):
            db.update({'word': word.word, 'amount': word.amount,'POS': word.POS, 'animacy': word.animacy, 'case': word.case, 'gender': word.gender, 'mood': word.mood,
                              'number': word.number, 'person': word.person, 'tense': word.tense, 'transitivity': word.transitivity, 'voice': word.voice})
        else: 
            db.insert({'word': word.word, 'amount': word.amount,'POS': word.POS, 'animacy': word.animacy, 'case': word.case, 'gender': word.gender, 'mood': word.mood,
                              'number': word.number, 'person': word.person, 'tense': word.tense, 'transitivity': word.transitivity, 'voice': word.voice})
    return {'msg': 'db is updated, dude'}

@app.delete('/db/word/del')
def delete_word(word: str):
    if db.search(check.word == word):
        db.remove(check.word == word)
        return {'msg': 'word is deleted, dude'}
    else:
        return {'msg': 'word is not exist, dude'}

@app.delete('/db/del')
def clear_db():
    db.truncate()
    return {'msg': 'db is clear, dude'}


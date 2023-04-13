from typing import Union

import re
import pymorphy2
import nltk
from fastapi.staticfiles import StaticFiles
import svgling
import cairosvg


import pathlib
import spacy
from spacy import displacy
from fastapi import FastAPI
from pydantic import BaseModel
from tinydb import TinyDB, Query
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from nltk.parse.recursivedescent import RecursiveDescentParser
from nltk.grammar import CFG
from nltk.tree import *
from nltk.tree.prettyprinter import TreePrettyPrinter

from collections import Counter

app = FastAPI()
morph = pymorphy2.MorphAnalyzer()
db = TinyDB('./db.json')
check = Query()
nlp = spacy.load("ru_core_news_sm")

app.mount("/images", StaticFiles(directory="images"), name="images")

origins = [
   "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_words(lines, type=True):
    words = []
    if type:
        lines : list
        for line in lines:
            line1 = re.findall(r'[А-яЁё][А-яё\-]*', line)
            for word in line1:
                words.append(word.lower())

    else:
        lines : str
        line1 = re.findall(r'[А-яЁё][а-яё\-]*', lines)
        for word in line1:
            words.append(word.lower())

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

def tree2svg(t):
    img = svgling.draw_tree(t)
    svg_data = img.get_svg()
    return svg_data

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

class Text(BaseModel):
    text: str

@app.get('/file/get')
def get_words_from_file(file_path: str):
    try:
        f = open(file_path, 'r')
        lines = f.readlines()
        
        words = get_words(lines, True)
        word_counts = Counter(words)
        print(word_counts)

        parsed_words = parse_words(word_counts, type = True)

        f.close()

    except FileNotFoundError:
        return {'msg': 'file not found, dude'}
    
    except IsADirectoryError:
        return {'msg': 'it\'s not a file, dude'}


    return {'file': file_path, 'text': lines, 'words': parsed_words}


@app.post('/text/post')
def get_words_from_text(text: Text):
    words = get_words(text.text, False)
    word_counts = Counter(words)

    parsed_words = parse_words(word_counts, type = True)

    return {'text': text.text, 'words': parsed_words}


@app.get('/db/get')
def get_all_from_db():
    return {'db': db.all()}


@app.post('/db/post')
def save_and_update_db(words: List[Word]):
    for word in words:
        if db.search(check.word == word.word):
            db.update({'amount': word.amount,'POS': word.POS, 'animacy': word.animacy, 'case': word.case, 'gender': word.gender, 'mood': word.mood,
                              'number': word.number, 'person': word.person, 'tense': word.tense, 'transitivity': word.transitivity, 'voice': word.voice}, check.word == word.word)
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

@app.post('/sentence/post')
def scheme_from_sentences(sentences: List[Text]):
    pathes = []
    for sentence in sentences:
        doc = nlp(sentence.text)
        svg = displacy.render(doc, style="dep", jupyter=False)
        file_name = '_'.join([doc[i].text for i in range(min(len(doc), 4)) if not doc[i].is_punct]) + ".svg"
        output_path = pathlib.Path("./images/" + file_name)
        pathes.append(output_path)
        output_path.open("w", encoding="utf-8").write(svg)
    return {'msg': 'svg are created', 'files': pathes}

@app.post('/sentence/post_tree')
def tree_from_sentences(sentences: List[Text]):
    answer = []
    for sentence in sentences:
        words = get_words(sentence.text, type=False)
        parsed_words = parse_words(words, type = False)
    
        pre_grammar = """S -> NP VP | VP NP | VP PP | NP | VP \n
        PP -> PREP NP | PREP NUM \n
        CP -> CONJ NP | CONJ VP | CONJ AP | CONJ PRP | CONJ NUM \n
        NP -> N | NPR | NPR NP | NUM NP | AP NP | N NP | N PP | PRP NP | N CP | ADV NP \n 
        VP -> V | V INT | V PP | V NP | PP VP | V ADV | V ADJ | V PRT | ADV VP | V NPR | V GRN | GRN VP | CP VP | V CP \n
        AP -> ADJ | NPR AP | ADV ADJ | ADJ AP | ADJ CP \n
        PRP -> PRT | NPR PRP | GRN PRT | PRT PRP | PRT CP \n
        """

        for word in parsed_words:
            if word['POS'] == "NOUN":
                x = """N -> \'""" + word["word"] + '\'\n' # имя существительное
                pre_grammar = pre_grammar + x
            elif word['POS'] == "VERB" or word['POS'] == "INFN":
                x = """V -> \'""" + word["word"] + '\'\n' # глагол
                pre_grammar = pre_grammar + x
            elif word['POS'] == "ADJF" or word['POS'] == "ADJS":
                x = """ADJ -> \'""" + word["word"] + '\'\n' # имя прилагательное
                pre_grammar = pre_grammar + x
            elif word['POS'] == "ADVB" or word['POS'] == "COMP" or word['POS'] == "PRED":
                x = """ADV -> \'""" + word["word"] + '\'\n' # наречие
                pre_grammar = pre_grammar + x
            elif word['POS'] == "PRTF" or word['POS'] == "PRTS":
                x = """PRT -> \'""" + word["word"] + '\'\n' # причастие
                pre_grammar = pre_grammar + x
            elif word['POS'] == "GRND":
                x = """GRN -> \'""" + word["word"] + '\'\n' # деепричастие
                pre_grammar = pre_grammar + x
            elif word['POS'] == "NUMR":
                x = """NUM -> \'""" + word["word"] + '\'\n' # числительное
                pre_grammar = pre_grammar + x
            elif word['POS'] == "CONJ":
                x = """CONJ -> \'""" + word["word"] + '\'\n' # союз
                pre_grammar = pre_grammar + x
            elif word['POS'] == "PREP":
                x = """PREP -> \'""" + word["word"] + '\'\n' # предлог
                pre_grammar = pre_grammar + x
            elif word['POS'] == "NPRO":
                x = """NPR -> \'""" + word["word"] + '\'\n' # местоимение
                pre_grammar = pre_grammar + x 
            elif word['POS'] == "PRCL" or word['POS'] == "INTJ":
                x = """INT -> \'""" + word["word"] + '\'\n' # частица и междометие
                pre_grammar = pre_grammar + x       

        grammar = CFG.fromstring(pre_grammar)
        
        rd = RecursiveDescentParser(grammar)

        pre_answer = []
        count = 0
        for t in rd.parse(words):
            if count < 3:
                name = 'images/' + '_'.join(words[i] for i in range(min(len(words), 4))) + '_' + str(count) + '.png'
                sv = tree2svg(t)
                cairosvg.svg2png(sv.tostring(), write_to=name)
                dict_1 = {}
                dict_1['str'] = str(t)
                dict_1['tree'] = TreePrettyPrinter(t).text()
                dict_1['path'] = name
                pre_answer.append(dict_1)
                count = count + 1

        answer.append(pre_answer)
    return {'msg': answer}

@app.post('/sentence/post_subtree')
def subtree_from_tree(tree: List[Text]):
    answer = []
    for tr in tree:
        words = get_words(tr.text, type=False)
        dict_1 = {}
        dict_1['str'] = tr.text
        _tr = Tree.fromstring(tr.text)
        dict_1['tree'] = TreePrettyPrinter(_tr).text()
        sv = tree2svg(_tr)

        name = 'images/' + '_'.join(words[i] for i in range(min(len(words), 4))) + '.png'
        cairosvg.svg2png(sv.tostring(), write_to=name)
        dict_1['path'] = name
        answer.append(dict_1)
    return {'msg': answer}

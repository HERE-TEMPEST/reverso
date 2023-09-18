from typing import Union, Annotated

from fastapi.staticfiles import StaticFiles
from wiki_ru_wordnet import WikiWordnet
from cairosvg import svg2png
from uuid import uuid4

import time
import pathlib
import spacy
from spacy import displacy
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, File
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from nltk.parse.recursivedescent import RecursiveDescentParser
from nltk.grammar import CFG
from nltk.tree import *
from nltk.tree.prettyprinter import TreePrettyPrinter

from utils import ConnectionManager, MessageListener, MessageResponseLoop
from repository import Neo4JStorage, WordEntity, FileEntity, FileStorage

from help import get_words, to_normal

# вот так мы подключаемся и работаем с neo4j
neo4JStorage = Neo4JStorage("bolt://localhost:7687", "neo4j", "password")
#"X2Kn8DhdKjrzm3t5kg2s", "H8O4HYfXsF74kcHRxUXDXktvW0TxEdYCHxAC8XLt"
fileStorage = FileStorage("localhost:9000/", "BhZ5eECrlRHBlq0SaV3z", "Psa5FZhEEYEToCsGRxpPJeZ5Jj3fzJTmMbhdfQO9")

# word2 = neo4JStorage.saveWordNode(WordEntity("Alesya"))
# word = neo4JStorage.saveWordNode(WordEntity("Nikita"))
# word1 = neo4JStorage.saveWordNode(WordEntity("Andrei"))
# file = FileEntity("FileAndrei")
# file.addWord(word)
# file.addWord(word1)
# neo4JStorage.saveFileNode(file)
# files = neo4JStorage.matchFilesByWords([word, word1])

from help import get_words, parse_words, to_normal, tree2svg, db, check

from collections import Counter

app = FastAPI()
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

class TwoWords(BaseModel):
    word_1: str
    word_2: str

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


@app.post("/search/uploadfile")
async def upload_file(file: Annotated[bytes, File()]):
  filename = f"{uuid4()}-{uuid4()}.txt"
  fileStorage.save(filename, file)
  fileEntity = neo4JStorage.saveFileNode(FileEntity(filename))
  line = file.decode()
  words, _ = get_words(line, False, "en")
  normal_words = to_normal(words)
  for word in normal_words:
    fileEntity.addWord(WordEntity(word))
  neo4JStorage.saveFileNode(fileEntity)

@app.get("/search/downloadfile")
async def download_file(file: str):
  return fileStorage.get(file)

@app.post("/search/reuploadfile")
async def re_upload_file(filename: str, file: Annotated[bytes, File()]):
  fileEntity = neo4JStorage.saveFileNode(FileEntity(filename))
  line = file.decode()
  words, _ = get_words(line, False, "en")
  normal_words = to_normal(words)
  fileEntity.purge()
  for word in normal_words:
    fileEntity.addWord(WordEntity(word))
  neo4JStorage.saveFileNode(fileEntity)

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
            # print(word['word'], word['POS'])
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
                svg2png(sv.tostring(), write_to=name)
                dict_1 = {}
                dict_1['str'] = str(t)
                dict_1['tree'] = TreePrettyPrinter(t).text()
                dict_1['path'] = name
                pre_answer.append(dict_1)
                count = count + 1
                print(TreePrettyPrinter(t).text())
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

        name = 'images/' + str(time.time())+ '.png'
        svg2png(sv.tostring(), write_to=name)
        dict_1['path'] = name
        answer.append(dict_1)
    return {'msg': answer}

@app.post('/words/inform')
def get_new_info_about_words(sentences: List[Text]):
    wikiwordnet = WikiWordnet()
    graph = []
    for sent in sentences:
        words = get_words(sent.text, type=False)
        normal_words = to_normal(words)
        print(words)
        print(normal_words)

        for word in normal_words:
            dict_1 = {}
            dict_1['first'] = 'sentence'
            dict_1['relation'] = 'part_of_sentence'
            dict_1['second'] = word

            graph.append(dict_1)
            
            try:
                synsets = wikiwordnet.get_synsets(word)
                synset1 = synsets[0]
                synset1.get_words()
            except IndexError:
                return {'msg': 'Something is happend wrong', 'word': words[normal_words.index(word)]}
            
            if len(synset1.get_words()):
                for w in synset1.get_words():
                    print(w.lemma())
                    dict_1 = {}
                    dict_1['first'] = word
                    dict_1['relation'] = 'lemma'
                    dict_1['second'] = w.lemma()

                    graph.append(dict_1)

            print('definition')
            if len(synsets):
                for synset in synsets:
                    dict_1 = {}
                    dict_1['first'] = word
                    dict_1['relation'] = 'definition'
                    dict_1['second'] = {w.definition() for w in synset.get_words()}

                    graph.append(dict_1)

            print('hypernym' != 0)   
            if len(wikiwordnet.get_hypernyms(synset1)):
                for hypernym in wikiwordnet.get_hypernyms(synset1):
                    dict_1 = {}
                    dict_1['first'] = word
                    dict_1['relation'] = 'hypernym'
                    dict_1['second'] = {w.lemma() for w in hypernym.get_words()}

                    graph.append(dict_1)

            print('hyponym')
            if len(wikiwordnet.get_hyponyms(synset1)):    
                for hyponym in wikiwordnet.get_hyponyms(synset1):
                    dict_1 = {}
                    dict_1['first'] = word
                    dict_1['relation'] = 'hyponym'
                    dict_1['second'] = {w.lemma() for w in hyponym.get_words()}

                    graph.append(dict_1)
    
    words.append('sentence')
    
    return {'nodes': words, 'graph': graph}


@app.post('/words/find_hyp')
def only_for_two_words(words: TwoWords):
    wikiwordnet = WikiWordnet()
    graph = []
    nodes = [words.word_1, words.word_2]
    normal_nodes = to_normal(nodes)

    synset1 = wikiwordnet.get_synsets(normal_nodes[0])[0]
    synset2 = wikiwordnet.get_synsets(normal_nodes[1])[0]

    common_hypernyms = wikiwordnet.get_lowest_common_hypernyms(synset1, synset2)
    if len(common_hypernyms):
        for ch, dst1, dst2 in sorted(common_hypernyms, key=lambda x: x[1] + x[2]):
            dict_1 = {}
            dict_1['first'] = normal_nodes
            dict_1['relation'] = 'common_hypernyms'            
            dict_1['second']= {c.lemma() for c in ch.get_words()}

            graph.append(dict_1)

    common_hyponyms = wikiwordnet.get_lowest_common_hyponyms(synset1, synset2)
    if len(common_hyponyms):
        for ch, dst1, dst2 in sorted(common_hyponyms, key=lambda x: x[1] + x[2]):
            dict_1 = {}
            dict_1['first'] = normal_nodes
            dict_1['relation'] = 'common_hyponyms'            
            dict_1['second']= {c.lemma() for c in ch.get_words()}

            graph.append(dict_1)

    return {'nodes': nodes, 'graph': graph}

manager = ConnectionManager()
messageListener = MessageListener()
messageLoop =  MessageResponseLoop(manager, messageListener)
messageListener.setLoop(messageLoop)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    id = uuid4()
    try:
      await websocket.accept()
      manager.connect(websocket, id)
      while True:
        data = await websocket.receive_text()
        print("message from", id)
        await messageLoop.handleMessage(id, data)
    except WebSocketDisconnect:
      manager.disconnect(id)
      print("client disconnected")
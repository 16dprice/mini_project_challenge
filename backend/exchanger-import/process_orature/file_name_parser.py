import os
import re
import json
from pydub import AudioSegment



class ResourceInfo:
    def __init__(self, language, res_id, book, chapter, verse, take):
        self.language = language
        self.resource_id = res_id
        self.book = book
        self.chapter = int(chapter)
        self.verse = int(verse)
        self.take = take

    @staticmethod
    def parse_file_name(name):
        pattern = r"(\w){2,}_(\w){2,}_(\w){3}_c(\d){1,3}_v(\d){1,3}_t(\d){1,3}.(wav|mp3)$"
        if re.match(pattern, name):
            filename, file_extension = os.path.splitext(name)
            tokens = filename.split('_')
            resource_info = ResourceInfo(
                tokens[0], tokens[1], tokens[2], tokens[3][1:], tokens[4][1:], tokens[5][1:]
            )
            return resource_info
        else:
            return None


# this is not needed in Exchanger with already availble Book model
def get_book_catalog():
    catalog = r"E:\Projects\TryPython\src\process_orature\books.json"
    with open(catalog, 'r') as book_catalog:
        content = json.load(book_catalog)
        return content


def get_book(slug):
    for book in get_book_catalog():
        if book["slug"] == slug:
            return book
    
    return None


class MetadataTag:
    def __init__(self, res_info):
        self.resource_info = res_info
        self.meta = {
            "anthology": "",
            "language": "",
            "version": "",
            "book": "",
            "book_number": "",
            "mode": "",
            "chapter": "",
            "startv": "",
            "endv": "",
            "contributor": "{}",
            "markers": {}
        }


    def get_json(self):
        book = get_book(self.resource_info.book)
        
        self.meta['anthology'] = book['anth']
        self.meta['language'] = self.resource_info.language
        self.meta['version'] = self.resource_info.resource_id
        self.meta['book'] =  self.resource_info.book
        self.meta['book_number'] = book['num']
        self.meta['mode'] =  "verse"
        self.meta['chapter'] =  self.resource_info.chapter
        self.meta['startv'] = self.resource_info.verse
        self.meta['endv'] = self.resource_info.verse
        self.meta['contributor'] = {}
        self.meta['markers'] = {
            self.resource_info.verse: 0
        }

        return json.dumps(self.meta)


# audio = r"E:\Shared\hi_ulb_1th_orature_gen_good\hi_ulb_1th_orature\hi_ulb_gen_c03_v02_t01.wav"

# file_name = os.path.basename(audio)
# info = ResourceInfo.parse_file_name(file_name)
# meta = MetadataTag(info).get_json()
# print(meta)


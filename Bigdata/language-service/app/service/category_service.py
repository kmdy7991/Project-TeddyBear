import tensorflow as tf

from gensim.models import Word2Vec

from app.common.preprocess import preprocess
from app.dto.category_dto import request_category, response_category


def token_to_idx(tokenized_document, unk_idx):
    idx_list = []
    for token in tokenized_document.split(' '):
        try:
            idx_list.append(w2v_model.wv.index_to_key.index(token))
        except:
            idx_list.append(unk_idx)
    return idx_list


def sentence_to_sequence(sentence):
    sequences = [token_to_idx(sentence, UNK_IDX)]
    sequences = tf.keras.utils.pad_sequences(sequences,
                                             padding='post',
                                             truncating='post',
                                             maxlen=MAX_LEN,
                                             value=len(w2v_model.wv.index_to_key) + 1)
    return sequences


def predict(sentence):
    result = model.predict(sentence_to_sequence(sentence))
    return label[result.argmax()]


def get_category(requests: list[request_category]):
    responses = []
    for request in requests:
        text = preprocess(request.video_transcript)
        result = predict(sentence_to_sequence(text))
        response = response_category(video_id=request.video_id, category=result)
        responses.append(response)

    return responses

w2v_path = './app/models/word2vec.model'
# w2v_path = '../models/word2vec.model'
category_path = './app/models/category.h5'
# category_path = '../models/category.h5'

label = ['생활문화', '사회', 'IT과학', '스포츠', '세계', '정치', '경제']

w2v_model = Word2Vec.load(w2v_path)
model = tf.keras.models.load_model(category_path)

UNK_IDX = len(w2v_model.wv.index_to_key)
MAX_LEN = 32


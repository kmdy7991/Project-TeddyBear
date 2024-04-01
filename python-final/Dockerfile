FROM python:3.11
WORKDIR ./trans
COPY ./requirements.txt /trans/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /trans/requirements.txt
COPY . ./trans
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8779"]
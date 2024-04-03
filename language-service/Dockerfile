FROM python:3.9
WORKDIR /data
COPY ./requirements.txt /data/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /data/requirements.txt
COPY ./app /data/app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8778"]
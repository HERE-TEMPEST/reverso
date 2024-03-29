from minio import Minio
from minio.error import S3Error
from io import BytesIO

class FileStorage:
  def __init__(self, url: str, username: str, password: str):

    username='bQ0l7oIKG238wPwXcYWR'
    password='CA4BNm9oEot23YSuT2cgNRiFsz2gEomUiiHwXv1R'

    self.client: Minio = Minio(
      url,
      access_key=username,
      secret_key=password,
      secure=False
    )
    found = self.client.bucket_exists("reverso")
    if not found:
        self.client.make_bucket("reverso")
        print("Bucket 'reverso' created")
    else:
        print("Bucket 'reverso' already exists")

  def save(self, filename: str, data: bytes):
    return self.client.put_object(
      "reverso", filename, BytesIO(data), len(data),
    )

  def get(self, filename: str) -> str:
    response = self.client.get_object("reverso", filename,)
    if response.data:
      return response.data.decode()
    return ""
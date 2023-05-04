from typing import Dict
from fastapi import WebSocket

class ConnectionManager:
  def __init__(self):
    self.connections: Dict[str, WebSocket] = dict()

  def connect(self, websocket: WebSocket, id: str):
    self.connections.setdefault(id, websocket)

  def disconnect(self, id: str):
    self.connections.pop(id)

  async def sendTo(self, id: str, message: str):
    connection = self.connections.get(id)

    if connection is not None:
      await connection.send_text(message)

  async def broadcast(self, message: str):
    for connection in self.connections.values():
      await connection.send_text(message)
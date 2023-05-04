from .agnet_base import AgentBase
from .example_agent import ExampleAgent
from .find_anime_agent import FindAnimeAgent
from .surprise_agent import SurpriseAgent
from .find_anime_agent_raiting import FindAnimeAgentRaiting
from .find_anime_agent_genre import FindAnimeAgentGenre
from .find_anime_agent_year import FindAnimeAgentYear

agents = [ExampleAgent(), FindAnimeAgent(), SurpriseAgent(), FindAnimeAgentRaiting(), FindAnimeAgentGenre(), FindAnimeAgentYear()]
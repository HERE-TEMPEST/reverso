from .agnet_base import AgentBase
from .example_agent import ExampleAgent
from .find_anime_agent import FindAnimeAgent
from .surprise_agent import SurpriseAgent
from .find_anime_agent_raiting import FindAnimeAgentRaiting
from .find_anime_agent_genre import FindAnimeAgentGenre
from .find_anime_agent_year import FindAnimeAgentYear
from .hello_agent import HelloAgent
from .pitty_agent import PittyAgent
from .help_agent import HelpAgent

agents = [HelloAgent(), FindAnimeAgent(), SurpriseAgent(), FindAnimeAgentRaiting(), FindAnimeAgentGenre(), FindAnimeAgentYear(), PittyAgent(), HelpAgent()]
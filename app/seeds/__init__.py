from flask.cli import AppGroup

from app.seeds.portfolios import seed_portfolios, undo_portfolios
from .users import seed_users, undo_users
from .portfolios import seed_portfolios, undo_portfolios
from .transactions import seed_transactions, undo_transactions
from .watchlist import seed_watchlists, undo_watchlists

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_portfolios()
    seed_transactions()
    seed_watchlists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_portfolios()
    undo_transactions()
    undo_watchlists()
    # Add other undo functions here

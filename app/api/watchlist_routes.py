from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Watchlist

watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('/')
def watchlists():
	watchlists = Watchlist.query.all()
	return {'watchlists': [watchlist.to_dict() for watchlist in watchlists]}

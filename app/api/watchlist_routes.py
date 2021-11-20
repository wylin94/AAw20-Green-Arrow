from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Watchlist, db
from app.forms.watchlist_form import WatchlistForm

watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('/')
def watchlists():
	watchlists = Watchlist.query.all()
	return {'watchlists': [watchlist.to_dict() for watchlist in watchlists]}


@watchlist_routes.route('/', methods=['POST'])
def createWatchlist():
	form = WatchlistForm()
	form["csrf_token"].data = request.cookies["csrf_token"]
	if form.validate_on_submit():
		data = Watchlist()
		form.populate_obj(data)
		db.session.add(data)
		db.session.commit()
		return data.to_dict()


@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
def deleteWatchlist(watchlist_id):
	removeWatchlist = Watchlist.query.get(watchlist_id)
	db.session.delete(removeWatchlist)
	db.session.commit()
	return removeWatchlist.to_dict()

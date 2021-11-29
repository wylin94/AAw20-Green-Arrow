from app.models import db, Watchlist


def seed_watchlists():
    watchlist1 = Watchlist(
        user_id=1, ticker='CURLF')
    watchlist2 = Watchlist(
        user_id=1, ticker='GTBIF')
    watchlist3 = Watchlist(
        user_id=1, ticker='AMRS')
    watchlist4 = Watchlist(
        user_id=1, ticker='YOLO')
    watchlist5 = Watchlist(
        user_id=1, ticker='CNBS')
    watchlist6 = Watchlist(
        user_id=1, ticker='POTX')

    watchlist7 = Watchlist(
        user_id=2, ticker='AXP')
    watchlist8 = Watchlist(
        user_id=2, ticker='USB')
    watchlist9 = Watchlist(
        user_id=2, ticker='BK')
    watchlist10 = Watchlist(
        user_id=2, ticker='AAPL')
    watchlist11 = Watchlist(
        user_id=2, ticker='MA')
    watchlist12 = Watchlist(
        user_id=2, ticker='V')
    watchlist13 = Watchlist(
        user_id=2, ticker='CVX')

    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)
    db.session.add(watchlist4)
    db.session.add(watchlist5)
    db.session.add(watchlist6)
    db.session.add(watchlist7)
    db.session.add(watchlist8)
    db.session.add(watchlist9)
    db.session.add(watchlist10)
    db.session.add(watchlist11)
    db.session.add(watchlist12)
    db.session.add(watchlist13)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()

from app.models import db, Watchlist


def seed_watchlists():
    watchlist1 = Watchlist(
        user_id=1, ticker='AAPL')
    watchlist2 = Watchlist(
        user_id=1, ticker='FB')
    watchlist3 = Watchlist(
        user_id=1, ticker='AMZN')
    watchlist4 = Watchlist(
        user_id=1, ticker='NFLX')
    watchlist5 = Watchlist(
        user_id=1, ticker='UBER')

    watchlist6 = Watchlist(
        user_id=2, ticker='BABA')
    watchlist7 = Watchlist(
        user_id=2, ticker='FEYE')
    watchlist8 = Watchlist(
        user_id=2, ticker='SQ')
    watchlist9 = Watchlist(
        user_id=2, ticker='MRVL')
    watchlist10 = Watchlist(
        user_id=2, ticker='AAPL')

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

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()

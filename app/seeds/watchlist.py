from app.models import db, Watchlist


def seed_watchlists():
    watchlist1 = Watchlist(
        user_id=2, ticker='TSLA')
    watchlist2 = Watchlist(
        user_id=2, ticker='AAPL')

    watchlist3 = Watchlist(
        user_id=3, ticker='CURLF')
    watchlist4 = Watchlist(
        user_id=3, ticker='GTBIF')
    watchlist5 = Watchlist(
        user_id=3, ticker='AMRS')
    watchlist6 = Watchlist(
        user_id=3, ticker='YOLO')
    watchlist7 = Watchlist(
        user_id=3, ticker='CNBS')
    watchlist8 = Watchlist(
        user_id=3, ticker='POTX')

    watchlist9 = Watchlist(
        user_id=4, ticker='AXP')
    watchlist10 = Watchlist(
        user_id=4, ticker='USB')
    watchlist11 = Watchlist(
        user_id=4, ticker='BK')
    watchlist12 = Watchlist(
        user_id=4, ticker='AAPL')
    watchlist13 = Watchlist(
        user_id=4, ticker='MA')
    watchlist14 = Watchlist(
        user_id=4, ticker='V')
    watchlist15 = Watchlist(
        user_id=4, ticker='CVX')

    watchlist16 = Watchlist(
        user_id=5, ticker='GME')
    watchlist17 = Watchlist(
        user_id=5, ticker='AMC')
    watchlist18 = Watchlist(
        user_id=5, ticker='BBBY')
    watchlist19 = Watchlist(
        user_id=5, ticker='BB')
    watchlist20 = Watchlist(
        user_id=5, ticker='KOSS')
    watchlist21 = Watchlist(
        user_id=5, ticker='BBIG')
    watchlist22 = Watchlist(
        user_id=5, ticker='HOOD')
    
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
    db.session.add(watchlist14)
    db.session.add(watchlist15)
    db.session.add(watchlist16)
    db.session.add(watchlist17)
    db.session.add(watchlist18)
    db.session.add(watchlist19)
    db.session.add(watchlist20)
    db.session.add(watchlist21)
    db.session.add(watchlist22)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()

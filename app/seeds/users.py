from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', buying_power=100000)
    jordanBelfort = User(
        username='Jordan Belfort', email='jordanbelfort@wolfofwallstreet.com', password='password', buying_power=75315345)
    warrentBuffett = User(
        username='Warren Buffett', email='warrenbuffett@birkshire.com', password='password', buying_power=85450664)
    bernieMadoff = User(
        username='Berie Madoff', email='bernieMadoff@berniemadoffinvestmentsecurities.com', password='password', buying_power=0)
    
    db.session.add(demo)
    db.session.add(jordanBelfort)
    db.session.add(warrentBuffett)
    db.session.add(bernieMadoff)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

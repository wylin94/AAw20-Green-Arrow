from app.models import db, Transaction
from datetime import datetime


def seed_transactions():
    transaction1 = Transaction(
        user_id=1, ticker='AAPL', type='buy', share=10, price=150.93, created_at=datetime.now(), updated_at=datetime.now())
    transaction2 = Transaction(
        user_id=1, ticker='FB', type='buy', share=20, price=342.55, created_at=datetime.now(), updated_at=datetime.now())
    transaction3 = Transaction(
        user_id=1, ticker='AMZN', type='buy', share=10, price=3543.50, created_at=datetime.now(), updated_at=datetime.now())


    transaction4 = Transaction(
        user_id=2, ticker='FEYE', type='buy', share=10, price=17.27, created_at=datetime.now(), updated_at=datetime.now())
    transaction5 = Transaction(
        user_id=2, ticker='MRVL', type='buy', share=20, price=73.82, created_at=datetime.now(), updated_at=datetime.now())
    transaction6 = Transaction(
        user_id=2, ticker='AAPL', type='buy', share=10, price=149.99, created_at=datetime.now(), updated_at=datetime.now())

    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    db.session.add(transaction4)
    db.session.add(transaction5)
    db.session.add(transaction6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()

from app.models import db, Portfolio


def seed_portfolios():
    portfolio5 = Portfolio(
        user_id=1, ticker='MRVL', share=20, purchase_price=73.82)
    portfolio6 = Portfolio(
        user_id=1, ticker='AAPL', share=10, purchase_price=149.99)

    portfolio1 = Portfolio(
        user_id=2, ticker='KO', share=100, purchase_price=55.46)
    portfolio2 = Portfolio(
        user_id=2, ticker='AAPL', share=10, purchase_price=150.93)
    portfolio3 = Portfolio(
        user_id=2, ticker='FB', share=20, purchase_price=342.55)
    portfolio4 = Portfolio(
        user_id=2, ticker='AMZN', share=10, purchase_price=3543.50)

    db.session.add(portfolio1)
    db.session.add(portfolio2)
    db.session.add(portfolio3)
    db.session.add(portfolio4)
    db.session.add(portfolio5)
    db.session.add(portfolio6)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_portfolios():
    db.session.execute('TRUNCATE portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()

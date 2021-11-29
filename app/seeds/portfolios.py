from app.models import db, Portfolio


def seed_portfolios():
    portfolio1 = Portfolio(
        user_id=1, ticker='GME', share=900, purchase_price=200.50)
    portfolio2 = Portfolio(
        user_id=1, ticker='AMC', share=700, purchase_price=38.00)
    portfolio3 = Portfolio(
        user_id=1, ticker='BGFV', share=100, purchase_price=25.84)
    portfolio4 = Portfolio(
        user_id=1, ticker='CGC', share=100, purchase_price=11.62)
    portfolio5 = Portfolio(
        user_id=1, ticker='CRON', share=10, purchase_price=4.64)
    portfolio6 = Portfolio(
        user_id=1, ticker='TLRY', share=200, purchase_price=10.73)
    portfolio7 = Portfolio(
        user_id=1, ticker='GRWG', share=650, purchase_price=17.87)  
    
    portfolio8 = Portfolio(
        user_id=2, ticker='BRK.B', share=900, purchase_price=55.46)
    portfolio9 = Portfolio(
        user_id=2, ticker='KO', share=500, purchase_price=55.46)
    portfolio10 = Portfolio(
        user_id=2, ticker='AAPL', share=900, purchase_price=150.93)
    portfolio11 = Portfolio(
        user_id=2, ticker='BAC', share=500, purchase_price=45.63)
    portfolio12 = Portfolio(
        user_id=2, ticker='KHC', share=350, purchase_price=34.69)
    portfolio13 = Portfolio(
        user_id=2, ticker='VZ', share=100, purchase_price=51.73)

    db.session.add(portfolio1)
    db.session.add(portfolio2)
    db.session.add(portfolio3)
    db.session.add(portfolio4)
    db.session.add(portfolio5)
    db.session.add(portfolio6)
    db.session.add(portfolio7)
    db.session.add(portfolio8)
    db.session.add(portfolio9)
    db.session.add(portfolio10)
    db.session.add(portfolio11)
    db.session.add(portfolio12)
    db.session.add(portfolio13)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_portfolios():
    db.session.execute('TRUNCATE portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()

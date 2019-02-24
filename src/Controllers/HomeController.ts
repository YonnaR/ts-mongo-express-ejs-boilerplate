import * as express from 'express';

export default new class HomeController{
    /**
     * @index page
     */
    public index :express.RequestHandler =(req :express.Request, res :express.Response) => {
        res.render('pages/index');
    }
}
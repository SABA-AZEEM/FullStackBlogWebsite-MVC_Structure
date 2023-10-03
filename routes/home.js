import express from 'express';
//Create an instance of express router
const router=express.Router();
import homeController from '../controllers/home.js';

router.get('/',homeController.getIndex);
router.get('/NewArticle',homeController.getNewArticle);
router.post('/SaveForm',homeController.saveNewArticle);
router.post('/SaveEditForm',homeController.saveEditArticle);
router.get('/Edit/:id',homeController.editArticle);
router.get('/ReadMore/:id',homeController.getSingleArticle);
router.get('/Delete/:id',homeController.deleteArticle);


export default router;
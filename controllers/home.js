import Blog from '../models/Blog.js';

const obj={
    getIndex:async(req,res)=>{
        try{
            const blogArticles=await Blog.find();
            res.render('index.ejs',{articles:blogArticles});
        }catch(error){
            console.error(error);
        }
    },
    getNewArticle:async(req,res)=>{
        try{
            res.render('new.ejs',{
                article:{
                    title:'',
                    content:'',
                }
            });
        }catch(error){
            console.log(error);
        }
    },
    saveNewArticle:async(req,res)=>{
        try{
            let articleTitle=req.body.title;
            let articleContent=req.body.description;
            await Blog.create({
                title:articleTitle,
                content:articleContent,
            });
            console.log('Article has been created');
            res.redirect('/');
        }catch(error){
            console.log(error);
        }
    },
    editArticle:async(req,res)=>{
        try{
            let id=req.params.id;
            const article=await Blog.findOne({_id:id});
            res.render('edit.ejs',{
                article:{
                    title:article.title,
                    content:article.content,
                    id:article._id,
                }
            });
        }catch(error){
            console.log(error);
        }
    },
    saveEditArticle: async (req, res) => {
        try {
            let id=req.body.id;
            // Attempt to find and update the article by title
            const article = await Blog.findOneAndUpdate(
                { _id: id },
                {
                    title: req.body.title,
                    content: req.body.description,
                },
                { new: true } // This option returns the updated document
            );
    
            // Check if the article was found and updated successfully
            if (article) {
                console.log('Article has been edited.');
                res.redirect('/');
            } else {
                // Handle the case where no matching article was found
                console.log('Article not found or update failed.');
                res.status(404).send('Article not found or update failed.');
            }
        } catch (error) {
            console.log(error);
            // Handle other potential errors here
            res.status(500).send('Internal Server Error');
        }
    },
    getSingleArticle:async(req,res)=>{
        try{
            let id=req.params.id;
            const singleArticle=await Blog.find({_id:id});
            console.log(singleArticle)
            if(singleArticle){
                res.render('show.ejs',{
                    article:singleArticle[0],
                });
            }else{
                console.log('Article not found.');
                res.status(404).send('Article Not found');
            }
        }catch(error){
            console.log(error);
            res.status(500).send('Internal Server Error.');
        }
    },
    deleteArticle:async(req,res)=>{
        try{
            let id=req.params.id;
            console.log(id);
            const deletedArticle = await Blog.findByIdAndDelete(id);
            if (deletedArticle) {
                console.log('Article deleted:', deletedArticle);
                res.redirect('/');
            } else{
                console.log('Article not found.');
                res.status(404).send('Article Not found');
            }
        }catch(error){
            console.log(error);
            res.status(500).send('Internal Server Error.');
        }
    }
    
}

export default obj;
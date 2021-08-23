var express = require('express');
const { render } = require('../app');
const productHelpers=require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{


    console.log(products);
    res.render('admin/view-product',{admin:true, products});
  })
 
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
});




router.post('/add-product',(req,res)=>{

req.body.fileName=req.files.Image.name
var image=req.files.Image
    productHelpers.addProduct(req.body,(_id)=>{
    //   console.log(_id);
      // let image=req.files.Image
  
      image.mv('./public/product-image/'+image.name,(err)=>{
        if(!err){
          res.render('admin/add-product')
        }
        else{
          
            console.log(err);
        }
      })
      // C:\Users\thareeq\Desktop\programs sample\fourth\public\product-image
    
    });
    
  });
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
 
})

router.get('/edit-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);

  productHelpers.readProduct(proId).then((response)=>{
    // res.render('/admin/add-product',{admin:true,product:response})
    res.render('admin/edit-product',{product:response})

  })
 
})

// router.post('/edit-submit-product/:id',(req,res)=>{

//   req.body.id=req.params.id


//   productHelpers.editProduct(req.body).then((response)=>{
//     // res.render('/admin/add-product',{admin:true,product:response})
//     console.log("@@@@@@@@@@@@@@@@####@");
//     console.log(response);
//     res.redirect('/admin')
//   })
 
// })


router.post('/edit-submit-product/:id',(req,res)=>{

  let _id=req.params.id
console.log(req.files)
console.log("kkkkk13576767");
console.log(_id);
console.log(req.files.Image.name);
console.log(req.files.Image);
let img=req.files.Image.name;

  if(req.files !== null){
         var image=req.files.Image
         image.mv('./public/product-image/'+image.name,(err)=>{
        
        // if(!err){
         
        //   res.redirect('/admin')
        // }

    })
    
  }

  req.body.id=req.params.id
  req.body.fileName=image.name



  productHelpers.editProduct(req.body).then((response)=>{
    // res.render('/admin/add-product',{admin:true,product:response})
    res.redirect('/admin')
  })
 
})




module.exports = router;

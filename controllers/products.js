const Product = require('../models/product')


const getAllProductStatic = async(req,res)=>{
    //const search = 'a'
    //const products = await Product.find({
        //featured:true
    //    name:{$regex:search,$options:'i'}   
    //})
    //throw new Error('Testing Async Errors   ')
    
    // const products = await Product.find({}).sort('-name price')
    // const products = await Product.find({}).select('name price').limit(4).skip(4)
    const products = await Product.find({price:{$gt:30}})
    .sort('price')
    .select('name price')

    res.status(200).json({products,nbHits:products.length})
}

const getAllProduct = async(req,res)=>{
    const {featured,company,name,sort,fields,filters} = req.query;
    const queryObject = {}
    if(featured){
        queryObject.featured = featured
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name,$options:'i'}   
    }
    //console.log(filters);
    if(filters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq',
        }
        const regex = /\b{>|>=|<|<=|=}\b/g
        let filter = filters.replace(regex,(match)=>`-${operatorMap[match]}-`)
        const options = ['price','rating']
        filter = filter.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }
    let result = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList) 
    }else{
        result = result.sort('createAt')
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page)||1
    const limit = Number(req.query.limit)||10
    const skip = (page -1)*limit 
    //console.log(skip,limit,req.query.page);
    result = result.skip(skip).limit(limit)
    const products = await result;
    console.log(queryObject);
    res.status(200).json({products,nbHits:products.length})
}

module.exports = {
    getAllProduct,
    getAllProductStatic
}
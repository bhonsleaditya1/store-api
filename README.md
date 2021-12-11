## Store API 
* Simple REST API for fetching Products
* Query parameters for filtering products
* **MongoDB**: Persisting Products data
* **Mongoose**: Product Schema & CRUD operations 
* **NodeJS**: Developing query logic 
* **ExpressJS**: serving API & Middleware:
  * express-async-errors
  
### Product Schema
```javascript
name:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
featured:{
    type:Boolean,
    default:false
},
rating:{
    type:Number,
    default: 4.5
},
createdAt:{
type: Date,
    default:Date.now().toString()
},
company:{
    type:String,
    enum:{
        values:['ikea','liddy','caressa','marcos'],
        message:'{VALUE} is not supported',
    }
}
```

### Query Type
* _featured_: true/false
* _company_: <company_name>
* _name_: <string_pattern>
* _price_: >,>=,<,<=,= 
* _rating_: >,>=,<,<=,= 
* _sort_: name,price,rating,createdAt
* _fields_: <select particular fields>
* _page_: <page_no>
* _limit_: <#_of_items_per_page>

var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const User = require('./models/User')
const CreateList = require('./models/CreateList')
const BookList = require('./models/BookListing')

const mongodb_url = 'mongodb+srv://jesse:password10@cluster0.t6z8b.mongodb.net/101244671_comp3133_assig1?retryWrites=true&w=majority'

mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(success => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log('Error Mongodb connection')
  });


var Schema = buildSchema (
    `type User {
        username: String
        firstname: String
        lastname: String
        email: String
        password: String
        type: String
    },
    type List{
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Int!
        email: String!
        username: String!
    },
    type Book{
        listing_id: String!
        booking_id: String!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        username: String!
    }
    type Query{
        getUser: [User]
        viewlistings: [List]
        login(
             username:String!
             password:String!
             ): List
        getByName(name:String!): [Book]
        getBy(city:String, postalCode: String): [List]
    },
    type Mutation{
        addUser(
            username: String!
            firstname: String!
            lastname: String!
            email: String!
            password: String!
            type: String!
        ): User!
        
        createListing(
            listing_id: String!
            listing_title: String!
            description: String!
            street: String!
            city: String!
            postal_code: String!
            price: Int!
            email: String!
            username: String!
        ): List

        createBooking(
            listing_id: String!
            booking_id: String!
            booking_date: String!
            booking_start: String!
            booking_end: String!
            username: String!
        ): Book
    }  
`)

var rootResolver = {
    
        getUser: async (parent, args) =>{
            console.log(User.find({}))
            return User.find({})
            
        },
        getByName: async(parent,args)=>{
            return BookList.find({})
        },
        getBy:async(parent,args)=>{
            return CreateList.find({"city":args.city, "postal_code":args.postal_code})
        }
    ,
        viewlistings:async(parent,args)=>{
            return CreateList.find({})
        },
        addUser: (args)=>{
            console.log(args)

            let newUser = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                password: args.password,
                type:args.type
            })
            return newUser.save()
           
        },
        createListing: (args) =>{
            console.log(args)
            let newList = new CreateList({
                    listing_id: args.listing_id,
                    listing_title: args.listing_title,
                    description: args.description,
                    street: args.street,
                    city: args.city,
                    postal_code: args.postal_code,
                    price: args.price,
                    email: args.email,
                    username: args.username
            })
            return newList.save()
        },
        createBooking:(args)=>{
            console.log(args)
            let newBook = new BookList({
                listing_id: args.listing_id,
                booking_id: args.booking_id,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                username: args.username
            })
            return newBook.save()
        },
        login: (args) =>{
            console.log(args.username)
            
            if(User.find( { "username": args.username, "password": args.password },(err, data)=>{
                if (err) throw err
                console.log(data)
                console.log(data[0].password)
                if(data[0].type == "admin"){
                    return 'Suc'
                }
                else{
                    answer = 'THat is okauy'
                    console.log(answer)
                    return answer
                    
                }
                
            }))
               return args.username;
        }


        
    
}
gqlHTTP = graphqlHTTP({
    schema: Schema,
    rootValue: rootResolver,
    graphiql: true
})

var app = express()
app.use("/graphql", gqlHTTP)

app.listen(3000, ()=>{
    console.log('Success')
})
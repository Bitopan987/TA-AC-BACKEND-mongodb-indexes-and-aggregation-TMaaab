writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.
   db.User.aggregate([{ $match: { isActive: true }}]).pretty();

2. Find all users whose name includes `blake` case insensitive.
   db.User.createIndex({name:"text"})
   db.User.find( { $text: { $search:"blake"} })

3. Find all males.
   db.User.aggregate([{ $match: { gender: "male" }}]).pretty();
4. Find all active males.
   db.User.aggregate([{ $match: { gender: "male",isActive:true }}]).pretty();
5. Find all active females whose age is >= 25.
   db.User.aggregate([{ $match: { gender: "female",age:{$gte : 25} }}]).pretty();
6. Find all 40+ males with green eyecolor.
   db.User.aggregate([{ $match: { gender: "male",eyeColor:"green",age:{$gte : 25} }}]).pretty();
7. Find all blue eyed men working in 'USA'.
   db.User.aggregate([{ $match: { gender: "male",eyeColor:"green",'company.location.country': 'USA' }}]).pretty();
8. Find all female working in Germany with green eyes and apple as favoriteFruit.
   db.User.aggregate([{ $match: { gender: "female",eyeColor:"green",'company.location.country': 'Germany',favoriteFruit:"apple" }}]).pretty();
9. Count total male and females.
   db.User.aggregate([{$group: {_id: "$gender",count: { $sum: 1 },},},]);
10. Count all whose eyeColor is green.
    db.User.aggregate([{$match: {eyeColor:"green"}},{$group: {_id: "$eyeColor",count: { $sum: 1 },},},]).pretty()
11. Count all 20+ females who have brown eyes.
    db.User.aggregate([{$match: {eyeColor:"brown",gender:"female",age:{$gt: 20}}},{$group: {_id: "$gender",count: { $sum: 1 },},},]).pretty()
12. Count all occurences of all eyeColors.
    Something like:-
    db.User.aggregate([{$group: {_id: "$eyeColor",count: { $sum: 1 },},},]);

```
blue -> 30
brown -> 67
green -> 123
```

13. Count all females whose tags array include `amet` in it.

14. Find the average age of entire collection
    db.User.aggregate([ {$group: {_id: null , avgAge: {$avg: '$age'}}} ]).pretty()
15. Find the average age of males and females i.e. group them by gender.
    db.User.aggregate([ {$group: {_id: "$gender" , avgAge: {$avg: '$age'}}} ]).pretty()
16. Find the user with maximum age.
    db.User.aggregate([ {$group: {_id: null , maxAge: {$max: '$age'}}} ]).pretty()

17. Find the document with minimum age.
    db.User.aggregate([ {$group: {_id: null , minAge: {$min: '$age'}}} ]).pretty()
18. Find the sum of ages of all males and females.
    db.User.aggregate([ {$group: {_id: '$gender' , sumOfAge: {$sum: '$age'}}} ]).pretty()
19. Group all males by their eyeColor.
    db.User.aggregate([ {$match: { gender:'male'}}, {$group: {_id:'$eyeColor', count: {$sum:1}}} ]).pretty()
20. group all 30+ females by their age.
    db.User.aggregate([ {$match: { gender:'female',age:{$gt: 30}}}, {$group: {_id:'$age', count: {$sum:1}}} ]).pretty()
21. Group all 23+ males with blue eyes working in Germany.
    db.User.aggregate([ {$match: {eyeColor:"blue",'company.location.country': 'Germany', gender:'male',age:{$gt: 23}}}, {$group: {_id:'$age', count: {$sum:1}}} ]).pretty()
22. Group all by tag names i.e. use \$unwind since tags are array.
    db.User.aggregate([ {$unwind:"$tags"}, {$group: {_id:'$tags', count: {$sum:1}}} ]).pretty()
23. Group all males whose favoriteFruit is `banana` who have registered before 2015.
    db.User.aggregate([ {$match: { gender:'male',favoriteFruit:"banana"}}, {$group: {_id:'$favoriteFruit', count: {$sum:1}}} ]).pretty()
24. Group all females by their favoriteFruit.
    db.User.aggregate([ {$match: { gender:'female'}}, {$group: {_id:'$favoriteFruit', count: {$sum:1}}} ]).pretty()
25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);
    db.User.distinct('eyeColor')
26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.
    db.User.aggregate([{ $match: { gender: 'female', favoriteFruit: 'apple', eyeColor: 'blue', 'company.location.country': 'USA' } },{ $sort: { registered: -1 } },]).pretty();
27. Find all 18+ inactive men and return only the fields specified below in the below provided format

```js
{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}
```

db.User.aggregate([{ $match: { gender: 'male', isActive:false, age:{$gt: 18}}},{ $project: { name:1,email:'$company.email',identity:{eye:"$eyeColor",phone:"$company.phone",location:"$company.location"}}},]).pretty();

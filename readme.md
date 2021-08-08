# Excellence Technologies Machine Test

## Create api to do the following

### Insert a candidate into database

### Assign score for a candidate based on the test

### Get highest scoring candidate

### Get average scores per round for all candidates

## API Info:

#### 1. Insert a candidate into database

> POST: api/candidate/add

```
{
    "name": "<String>",
    "emailId": "<String>"
}
```

#### 2. Assign score for a candidate based on the test

> POST : api/score/add

```
{
    "candidateId": "<ObjectId>",
    "first_test": "<Number>",
    "second_test": "<Number>",
    "third_test": "<Number>"
}
```

#### 3. Get highest scoring candidate

> GET: api/score/highest

_Return the highest scoring candidate name and total score of all three tests._

#### 4. Get average scores per round for all candidates

> GET: api/score/average

_Return the average scores per round for all candidates._

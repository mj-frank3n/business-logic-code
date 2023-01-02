# business-logic-code

👩🏻‍💻 Project template cloned from https://github.com/jsynowiec/node-typescript-boilerplate

This project contains pure business logic which can be used included in web app run on eg. Express.js or Nest.js.

Code is implemented against unit tests and is never run on it's own. Example of the code being used as part of a web app is provided in a separate repo.

Executing tests should be as simple as:

```sh
cd business-logic-code
npm install
npm test
```

## Business Logic Assumptions
#### Coding style:
Based on task's pseudo code example, I assumed that solution is expected to be done in OOP style.

#### Free Items discount:
I have assumed that this is really about discounting X items out of Y total items to 0$, rather than adding extra X free items to the checkout process.

#### Fixed Price discount:
I have assumed that this is about overriding default product price for a specific customer, rather than applying a specific dollar value discount. The latter approach is more fragile to default price changes, which in my eyes makes it a undesirable.

#### Of course am happy to discuss pros and cons of both assumptions, I have no idea if they are made correctly.

## Additional Information

All the calculations are performed in cent values (integers) to be avoid any floating pointer precision issues.
Since this code could be bundled as a library or used as a service layer in a web app, I assumed that it is web app's route handler/controller responsibility to format monetary values with eg. `.toFixed(2)`
or `toLocaleString()`, or a customer monetary value formatter.

All the pricing configuration is fully serializable and could be persisted and managed in eg. postgres with following schema (have't checked if the sql compiles):

```postgresql
CREATE TABLE customer_pricing (
   id             uuid CONSTRAINT firstkey PRIMARY KEY DEFAULT gen_random_uuid(),
   customer_id    uuid NOT NULL,
   config         jsonb NOT NULL
);
```

I have considered config input validation to be out of scope of this exercise.

### ES Modules

This template uses native [ESM][esm]. Make sure to read [this][nodejs-esm], and [this][ts47-esm] first.

If your project requires CommonJS, you will have to [convert to ESM][sindresorhus-esm].


import Product from "../model/Product.mjs";
import ProductStat from "../model/ProductStat.mjs";
import User from "../model/User.mjs";
import Transaction from "../model/Transaction.mjs";
import getCountryIso3 from "country-iso-2-to-3"; //helps to convert 2 country values to 3 country values which is needed for nivo charts. Eg: ID - IND, we have 2 country symbol in our data, and nivo need the 3 country symbol


//ROUTE: TO GET ALL THE PRODUCTS WITH IT'S STAT
export const getProducts = async (req, res) => {
  try {
    //getting all the products
    /*Promise.all ensures that all the asynchronous operations inside the map function are given a chance to complete, and then it gathers all the results into an array. This is crucial to make sure that the products and their statistics are paired correctly before being returned. */

    const products = await Product.find();
    const productsWithStats = await Promise.all(
      //this mapping process is considered slow, we can use aggregate instead, which is similar to sql join
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id, //the id of a product is stored as 'productId' in productStat module
        });

        //returning all the product info and it's stat into one object
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//ROUTE: TO GET ALL THE CUSTOMERS INFO
export const getCustomers = async (req, res) => {
  try {
    //getting the users whose role is "user", they are the customers
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//ROUTE: TO GET THE TRANSACTONS WITH SERVER SIDE PAGINATION
export const getTransactions = async (req, res) => {
  try {

    // sort should look like this: { "field": "userId", "sort": "desc"}, which means userId should be sorted in descending
    //getting the following details from the front end
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query; //defualt values

    // formatted sort should look like { userId: -1 }, which means userId will be sorted in desc
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        // userId         :         -1
      };

      return sortFormatted;
    };

    //if sort exists then generateSort() will be called
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [ //$or helps to implement multiple arguments
        //to implement searching for cost and userId, NOTE: searching can be done only for these 2 in this case
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted) //query for sorting
      .skip(page * pageSize)
      .limit(pageSize);

      //to get the total documents in transaction module
    const total = await Transaction.countDocuments({
      userId: { $regex: search, $options: "i" },
    });
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});
    //EXPLAINATION FOR THE ABOVE CODE IS GIVEN AT THE END

    //formatting for nivo chart
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count }; //we are returning in this format because, this is the format we need to send to nivo chart to get the data for geography
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* EXPLAINATION FOR THE REDUCE FUNCTION:

It appears that you're using `reduce` to iterate over an array of `users` and creating a map (`mappedLocations`) that counts the occurrences of each country in the `country` property.

Here's a breakdown of what's happening:

1. `users.reduce((acc, { country }) => {...}, {})`:
   - `reduce` is a higher-order function used to transform an array into a single value. In this case, you're transforming an array of `users` into an object (`mappedLocations`).
   - `acc` is the accumulator that keeps track of the result during each iteration.
   - `{ country }` is destructuring a `user` object to extract its `country` property.

2. `const countryISO3 = getCountryIso3(country);`:
   - You're calling a function `getCountryIso3` with the `country` as an argument, presumably to get the ISO 3-letter code for the country.

3. `if (!acc[countryISO3]) { acc[countryISO3] = 0; }`:
   - This checks if the ISO 3-letter code is already a key in the `acc` object. If not, it initializes it with a count of 0.

4. `acc[countryISO3]++;`:
   - If the ISO 3-letter code is already in `acc`, it increments the count.

5. `return acc;`:
   - At the end of each iteration, the modified `acc` is returned, which will be used as the accumulator in the next iteration.

In the end, `mappedLocations` will be an object where the keys are ISO 3-letter codes of countries, and the values represent the count of occurrences of each country.

For example, if you have users from the United States (`countryISO3` might be 'USA' for ISO 3-letter code), the resulting `mappedLocations` might look like:

```javascript
{
  USA: 10, // For example, there are 10 users from the USA
  CAN: 5,  // For example, there are 5 users from Canada
  ...
}
```

Please ensure that `getCountryIso3` function works correctly and returns the ISO 3-letter code for a given country.
*/
<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

    It allows the server to keep track of who is currently logged in, as well as
    pertinent information on the user for resolving requests.

2. What does bcrypt do to help us store passwords in a secure manner.

    It hashes the password, a one way encryption that can be used to compared against
    future requests.

3. What does bcrypt do to slow down attackers?

    It hashes a password multiple times and uses a server defined secret to add
    length and complexity to a password.

4. What are the three parts of the JSON Web Token?

    Header, containing the algorithm and token type, a payload containing
    specified data and an expiration date, and a verify signature that's a hash
    of the previous two and a private secret code that's used to make sure the
    token hasn't been modified before being returned

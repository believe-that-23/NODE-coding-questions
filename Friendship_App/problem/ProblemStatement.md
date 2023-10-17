## Title: Social Media App - User Interaction

### Introduction + Scenario:
Imagine you are developing a social media app. Users can change their passwords, send friend requests, and respond to incoming requests. To ensure smooth functionality, thorough testing is required.

### Objectives:

Friendship Repository Functions:

- get(user1, user2): Retrieves the friendship between two users, regardless of the sender/receiver order.

- getUserFriendships(userId): Retrieves all friendships where the given user is the sender or receiver and the friendship is accepted. It also includes sender and receiver details.

- getPendingFriendships(userId, request): Retrieves pending (not accepted) friendships based on the user's ID and the type of request (sent or received). It includes sender or receiver details.

- addFriend(sender, receiver): Creates a new friendship between two users, with one as the sender and the other as the receiver.

- removeFriend(user1, user2): Removes an existing friendship between two users, regardless of the sender/receiver order.

- updateFriend(sender, receiver, action): Accepts or rejects a friendship request. If 'accept,' the friendship is marked as accepted; if 'reject,' the friendship is removed.

OTP Repository Functions:

- createOtp(userId): Generates a 6-digit OTP and associates it with a user for password reset.

- validateOtp(otp, userId): Marks an OTP as verified if the provided OTP and user ID match.

- isOtpVerified(userId): Checks if there is a verified OTP associated with a user.

Optional features:

- getUser(email): Retrieves user data based on their email.

- deleteOtps(userId): Deletes all OTPs associated with a user.

- updateUserPassword(userId, password): Updates a user's password in the database.

### Expected Output

### Notes

- Changes are meant to be done in the friendship.repository.js and top.repository.js only.

- No need to change the pre-written code elsewhere.



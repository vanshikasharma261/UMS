export default function EditUser() {
  return (
    <div>
      <div>
        <h1>Edit User</h1>
      </div>
      <div>
        <form>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" placeholder="Email" name="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

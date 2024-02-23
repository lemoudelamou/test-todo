import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          <span className="nowrap">
            Welcome to the Super Productive Todo App! 🚀
          </span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Remember, the early bird might get the worm, but the second mouse gets
          the cheese! 🐭🧀
        </p>

        <br />
        <p>Owner: Sepide Dana</p>
      </main>
      {/* <Link to="/register">Signup</Link> */}
      <footer>
        <Link to="/login">User Login</Link>     
      </footer>
    </section>
  );
  return content;
};
export default Public;

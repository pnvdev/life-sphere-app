import {useState} from "react";

import supabase from "../db/api/client";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const {user, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) console.error("Error logging in:", error.message);
    else console.log("User logged in:", user);
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleLogin}>
        Iniciar Sesión
      </button>
    </div>
  );
}

export default Login;

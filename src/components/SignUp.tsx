import {useState} from "react";

import supabase from "../db/api/client";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const {user, error} = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) console.error("Error signing up:", error.message);
    else console.log("User signed up:", user);
  };

  return (
    <div>
      <h2>Registro</h2>
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
      <button type="button" onClick={handleSignUp}>
        Registrar
      </button>
    </div>
  );
}

export default SignUp;

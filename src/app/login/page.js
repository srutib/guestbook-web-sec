//Next JS/React version of the guestbook

"use client";

import styles from './page.module.css'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [failedLoggedIn, setFailedLoggedIn] = useState(false);
  const router = useRouter();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const clearRefs = () => {
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  }

  const login = async(event) => {
    event.preventDefault();

    const username = event.target[0].value;
    const password = event.target[1].value;

    const body = {
        username: username,
        password: password
    };   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    fetch("/api/login", requestOptions)
      .then((res) => {
        if (!res.ok) setFailedLoggedIn(true);
        else {
          setFailedLoggedIn(() => {
            clearRefs();
            window.localStorage.setItem("guestbook-jwt", res);
            router.replace("/home");
            return false;
          });
        }
      });
  }

  useEffect(() => {
    if (window.localStorage.getItem("guestbook-jwt"))
        router.replace("/home");
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <form>
          Don't have an account?
          <button type="submit" formaction="/signup">Sign up</button>
        </form>
      </div>
      <div className={styles["input-block"]}>
        <form className={styles["input-section"]} onSubmit={login}>
          <input type="text" ref={usernameRef} placeholder='Username' required/>
          <input type="password" ref={passwordRef} placeholder='Password' required/>
          {failedLoggedIn &&
                <div><font color="red">Invalid username or password.</font></div>
          }
          <input type="submit" value="Login" className={styles["input-block-submit"]} />
        </form>
      </div>
    </main>
  )
}
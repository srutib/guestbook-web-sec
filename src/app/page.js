"use client";

import styles from './page.module.css'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([]);

  const nameRef = useRef(null);
  const messageRef = useRef(null);

  const getMessages = async () => {
    const messagesFromApi = await fetch("/api/message")
      .then((res) => res.json());

    setMessages(messagesFromApi);
  }

  const postMessage = async(event) => {
    event.preventDefault();
    //const body = { name: event.target[0].value, message: event.target[1].value, display: event.target[2].checked ^ 0};
    /*const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };*/

    const queryParams = `name=${event.target[0].value}&message=${event.target[1].value}&display=${event.target[2].checked ^ 0}`;
    fetch(`/api/message?${queryParams}`)
      .then((res) => res.json())
      .then(() => {
        getMessages();
        clearRefs();
      })
  }

  const clearRefs = () => {
    nameRef.current.value = "";
    messageRef.current.value = "";
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <form onSubmit={postMessage}>
          <table>
            <tbody>
              <tr>
                <td width="4cm">Your name:</td>
                <td><input type="text" ref={nameRef} placeholder="Your  name..." /></td>
              </tr>
              <tr>
              <td width="4cm">Your message:</td>
                <td><textarea rows="5" cols="60" ref={messageRef} placeholder="Your message..." /></td>
              </tr>
              <tr>
                <td width="4cm">Show?</td>
                <td><input type="checkbox" id="to_display" name="to_display"/></td>
              </tr>
              <tr>
                <td></td>
                <td><input type="submit" value="Post" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <div>
        <span>Here are messages guests have left so far</span>

        <ul className={styles["messages"]}>
          {console.log(messages)}
          {messages?.map(({ name, message}) => {
            return <li className={styles["li"]}>
              <table><tbody>
                <tr>
                  <td>From: {name}</td>
                </tr>
                <tr>
                  <td>Message: {message}</td>
                </tr>  
              </tbody></table>
            </li>
          })}
        </ul>
      </div>
    </main>
  )
}

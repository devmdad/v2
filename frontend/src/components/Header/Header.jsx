import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Box, Flex } from "@radix-ui/themes";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <header className={styles.header}>
      <Flex justify={"between"}>
        <Box>
          <Link to={"/"}>
            <img src={logo} alt="Logo" width={200} />
          </Link>
        </Box>
        <Box>
          <ul>
            <li>
              <Link to={"/"} className={styles.link}>
                Find Jobs
              </Link>
            </li>
            <li>
              <Link to={"/post-job"} className={styles.link}>
                Post A Job
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link to={"/login"} className={styles.link}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
              <li>
                <Link to={"/login"} className={styles.link}>
                  Login
                </Link>
              </li>
               <li>
               <Link to={"/signup"} className={styles.link}>
                 Signup
               </Link>
             </li>
             </>
              
            )}
          </ul>
        </Box>
      </Flex>
    </header>
  );
};

export default Header;

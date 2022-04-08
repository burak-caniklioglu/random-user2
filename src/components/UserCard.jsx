import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Male from "../assets/man.svg";
import Female from "../assets/woman.svg";
import Mail from "../assets/mail.svg";
import Map from "../assets/map.svg";
import Phone from "../assets/phone.svg";
import Padlock from "../assets/padlock.svg";
import GrowMan from "../assets/growing-up-man.svg";
import GrowWoman from "../assets/growing-up-woman.svg";
const StyledCard = styled.div`
  background: linear-gradient(gray 150px, white 155px);
  width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  button {
    width: 150px;
    background-color: purple;
    color: white;
    margin: 1rem 2rem;
    padding: 0.5rem 1rem;
    &:hover{
      color: purple;
      background-color: white;
    }
  }
  .imgContainer {
    display: flex;
    justify-content: space-around;
  }
`;
const Img = styled.img`
  margin: 1rem;
  border-radius: 50%;
  width: ${(props) => props.big || "50px"};
  height: ${(props) => props.big || "50px"};
  border: 3px solid white;
  box-shadow: 0 0 4px 2px gray;
  object-fit: cover;
  cursor: pointer;
`;

const addUser = () => {};

const UserCard = () => {
  const [randomUser, setRandomUser] = useState({});
  const [property, setProperty] = useState([]);



  const fetchUser = async () => {
    try {
      const user = await axios.get("https://randomuser.me/api/");

      const {
        email,
        phone,
        picture: { medium },
        name: { first, last },
        dob: { age },
        gender,
        login: { password },
        location: { street: {number, name:street} },
      } =
      user.data.results[0];
      const newUser = {name:first+" "+last, email, age, map:number+" "+ street, phone, password,gender,avatar:medium}
      setRandomUser(newUser);
// const {medium}= picture
console.log(randomUser)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleClick = (e) => {
   
      
    console.log(randomUser);
    // console.log(e)
    if (e.target.tagName === "IMG") {
      // console.log(e.target.alt)
      switch (e.target.alt) {
        case "name":
          setProperty([e.target.alt, randomUser.name]);
          break;
        case "email":
          setProperty([e.target.alt, randomUser.email]);
          break;
        case "phone":
          setProperty([e.target.alt, randomUser.phone]);
          break;
        case "age":
          setProperty([e.target.alt, randomUser.age]);
          break;
        case "password":
          setProperty([e.target.alt, randomUser.password]);
          break;
        case "map":
          setProperty([
            "street",
            [randomUser.map],
          ]);
          break;

        default:
          break;
      }
      console.log(property);
    }
  };

useEffect(() => {
 setProperty(["name",randomUser.name])
}, [randomUser])


  return (
    <div>
      <StyledCard>
        <Img src={randomUser.avatar} alt="" big="150px" />
        <p>
          My <span>{property[0]}</span> is
        </p>
        <h3> {property[1]}</h3>
        <div className="imgContainer" onClick={(e) => handleClick(e)}>
          <Img src={randomUser.gender === "male" ? Male : Female} alt="name" />
          <Img src={Mail} alt="email" />
          <Img
            src={randomUser.gender === "male" ? GrowMan : GrowWoman}
            alt="age"
          />
          <Img src={Map} alt="map" />
          <Img src={Phone} alt="phone" />
          <Img src={Padlock} alt="password" />
        </div>
        <button onClick={fetchUser}>New User</button>
        <button onClick={addUser}>Add User</button>
      </StyledCard>
    </div>
  );
};

export default UserCard;

import React from "react";
import "./landing.css";
import Button from "../../components/button/button";
import Input from "../../components/input/input";

const Landing = () => {
    return (
        <div className="landing">
            <div className="flex row">
                <div className="flex row">
                    <img className="logo" src= {`${process.env.PUBLIC_URL}/Logo.png`}></img>
                    <p className="name">CodeNest</p>
                </div>
                <Input 
                placeholder={"Search for developers..."}
                onTextChange={(e) => console.log("Hello")}
                />
                <div className="flex nav-items">
                    <p>Chats</p>
                    <p>Contact us</p>
                </div>
            </div>
            <div className="flex column">
                <img className="hero" src= {`${process.env.PUBLIC_URL}/hero.png`}></img>
                <Button 
                    text= "Start Building"
                    onMouseClick={(e) => console.log("Hello")}
                />
            </div>
            <div>
                <h1>Why us?</h1>
                <p className="why-us">
                   Our code editor stands out as the ultimate tool for developers, providing a seamless and intuitive coding experience. <br></br>
                   With features like real-time collaboration and extensive language support, our editor is designed to boost productivity and streamline your <br></br>workflow. <br></br>
                   Its sleek, user-friendly interface makes it easy for both beginners and seasoned professionals to write, debug, and deploy code efficiently. <br></br>
                   Choose our code editor and transform the way you code, collaborate, and create.</p>
            </div>
            <div className="footer flex column">
                <h2>Contact us</h2>
                <p>Let's build a secure code together </p>
                <div className="flex icons">
                    <a href="https://www.facebook.com" target="_blank">
                        <img src={`${process.env.PUBLIC_URL}/Facebook.png`}></img>
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        <img src={`${process.env.PUBLIC_URL}/Instagram.png`}></img>
                    </a>
                    <a href="" target="_blank">
                        <img src={`${process.env.PUBLIC_URL}/Phone.png`}></img>
                    </a>
                </div>
            </div>
        </div>

    );
};

export default Landing;